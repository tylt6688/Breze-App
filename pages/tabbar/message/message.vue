<template>
	<view>
		<uni-section title="消息发送" type="line">
			<view class="example">
				<!-- 自定义表单校验 -->
				<uni-forms ref="customForm" :rules="customRules" :modelValue="customFormData">
					<uni-forms-item label="发送的信息" required name="sendMsg">
						<uni-easyinput v-model="customFormData.sendMsg" placeholder="请输入要发送的内容" />
					</uni-forms-item>
					<uni-forms-item label="接收的信息" required name="age">
						<uni-easyinput disabled type="textarea" v-model="customFormData.receiveMsg"
							placeholder="接收服务端信息" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('customForm')">提交</button>
			</view>
		</uni-section>

	</view>
</template>

<script>
	import WS from "@/utils/websocket"

	export default {
		data() {
			return {
				ws: null,
				wsAddress: '',

				// 自定义表单数据
				customFormData: {
					sendMsg: '',
					receiveMsg: '',
				},
				// 自定义表单校验规则
				customRules: {
					sendMsg: {
						rules: [{
							required: true,
							errorMessage: '发送的信息不能为空'
						}]
					},



				},
			}
		},
		onLoad() {},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			this.$refs.customForm.setRules(this.customRules)
		},
		onShow() {
			console.log('页面显示');

			const url = this.$config.BASE_URL;
			const regex = /\/\/(.+)/;
			const match = url.match(regex);

			if (match && match.length >= 2) {
				const connectAddress = match[1];
				this.wsAddress = connectAddress;

				console.log('双斜杠后面的内容:', connectAddress);
			} else {
				console.log('无法匹配双斜杠后面的内容');
			}

			this.closeWebScoket();

			this.ws = new WS('ws://' + this.wsAddress + '/webSocket/1');

			this.ws.getWebSocketMsg(data => {
				const dataJson = data;
				console.log('data', dataJson);
				if (typeof(dataJson) == "object") {
					console.log("wsObject", dataJson);

					this.customFormData.receiveMsg = JSON.stringify(dataJson);
				} else {
					console.log(dataJson);
					this.customFormData.receiveMsg = dataJson;
				}
			});
		},
		onHide() {
			console.log('页面隐藏');
			this.closeWebScoket();
		},
		methods: {
			sendSocketMessage() {
				this.ws.webSocketSendMsg(this.customFormData.sendMsg);
			},
			closeWebScoket() {
				this.ws && this.ws.closeSocket();
			},
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})

					this.sendSocketMessage();
				}).catch(err => {
					console.log('err', err);
				})
			},
		},
		beforeDestroy() {
			this.closeWebScoket();
		},

	}
</script>

<style>
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.form-item {
		display: flex;
		align-items: center;
	}
</style>