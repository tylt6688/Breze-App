import request from '@/utils/request'


export default {

	getUserInfo() {
		return request({
			url: '/sys/user/current_userinfo'
		});
	},

}