import request from '@/utils/request'
export default {

	getCaptcha() {
		return request({
			url: '/captcha',
			method: 'GET'
		});
	},
	login(loginForm) {
		return request({
			url: '/breze/login?' + loginForm,
			method: 'POST'
		})
	}

}