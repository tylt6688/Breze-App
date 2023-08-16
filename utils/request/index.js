//配置文件
import config from '@/config'
import common from '@/utils/common'

// #ifdef APP-PLUS
import {
	LogCat
} from '@/js_sdk/logcat/logcat.js'
// #endif

/**
 * 封装请求方法
 * @param {obj}  网络请求对象
 */
const request = (obj) => {
	// 请求路径
	obj.url = obj.url || '';
	// 请求方式
	obj.method = obj.method || 'GET';
	// 请求携带的数据
	obj.data = obj.data || {};
	// 请求头信息 content-type
	obj.header = obj.header || {};
	// 请求内容类型
	obj.contentType = obj.contentType || 'application/json';
	// 请求超时时间
	obj.timeout = obj.timeout || 3000;
	// 是否显示请求加载中
	obj.loading = obj.loading === false ? false : true;
	// 多久时间内完成网络请求，则不显示提示框
	obj.requestTime = obj.requestTime || 1000;
	// 定义网络请求如果在一定时间内没有完成，则显示加载中提示框，默认时间为：1000毫秒
	let loadingStatus = true;
	setTimeout(() => {
		if (loadingStatus && obj.loading) {
			common.showLoading();
		}
	}, obj.requestTime)

	/**
	 * @return {Promise} 返回 Promise对象
	 */
	return new Promise((resolve, reject) => {
		let token = config.TOKEN;
		console.log('请求的接口地址--->>>' + obj.url);

		uni.request({
			url: config.BASE_URL + obj.url,
			method: obj.method,
			data: obj.data,
			timeout: obj.timeout,
			header: {
				'Authorization': token ? "Bearer " + token : "BrezeApp",
				'Content-Type': obj.contentType
			},
			success: res => {
				console.log("网络请求成功数据--->>>", res);
				resolve(res);
				// #ifdef APP-PLUS
				LogCat.d("-----------------SUCCESS START------------------------");
				LogCat.d("网络请求成功数据--->>>", res.data);
				LogCat.d("-----------------SUCCESS END------------------------");
				// #endif
			},
			fail: err => {
				console.log('网络请求失败', err);
				common.showFailToast('服务通信异常', 3000);
				reject(err);
				// #ifdef APP-PLUS
				LogCat.d("-----------------FAIL START------------------------");
				LogCat.d("网络请求失败数据--->>>", err);
				LogCat.d("-----------------FAIL END------------------------");
				// #endif
			},
			complete: () => {
				if (loadingStatus && obj.loading) {
					uni.hideLoading();
				}
				loadingStatus = false;
			}
		})
	});
}

export default request