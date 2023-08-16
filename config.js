import storage from '@/utils/storage'
// 项目主配置文件
export default {
	APP_NAME: storage.get('appname'),
	BASE_URL: storage.get('server'),
	TOKEN: storage.get('token'),
	DEBUG: false
}