import request from '@/utils/request'


export default {

	getUserInfo() {
		return request.get("/sys/user/get_userinfo");
	},

}
