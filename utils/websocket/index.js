import util from "@/utils/util"

class WebSocketClass {

	constructor(url) {
		this.lockReconnect = false; // 是否开启重连
		this.wsUrl = ""; // ws 地址
		this.globalCallback = null; // 回调方法
		this.activeShutdown = false; // 是否主动关闭
		this.createWebSocket(url);
	}

	// 初始化
	initEventHandle() {

		/**
		 * 监听WebSocket连接打开成功
		 */
		// #ifdef H5
		this.ws.onopen = (event) => {
			console.log("WebSocket连接打开");
		};
		// #endif

		// #ifdef APP-PLUS
		this.ws.onOpen(res => {
			console.log('WebSocket连接打开');
		});
		// #endif


		/**
		 * 连接关闭后的回调函数
		 */

		// #ifdef H5
		this.ws.onclose = (event) => {
			if (!this.activeShutdown) {
				this.reconnect(this.wsUrl); //重连
			}
		};
		// #endif

		// #ifdef APP-PLUS
		this.ws.onClose(() => {
			if (!this.activeShutdown) {
				this.reconnect(this.wsUrl); //重连
			}
		});
		// #endif


		/**
		 * 报错时的回调函数
		 */

		// #ifdef H5
		this.ws.onerror = (event) => {
			if (!this.activeShutdown) {
				this.reconnect(this.wsUrl); //重连
			}
		};
		// #endif

		// #ifdef APP-PLUS
		this.ws.onError(() => {
			if (!this.activeShutdown) {
				this.reconnect(this.wsUrl); //重连
			}
		});
		// #endif


		/**
		 * 收到服务器数据后的回调函数
		 */

		// #ifdef H5
		this.ws.onmessage = (event) => {
			if (util.isJSON(event.data)) {
				const jsonobject = JSON.parse(event.data)
				this.globalCallback(jsonobject)
			} else {
				this.globalCallback(event.data)
			}
		};
		// #endif

		// #ifdef APP-PLUS
		this.ws.onMessage(event => {
			if (util.isJSON(event.data)) {
				console.log('服务端传递的是json数据: ', event.data);
				const jsonobject = JSON.parse(event.data)
				this.globalCallback(jsonobject)
			} else {
				this.globalCallback(event.data)
			}
		});
		// #endif
	}

	// 关闭ws连接回调
	reconnect(url) {
		if (this.lockReconnect) return;
		this.ws.close();
		this.lockReconnect = true; // 关闭重连，没连接上会一直重连，设置延迟避免请求过多
		setTimeout(() => {
			this.createWebSocket(url);
			this.lockReconnect = false;
		}, 1000);
	}

	// 发送消息
	webSocketSendMsg(msg) {
		this.ws && this.ws.send({
			data: msg,
			success() {
				console.log("消息发送成功");
			},
			fail(err) {
				console.log("WebSocket关闭失败", err)
			}
		});
	}

	// 获取ws返回的数据方法
	getWebSocketMsg(callback) {
		this.globalCallback = callback
	}

	// 关闭ws方法
	closeSocket() {
		if (this.ws) {
			this.activeShutdown = true;
			this.ws.close({
				success(res) {
					console.log("WebSocket关闭成功", res)
				},
				fail(err) {
					console.log("WebSocket关闭失败", err)
				}
			});
		}
	}

	writeToScreen(massage) {
		console.log(massage);
	}

	createWebSocket(url) {
		// #ifdef H5
		if (typeof(WebSocket) === 'undefined') {
			this.writeToScreen("您的浏览器不支持WebSocket，无法获取数据");
			return false
		}
		// #endif

		// #ifdef APP-PLUS
		if (typeof(uni.connectSocket) === 'undefined') {
			this.writeToScreen("您的手机不支持WebSocket，无法获取数据");
			return false
		}
		// #endif

		this.wsUrl = url;
		try {
			// 创建一个this.ws对象【发送、接收、关闭socket都由这个对象操作】

			// #ifdef H5
			this.ws = new WebSocket(this.wsUrl);
			this.initEventHandle();
			// #endif


			// #ifdef APP-PLUS
			let that = this;
			this.ws = uni.connectSocket({
				url: this.wsUrl,
				success(data) {
					console.log("WebSocket连接成功", data);
					that.initEventHandle();
				},
			});
			// #endif
		} catch (e) {
			this.reconnect(url);
		}
	}
}
export default WebSocketClass;