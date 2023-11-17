import util from '@/utils/util'
export default {

	/**
	 * 保留当前页面，跳转到应用内的某个页面，使用 uni.navigateBack 可以返回到原页面
	 * @param {String} url 跳转页面地址 [login/login]
	 * @param {Object} params 页面传递参数 
	 */
	navigateTo(url, params) {
		uni.navigateTo({
			url: util.parseUrl(url, params)
		})
	},

	/**
	 * 关闭当前页面，跳转到应用内的某个页面
	 * @param {String} url 跳转页面地址 [login/login]
	 * @param {Object} params 页面传递参数 
	 */
	redirectTo(url, params) {
		uni.redirectTo({
			url: util.parseUrl(url, params)
		});
	},

	/**
	 * 关闭所有页面，打开到应用内的某个页面
	 * @param {String} url 跳转页面地址 [login/login]
	 * @param {Object} params 页面传递参数 
	 */
	reLaunch(url, params) {
		uni.reLaunch({
			url: util.parseUrl(url, params)
		});
	},

	/**
	 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
	 * @param {String} url 跳转页面地址 [login/login]
	 * @param {Object} params 页面传递参数 
	 */
	switchTab(url, params) {
		uni.switchTab({
			url: util.parseUrl(url, params)
		});
	},

	/**
	 * 预加载页面，是一种性能优化技术。被预载的页面，在打开时速度更快
	 * @param {String} url 跳转页面地址 [login/login]
	 * @param {Object} params 页面传递参数
	 */
	preloadPage(url, params) {
		uni.preloadPage({
			url: util.parseUrl(url, params)
		});
	},

	prePage() {
		let pages = getCurrentPages();
		let prePage = pages[pages.length - 2];
		// #ifdef H5
		return prePage;
		// #endif
		return prePage.$vm;
	},

	/**
	 * 关闭当前页面，返回上一页面或多级页面
	 * @param {String} delta 页面参数 
	 */
	navigateBack(delta) {
		uni.navigateBack({
			delta: delta
		});
	},


	/**
	 * 获取窗口的宽高
	 * @return {String} 宽高集合
	 */
	getSystemInfo() {
		const info = uni.getSystemInfoSync();
		return {
			w: info.windowWidth,
			h: info.windowHeight
		};
	},

	/**
	 * 简易无标志Toast提示
	 * @param {String} title Toast提示文本
	 * @param {Number} time 持续时间，默认为2s  
	 */
	showToast(title, time = 2000) {
		uni.showToast({
			icon: 'none',
			title: title,
			duration: time
		});
	},

	/**
	 * 错误标志Toast提示
	 * @param {String} title Toast提示文本
	 * @param {Number} time 持续时间，默认为3s  
	 */
	showFailToast(title, time = 3000) {
		uni.showToast({
			icon: 'error',
			title: title,
			duration: time
		});
	},

	/**
	 * 展示数据加载等待
	 * @param {String} title 等待提示标题，默认为 "数据加载中..."
	 * @param {Boolean} mask 是否开启蒙层，默认为 true  
	 */
	showLoading(title = "数据加载中...", mask = true) {
		uni.showLoading({
			title: title,
			mask: mask
		});
	},

	/**
	 * 隐藏数据加载等待
	 * @param {Number} timer 默认延时隐藏时间为 0
	 */
	hideLoading(timer = 0) {
		if (timer > 0) {
			let t = setTimeout(function() {
				uni.hideLoading();
				clearTimeout(t);
			}, timer);
		} else {
			uni.hideLoading();
		}
	},
	/**
	 * 发送全局事件
	 * @param {String} emitName 事件名称
	 * @param {String} data 数据集合 {msg:'页面更新'}
	 */
	sendEmit(emitName, data) {
		uni.$emit(emitName, data);
	},
	/**
	 * 监听事件
	 * @param {String} emitName 事件名称
	 * @return {String} 数据集合 {msg:'页面更新'}
	 */
	onEmit(emitName) {
		uni.$on(emitName, function(data) {
			return data;
		})
	}



};