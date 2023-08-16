import App from './App'

import store from '@/store' // vuex
import config from '@/config' // 配置文件
import request from '@/utils/request' // 网络请求
import storage from '@/utils/storage' // 缓存工具
import common from '@/utils/common' // 公共工具
import utils from '@/utils/util' // 自定义工具方法

import qs from 'qs' // 参数  序列化字符串 <--> 对象库

// #ifdef APP-PLUS 
import {
	LogCat
} from '@/js_sdk/logcat/logcat' //日志工具
import deviceinfo from '@/js_sdk/dc-deviceinfo/deviceinfo' //设备信息
// #endif


// 定义全局变量
Vue.prototype.$config = config
Vue.prototype.$request = request
Vue.prototype.$store = store
Vue.prototype.$storage = storage
Vue.prototype.$common = common
Vue.prototype.$utils = utils
Vue.prototype.$qs = qs

//  #ifdef APP-PLUS
Vue.prototype.$LogCat = LogCat
Vue.prototype.$deviceinfo = deviceinfo
// #endif


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif


// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif