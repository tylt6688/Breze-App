import request from '@/utils/request'


export default {

	getBanner() {
		return request.get("/breze/portal/banner/select");
	},

}
