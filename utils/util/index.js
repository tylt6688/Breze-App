export default {

	/**
	 * 页面地址参数解析
	 * @param {string} url 跳转页面路径 [login/login]
	 * @param {string} params 页面跳转参数 [value] 
	 */
	parseUrl(url, params) {
		let arr = [];
		let str = '';
		for (let i in params) {
			arr.push(i + "=" + params[i]);
		}

		str = "/pages/" + url;
		if (arr.length > 0) {
			str += "?" + arr.join("&");
		}
		return str;
	},

	// 判断字符串是否为JSON格式
	isJSON(str) {
		if (typeof str == 'string') {
			try {
				var obj = JSON.parse(str);
				if (typeof obj == 'object' && obj) {
					return true;
				} else {
					return false;
				}

			} catch (e) {
				return false;
			}
		}
	},

	in_array(search, array) {
		let flag = false;
		for (let i in array) {
			if (array[i] == search) {
				flag = true;
				break;
			}
		}

		return flag;
	},

	isDataType(data, type) {
		return Object.prototype.toString.call(data) === '[object ' + type + ']';
	},

	ltrim(str, char) {
		let pos = str.indexOf(char);
		let sonstr = str.substr(pos + 1);
		return sonstr;
	},

	rtrim(str, char) {
		let pos = str.lastIndexOf(char);
		let sonstr = str.substr(0, pos);
		return sonstr;
	},


	/**
	 * rpx转px
	 * @param int|float num
	 */
	rpx2px(num) {
		return uni.upx2px(num);
	},

	/**
	 * px转rpx
	 * @param int|float num
	 */
	px2rpx(num) {
		return num / (uni.upx2px(num) / num);
	}

}