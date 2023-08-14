import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/storage'

Vue.use(Vuex);

const store = new Vuex.Store({
	// 属性值，全局数据
	state: {
		serve: storage.get('serve'),
		token: storage.get('serve'),
		user: 'asdfghj',
	},
	// 对外访问state属性内容，全局的计算属性
	getters: {
		getServe: state => {
			let serve = storage.get("serve");
			if (serve == null) {
				return '';
			}
			return serve;
		},
		getUser: state => {
			let user = storage.getJson("user");
			if (user == null) {
				return 0;
			}
			return user;
		}
	},
	// Mutation 必须是同步函数
	// 更改state属性内容，修改数据的方法
	// 使用：this.$store.commit("setUserInfo",{  });
	mutations: {
		UPDATEUSERS(state, data) {
			state.users = data;
			storage.setJson("users", data);
		},
		DELETEUSERS(state, name) {
			state.users = null;
			storage.remove(name);
		},
		UPDATECART(state, data) {
			state.users.shop_count = data;
			let users = storage.getJson("users");
			users.shop_count = data;
			storage.setJson("users", users);
		}
	},
	// Action 可以包含任意异步操作，全局异步操作的方法
	// 通过 context.commit 可以方问mutations方法，也可以获得getters内容
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