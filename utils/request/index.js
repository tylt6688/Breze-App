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
 * @param {object} obj  网络请求对象
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
	// 是否显示请求加载中等待提示
	obj.loading = !obj.loading;
	// 多久时间内完成网络请求，则不显示等待提示
	obj.requestTime = obj.requestTime || 1500;
	// 定义网络请求如果在一定时间内没有完成，则显示加载中提示框，默认时间为：1500毫秒
	let loadingStatus = true;
	setTimeout(() => {
		if (loadingStatus && obj.loading) {
			common.showLoading();
		}
	}, obj.requestTime)

	let token = config.TOKEN;
	obj.header['Authorization'] = token ? "Bearer " + token : "BrezeApp";
	obj.header['Content-Type'] = obj.contentType;

	/**
	 * @return {Object} Promise 返回 Promise对象
	 */
	return new Promise((resolve, reject) => {

		console.log('请求的接口地址--->>>', obj.url, '携带的认证信息--->>>', token);

		uni.request({
			url: config.BASE_URL + obj.url,
			method: obj.method,
			data: obj.data,
			timeout: obj.timeout,
			header: obj.header,
			success: res => {
				console.log("网络请求成功数据--->>>", res);

				// #ifdef APP-PLUS
				LogCat.d("********SUCCESS START********");
				LogCat.d("网络请求成功数据->", res.data);
				LogCat.d("--------SUCCESS END--------");
				// #endif

				switch (res.statusCode) {
					case 401:
						common.showFailIconToast('登录失效', 3500);
						break;
					case 403:
						common.showFailIconToast('无权限', 3500);
						break;
					case 404:
						common.showFailIconToast('地址错误', 3500);
						break;
					case 500 || 502:
						common.showFailIconToast('服务异常', 3500);
						break;
					default:
						resolve(res);
						break;
				}

			},
			fail: err => {
				console.log('网络请求失败原因--->>>', err);

				// #ifdef APP-PLUS
				LogCat.d("********FAIL START********");
				LogCat.d("网络请求失败数据->", err);
				LogCat.d("---------FAIL END---------");
				// #endif

				common.showToast('网络通信异常' + err.errMsg, 3500);
				reject(err);

			},
			complete: () => {
				if (loadingStatus && obj.loading) {
					common.hideLoading();
				}
				loadingStatus = false;
			}
		})
	});
}

export default request