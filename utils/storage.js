// 缓存封装
export default {

	get(name) {
		return uni.getStorageSync(name);
	},
	set(name, value) {
		uni.setStorageSync(name, value);
	},

	getJson(name) {
		const content = uni.getStorageSync(name);
		if (!content) {
			return null;
		}

		return JSON.parse(content);
	},
	setJson(name, value) {
		uni.setStorageSync(name, JSON.stringify(value));
	},

	remove(name) {
		uni.removeStorageSync(name);
	},

	clear() {
		uni.clearStorageSync();
	}
};
