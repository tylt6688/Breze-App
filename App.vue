<script>
	import config from '@/config'
	import common from '@/utils/common'
	import storage from '@/utils/storage'
	export default {
		onLaunch() {
			console.log('App Launch');

			if (!config.BASE_URL) {
				console.log("不存在默认IP配置，已预配置IP地址");
				storage.set('server', 'http://192.168.8.46:8090');
			}

			if (!config.APP_NAME) {
				console.log("不存在APP名称配置，已预配置APP名称");
				storage.set('appname', 'Breze-APP');
			}

			// #ifdef APP-PLUS
			this.$LogCat.d('应用启动->内存剩余', this.$deviceinfo.availMem() / 1024 / 1024 + ' MB');
			// #endif

		},

		onShow() {
			console.log('App Show');
			let token = config.TOKEN;
			console.log('token: ', token);
			// if (!token) {
			// 	uni.showToast({
			// 		icon: 'error',
			// 		title: '登录失效',
			// 		duration: 3000,
			// 		success: () => {
			// 			common.reLaunch('login/login');
			// 		}
			// 	});
			// }
		},

		onHide() {
			console.log('App Hide');
			// #ifdef APP-PLUS
			this.$LogCat.d('应用隐藏->内存剩余', this.$deviceinfo.availMem() / 1024 / 1024 + ' MB');
			// #endif

		}
	};
</script>

<style>
	/*每个页面公共css */
</style>