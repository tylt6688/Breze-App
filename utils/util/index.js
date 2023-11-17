export default {

	/**
	 * 页面地址参数解析
	 * @param {String} url 跳转页面路径 [login/login]
	 * @param {String} params 页面跳转参数 [value] 
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

	/**
	 * 判断字符串是否为 JSON 格式
	 * @param {String} str JSON 字符串
	 */
	isJSON(str) {
		if (typeof str == 'string') {
			try {
				const obj = JSON.parse(str);
				return typeof obj == 'object' && obj ? true : false;
			} catch (e) {
				return false;
			}
		}
	},
	/**
	 * 判断搜的元素是否在数组中
	 * @param {Object} search
	 * @param {Object} array
	 */
	inArray(search, array) {
		let flag = false;
		for (let i in array) {
			if (array[i] == search) {
				flag = true;
				break;
			}
		}
		return flag;
	},

	/**
	 * 判断一个数据对象的类型是否与指定类型相同，例如"Array"、"Object"等
	 * @param {Object} data 需要判定的数据对象
	 * @param {Object} type 指定的数据类型
	 * @return {boolean} 布尔值
	 */
	isDataType(data, type) {
		return Object.prototype.toString.call(data) === '[object ' + type + ']';
	},


	/**
	 * 从左侧开始去除指定字符串中找到的第一个字符
	 * @param {String} str 源字符串
	 * @param {String} char 指定的字符
	 * @return {String} 处理完毕后的字符串
	 */
	ltrim(str, char) {
		let pos = str.indexOf(char);
		let sonstr = str.substr(pos + 1);
		return sonstr;
	},
	/**
	 * 从右侧开始去除指定字符串中找到的第一个字符
	 * @param {String} str 源字符串
	 * @param {String} char 指定的字符
	 * @return {String} 处理完毕后的字符串
	 */
	rtrim(str, char) {
		let pos = str.lastIndexOf(char);
		let sonstr = str.substr(0, pos);
		return sonstr;
	},


	/**
	 * rpx 转 px
	 * @param {Number} num 数值
	 * @return {Number} px像素值
	 */
	rpx2px(num) {
		return uni.upx2px(num);
	},

	/**
	 * px 转 rpx
	 * @param {Number} num 数值
	 * @return {Number} rpx像素值
	 */
	px2rpx(num) {
		return num / (uni.upx2px(num) / num);
	},

	getFormatDate(dateString) {
		const date = new Date(dateString);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	},
	getFormatTime(dateString) {
		const date = new Date(dateString);

		let hour = date.getHours();
		let min = date.getMinutes();
		let second = date.getSeconds();

		hour = hour > 9 ? hour : '0' + hour;
		min = min > 9 ? min : '0' + min;
		second = second > 9 ? second : '0' + second;

		return `${hour}:${min}:${second}`;
	},
	getFormatDateTime(dateString) {
		const date = new Date(dateString);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let hour = date.getHours();
		let min = date.getMinutes();
		let second = date.getSeconds();

		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		hour = hour > 9 ? hour : '0' + hour;
		min = min > 9 ? min : '0' + min;
		second = second > 9 ? second : '0' + second;

		return `${year}-${month}-${day} ${hour}:${min}:${second}`;
	}

}