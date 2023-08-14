// 本地缓存封装
export default {

	get(key) {
		return uni.getStorageSync(key);
	},

	set(key, value) {
		uni.setStorageSync(key, value);
	},

	getJson(key) {
		const content = uni.getStorageSync(key);
		if (!content) {
			return null;
		}
		return JSON.parse(content);
	},

	setJson(key, value) {
		uni.setStorageSync(key, JSON.stringify(value));
	},

	remove(key) {
		uni.removeStorageSync(key);
	},

	clear() {
		uni.clearStorageSync();
	}
}