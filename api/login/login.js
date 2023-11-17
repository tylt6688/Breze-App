import request from '@/utils/request'
export default {

	/**
	 * 获取图形验证码
	 */
	getCaptcha() {
		return request({
			url: '/captcha',
			method: 'GET'
		});
	},

	/**
	 * 登录
	 * @param {Object} loginForm 登录请求体
	 */
	login(loginForm) {
		return request({
			url: '/breze/login?' + loginForm,
			method: 'POST'
		})
	}

}