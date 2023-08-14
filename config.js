import storage from '@/utils/storage'
// 项目主配置文件
export default {
	APP_NAME: "Breze-APP",
	BASE_URL: storage.get('server'),
	TOKEN: storage.get('token'),
	debug: true
}