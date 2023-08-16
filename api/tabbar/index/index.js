import request from '@/utils/request'

export default {

	getBanner() {
		return request({
			url: '/breze/portal/banner/select'
		});
	},

	getUserInfo() {
		return request({
			url: '/sys/user/current_userinfo'
		});
	},

}