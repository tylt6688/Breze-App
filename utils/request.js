import config from "@/config"; // 配置文件
import storage from "./storage"; // 缓存封装

export default {
	console(options) {
		if (config.debug) {
			console.log("<<===============================================>>");
			console.log("request start");
			console.log("header" + JSON.stringify(options.header));
			console.log("method: " + options.method + " URL: " + options.url);
			console.log(options.data);
			console.log("request end");
			console.log("<<===============================================>>");
		}
	},

	send(options = {}) {
		// loading 加载
		uni.showLoading({
			title: '加载中···'
		});

		// 根据配置文件拼接路径
		options.url = config.app_api_url + '' + options.url;
		// 请求方式
		options.method = options.method || "GET";

		// 这里看项目的情况来定，如果是没有token，那就删除这里，上面的storage也不需要引入
		let token = storage.get("token");
		if (token != null) {
			options.header = {
				"Authorization": 'Bearer ' + token
			};
		} else {
			uni.showToast({
				icon: 'none',
				title: "请先登录",
				duration: 2000
			});
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
		// 打印请求数据，调试用，上线后注释
		this.console(options);

		// 发起 Promise 请求
		return new Promise((resolve, reject) => {
			uni.request(options).then(data => {
				var [error, res] = data;
				if (error != null) {
					console.log("error=>>>>", error)
					reject(error);
				} else {
					uni.hideLoading();
					// 相应拦截、根据后端的状态码来写，可以自行判断和封装
					if (res.data.success) {
						console.log("success=>>>>", res)
						resolve(res.data);

					} else {
						console.log("出现请求错误=>>>>", res)
						uni.showToast({
							icon: 'none',
							title: res.data.error,
							duration: 2000
						});

					}

				}
			});
		});
	},
	// 外部请求方式
	get(url = "", data = {}) {
		return this.send({
			url: url,
			data: data,
			method: "GET"
		});
	},
	post(url = "", data = {}) {
		return this.send({
			url: url,
			data: data,
			method: "POST"
		});
	}
};
