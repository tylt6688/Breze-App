import storage from '@/utils/storage'
// 项目主配置文件
export default {
	// App 名称
	APP_NAME: storage.get('appname'),
	// 服务请求地址
	BASE_URL: storage.get('server'),
	// 操作凭证令牌
	TOKEN: storage.get('token'),
	// 是否开启 debug 模式
	DEBUG: false
}