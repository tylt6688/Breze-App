<template>
	<view>
		<button @click="sendSocketMessage('breze-app')">发送</button>
	</view>
</template>

<script>
	import WS from "@/utils/websocket"

	export default {
		data() {
			return {
				ws: null
			}
		},
		onShow() {
			console.log('页面显示');
			this.ws && this.ws.closeSocket();

			this.ws = new WS(`ws://192.168.8.46:8090/webSocket/1`)

			// 发送数据
			this.ws.webSocketSendMsg('发送信息');

			this.ws.getWebSocketMsg(data => {
				const dataJson = data;
				console.log('data', dataJson);
				if (typeof(dataJson) == "object") {
					console.log("wsObject", dataJson);
				} else {
					console.log(dataJson);
				}
			});
		},
		onHide() {
			console.log('页面隐藏');
			this.ws && this.ws.closeSocket();
		},
		methods: {
			sendSocketMessage(msg) {
				this.ws.webSocketSendMsg(msg);
			}
		},
		beforeDestroy() {
			this.ws && this.ws.closeSocket();
		},

		//...
	}
</script>

<style></style>