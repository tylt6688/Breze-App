import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/storage'

Vue.use(Vuex);

const store = new Vuex.Store({
	// 属性值，全局数据
	state: {
		server: '',
		token: '',
		userInfo: {},
	},
	// 对外访问state属性内容，全局的计算属性
	getters: {
		getServer: state => {
			let server = storage.get("server");
			if (server == null) {
				return '';
			}
			return server;
		},
		getUserInfo: state => {
			return state.userInfo;
		}
	},
	// Mutation 必须是同步函数
	// 更改state属性内容，修改数据的方法
	// 使用：this.$store.commit("setUserInfo",{  });
	mutations: {

		INSERT_USER_INFO(state, data) {
			state.userInfo = data;
			console.log("acac", data)
			// storage.setJson("userInfo", data);
		}
	},
	// Action 中可以包含任意异步操作，全局异步操作的方法
	// 通过 context.commit 可以访问mutations方法，也可以获得getters内容
	// 通过 this.$store.dispatch("getUser") 来取得内容
	actions: {
		getCart(context) {

		},
		usersStatus(context) {
			return new Promise(function(resolve, reject) {
				if (storage.getJson("users") == null) {
					reject();
				} else {
					resolve();
				}
			});
		}
	}
})

export default store