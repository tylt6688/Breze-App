import request from '@/utils/request'


export default {

	getUserInfo() {
		console.log(request);

		return request.get("/sys/user/get_user_info");
	},

}