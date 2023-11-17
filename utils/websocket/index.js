import util from '@/utils/util'
import common from '@/utils/common'

class WebSocketClass {

	constructor(url) {
		this.wsUrl = ""; // WebSocket 地址
		this.globalCallback = null; // 回调方法
		this.activeShutDown = false; // 是否主动关闭
		this.lockReconnect = false; // 是否禁止重连
		this.createWebSocket(url);
	}

	/**
	 * 初始化 WebSocket 事件处理器
	 */
	initEventHandle() {

		/*
		 * 监听 WebSocket 连接打开成功
		 */
		// #ifdef APP-PLUS
		this.ws.onOpen(res => {
			console.log('WebSocket连接打开');
		});
		// #endif

		// #ifdef H5
		this.ws.onopen = (event) => {
			console.log("WebSocket连接打开");
		};
		// #endif


		/**
		 * 连接关闭后的回调函数
		 */
		// #ifdef APP-PLUS
		this.ws.onClose(() => {
			if (!this.activeShutDown) {
				this.reconnect(this.wsUrl); //重连
			}
		});
		// #endif

		// #ifdef H5
		this.ws.onclose = (event) => {
			if (!this.activeShutDown) {
				this.reconnect(this.wsUrl); //重连
			}
		};
		// #endif

		/**
		 * 报错时的回调函数
		 */
		// #ifdef APP-PLUS
		this.ws.onError(() => {
			if (!this.activeShutDown) {
				this.reconnect(this.wsUrl); //重连
			}
		});
		// #endif

		// #ifdef H5
		this.ws.onerror = (event) => {
			if (!this.activeShutDown) {
				this.reconnect(this.wsUrl); //重连
			}
		};
		// #endif

		/**
		 * 收到服务器数据后的回调函数
		 */
		// #ifdef APP-PLUS
		this.ws.onMessage(event => {
			if (util.isJSON(event.data)) {
				console.log('服务端传递的是json数据: ', event.data);
				const jsonObject = JSON.parse(event.data)
				this.globalCallback(jsonObject)
			} else {
				this.globalCallback(event.data)
			}
		});
		// #endif

		// #ifdef H5
		this.ws.onmessage = (event) => {
			if (util.isJSON(event.data)) {
				const jsonObject = JSON.parse(event.data)
				this.globalCallback(jsonObject)
			} else {
				this.globalCallback(event.data)
			}
		};
		// #endif


	}

	/**
	 * WebSocket 重新连接
	 * @param {String} url 连接地址
	 */
	reconnect(url) {
		if (this.lockReconnect) return;
		this.ws.close();
		this.lockReconnect = true; // 关闭重连，没连接上会一直重连，设置延迟避免请求过多
		setTimeout(() => {
			this.createWebSocket(url);
			this.lockReconnect = false;
		}, 1000);
	}

	/**
	 * 发送消息
	 * @param {String} msg 消息对象
	 */
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

	/**
	 * 获取 WebSocket 返回的数据方法
	 * @param {Object} callback
	 */
	getWebSocketMsg(callback) {
		this.globalCallback = callback;
	}

	/**
	 * 关闭  WebSocket  连接
	 */
	closeSocket() {
		if (this.ws) {
			this.activeShutDown = true;
			this.ws.close({
				success(res) {
					console.log("WebSocket关闭成功--->", res);
				},
				fail(err) {
					console.log("WebSocket关闭失败--->", err);
				}
			});
		}
	}

	/**
	 * 打印信息到屏幕
	 * @param {String} massage 提示信息
	 */
	printToScreen(massage) {
		console.log(massage);
		common.showToast(massage);
	}

	/**
	 * 创建 WebSocket 连接
	 * @param {Object} url 连接地址
	 */
	createWebSocket(url) {

		// #ifdef APP-PLUS
		if (typeof(uni.connectSocket) === 'undefined') {
			this.printToScreen("您的手机不支持WebSocket，无法获取数据");
			return false;
		}
		// #endif

		// #ifdef H5
		if (typeof(WebSocket) === 'undefined') {
			this.printToScreen("您的浏览器不支持WebSocket，无法获取数据");
			return false;
		}
		// #endif

		this.wsUrl = url;
		try {
			// 创建一个 WebSocket 对象【发送、接收、关闭socket都由这个对象操作】
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

			// #ifdef H5
			this.ws = new WebSocket(this.wsUrl);
			this.initEventHandle();
			// #endif


		} catch (e) {
			console.log("WebSocket创建出现异常--->", e);
			this.reconnect(url);
		}
	}
}
export default WebSocketClass;