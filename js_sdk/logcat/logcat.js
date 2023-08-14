export const LogCat = {
	main: plus.android.runtimeMainActivity(),
	Environment: plus.android.importClass('android.os.Environment'),
	BufferedWriter: plus.android.importClass('java.io.BufferedWriter'),
	File: plus.android.importClass('java.io.File'),
	FileOutputStream: plus.android.importClass('java.io.FileOutputStream'),
	OutputStreamWriter: plus.android.importClass('java.io.OutputStreamWriter'),
	LogPath: '', //日志存储目录
	saveDays: 2, //日志最大存储天数

	init: function() {
		if (this.Environment.MEDIA_MOUNTED || !this.Environment.isExternalStorageRemovable()) {
			this.LogPath = this.main.getExternalFilesDir(null).getPath();
		} else {
			this.LogPath = this.main.getFilesDir().getPath();
		}
		let fileManager = new this.File(this.LogPath);
		let files = fileManager.listFiles()
		let now = new Date();
		let maxSavedDay = utils.getFormatDate(now - this.saveDays * 24 * 60 * 60 * 1000)
		// 遍历目录下的日志文件,并删除日志最大存储天数前的日志
		for (var i in files) {
			let name = files[i].getName().split('.')[0],
				time = name.split('_')[1]
			if (time <= maxSavedDay && name.search('log_') == 0) {
				files[i].delete()
			}
		}
		console.log('LogPath->', this.LogPath);
	},
	d: function(tag, msg = '') {
		let now = new Date();
		let date = utils.getFormatDate(now);
		let datetime = utils.getFormatDateTime(now);

		msg = (typeof msg !== 'string' ? JSON.stringify(msg) : msg);

		//文件名
		let fileName = this.LogPath + "/log_" + date + ".txt"
		//写入的内容
		let content = `\n${datetime} ${tag}${msg ? ':'+msg : msg}\n`;

		let file = new this.File(this.LogPath);
		if (!file.exists()) {
			file.mkdirs(); //创建父路径
		}
		let fos = null;
		let bw = null;
		try {
			fos = new this.FileOutputStream(fileName, true);
			bw = new this.BufferedWriter(new this.OutputStreamWriter(fos));
			//bw.write(log);
			bw.append(content);
		} catch (e) {
			console.log('e->', e);
		} finally {
			try {
				if (bw != null) {
					bw.close(); //关闭缓冲流
					fos.close(); //关闭文件输出流
				}
			} catch (closeEx) {
				console.log('closeEx->', closeEx);
			}
		}
	}
}

export const utils = {
	getFormatDate: (dateString) => {
		const date = new Date(dateString);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	},
	getFormatDateTime: (dateString) => {
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