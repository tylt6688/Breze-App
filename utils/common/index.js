import util from '@/utils/util'
export default {

	/**
	 * 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
	 */
	navigateTo(url, params) {
		uni.navigateTo({
			url: util.parseUrl(url, params)
		})
	},

	/**
	 * 关闭当前页面，跳转到应用内的某个页面。
	 */
	redirectTo(url, params) {
		uni.redirectTo({
			url: util.parseUrl(url, params)
		});
	},

	/**
	 * 关闭所有页面，打开到应用内的某个页面。
	 */
	reLaunch(url, params) {
		uni.reLaunch({
			url: util.parseUrl(url, params)
		});
	},

	/**
	 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
	 */
	switchTab(url, params) {
		uni.switchTab({
			url: util.parseUrl(url, params)
		});
	},

	/**
	 * 预加载页面，是一种性能优化技术。被预载的页面，在打开时速度更快。
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
	 */
	navigateBack(delta) {
		uni.navigateBack({
			delta: delta
		});
	},



	/**
	 * 获取窗口的宽高
	 */
	getSystemInfo() {
		const info = uni.getSystemInfoSync();
		return {
			w: info.windowWidth,
			h: info.windowHeight
		};
	},

	/*
	 * 简易无标志Toast提示
	 */
	showToast(title, time = 2000) {
		uni.showToast({
			icon: 'none',
			title: title,
			duration: time
		});
	},

	showLoading(title = "数据加载中...", mask = true) {
		uni.showLoading({
			title: title,
			mask: mask
		});
	},

	hideLoading(timer = 0) {
		if (timer > 0) {
			var t = setTimeout(function() {
				uni.hideLoading();
				clearTimeout(t);
			}, timer);
		} else {
			uni.hideLoading();
		}
	}

};