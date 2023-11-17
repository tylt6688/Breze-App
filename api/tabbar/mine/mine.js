import request from '@/utils/request'


export default {

	/**
	 * 获取当前登录用户信息
	 */
	getUserInfo() {
		return request({
			url: '/sys/user/current_userinfo'
		});
	},

}