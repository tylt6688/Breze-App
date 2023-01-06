import App from './App'


import * as utils from './utils/utils' // 工具文件
import * as common from './utils/common' // 公共文件
import store from './store' // vuex，不需要的可以自行删除
import storage from '@/utils/storage' // 缓存文件
import config from '@/config' // 配置文件
import request from '@/utils/request.js'
Vue.prototype.$request = request

// 定义全局变量
Vue.prototype.$store = store
Vue.prototype.$storage = storage
Vue.prototype.$utils = utils
Vue.prototype.$common = common
Vue.prototype.$config = config


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
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
