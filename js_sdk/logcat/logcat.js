import util from '@/utils/util'
import storage from '@/utils/storage'

export const LogCat = {
	main: plus.android.runtimeMainActivity(),
	Environment: plus.android.importClass('android.os.Environment'),
	BufferedWriter: plus.android.importClass('java.io.BufferedWriter'),
	File: plus.android.importClass('java.io.File'),
	FileOutputStream: plus.android.importClass('java.io.FileOutputStream'),
	OutputStreamWriter: plus.android.importClass('java.io.OutputStreamWriter'),
	// 日志存储目录
	LogPath: '',
	// 日志最大存储天数
	saveDays: 2,

	/**
	 * 初始化日志文件夹目录
	 */
	init() {
		if (this.Environment.MEDIA_MOUNTED || !this.Environment.isExternalStorageRemovable()) {
			console.log("外部SD存储卡已挂载，日志文件放置于外部存储中");
			this.LogPath = this.main.getExternalFilesDir(null).getPath() + "/log";
		} else {
			this.LogPath = this.main.getFilesDir().getPath() + "/log";
		}
		// 创建文件夹
		let file = new this.File(this.LogPath);
		if (!file.exists()) {
			file.mkdirs();
		}

		storage.set("logPath", this.LogPath);
	},

	/**
	 * 外部存储本地日志方法
	 * @param {string} tag 日志标题
	 * @param {string} msg 内容信息    
	 */
	d(tag, msg = '') {
		this.init();

		let now = new Date();
		let date = util.getFormatDate(now);
		let time = util.getFormatTime(now);

		msg = (typeof msg !== 'string' ? JSON.stringify(msg) : msg);

		// 日志文件名
		let fileName = this.LogPath + "/log_" + date + ".txt"
		// 追加写入的日志内容
		let content = `\n${time} ${tag}${msg ? ':'+msg : msg}\n`;
		// 日志头部信息
		let headInfo =
			`------------Breze App Log------------\nDate of log: ${date}\n------------Breze App Log------------\n`;

		let fos = null;
		let bw = null;
		try {
			let logList = [];
			let fileManager = new this.File(this.LogPath);
			let files = fileManager.listFiles()
			let now = new Date();
			let maxSavedDay = util.getFormatDate(now - this.saveDays * 24 * 60 * 60 * 1000)
			// 遍历目录下的日志文件,并删除最大存储天数前的日志
			for (let i in files) {
				let name = files[i].getName().split('.')[0],
					time = name.split('_')[1]
				logList.push(time);

				if (time <= maxSavedDay && name.search('log_') == 0) {
					files[i].delete();
				}
			}

			fos = new this.FileOutputStream(fileName, true);
			bw = new this.BufferedWriter(new this.OutputStreamWriter(fos));

			if (!util.inArray(util.getFormatDate(now), logList)) {

				bw.write(headInfo);
				console.log("未存在今日日志文件日期，写入头部文件信息", !util.inArray(util.getFormatDate(now), logList));
			}

			bw.append(content);
		} catch (e) {
			console.log('日志存储异常--->', e);
		} finally {
			try {
				if (bw != null) {
					bw.close(); //关闭缓冲流
					fos.close(); //关闭文件输出流
				}
			} catch (closeException) {
				console.log('关闭文件流异常--->', closeException);
			}
		}
	}
}