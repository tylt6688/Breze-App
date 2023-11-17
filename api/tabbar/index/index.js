import request from '@/utils/request'

export default {

	/**
	 * 获取轮播图
	 */
	getBanner() {
		return request({
			url: '/breze/portal/banner/select'
		});
	},

}