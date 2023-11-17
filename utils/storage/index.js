// 本地缓存封装
export default {

	/**
	 * 获取本地缓存数据
	 * @param {String} key 缓存键名称
	 * @return {String} 缓存值
	 */
	get(key) {
		return uni.getStorageSync(key);
	},

	/**
	 * 设置本地缓存数据
	 * @param {String} key 缓存键名称
	 * @param {String} value 缓存值
	 */
	set(key, value) {
		uni.setStorageSync(key, value);
	},

	/**
	 * 以 JSON 形式获取本地缓存数据
	 * @param {String} key 缓存键名称
	 * @return {String} 缓存值
	 */
	getJson(key) {
		const content = uni.getStorageSync(key);
		if (!content) {
			return null;
		}
		return JSON.parse(content);
	},

	/**
	 * 设置 JSON 形式本地缓存数据
	 * @param {String} key 缓存键名称
	 * @param {String} value 缓存值
	 */
	setJson(key, value) {
		uni.setStorageSync(key, JSON.stringify(value));
	},

	/**
	 * 删除本地缓存数据
	 * @param {String} key 缓存键名称
	 */
	remove(key) {
		uni.removeStorageSync(key);
	},

	/**
	 * 清空本地缓存数据
	 */
	clear() {
		uni.clearStorageSync();
	}
}