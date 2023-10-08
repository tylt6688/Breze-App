<template>
	<view class="content">
		<view style="margin: 0 auto;">
			<hm-head-portrait-card :options="options"></hm-head-portrait-card>
		</view>
		<view class="list_mine">
			<uni-card note="Tips" :is-shadow="false">
				<template v-slot:title>
					<view style="margin-top: 15upx;">
						<b>基本资料</b>
					</view>
				</template>
				<uni-list>
					<view @click="toPersonalInfomation">
						<uni-list-item title="个人信息" showArrow></uni-list-item>
					</view>

					<uni-list-item title="系统设置" showArrow></uni-list-item>

					<uni-list-item title="问题反馈" showArrow></uni-list-item>

					<uni-list-item title="关于软件" showArrow></uni-list-item>
					<navigator url="/pages/tabbar/test/test"> 测试界面</navigator>

					<view @click="logOut">
						<uni-list-item title="退出登录" showArrow></uni-list-item>
					</view>
				</uni-list>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import mine from '@/api/tabbar/mine/mine';
	import {
		mapGetters
	} from 'vuex'
	import HmHeadPortraitCard from '@/components/hm-head-portrait-card/index.vue';

	export default {
		components: {
			HmHeadPortraitCard
		},
		data() {
			return {
				title: 'UserCenter',
				options: {
					actionBg: '/static/hm-head-portrait-card/images/img_25814_0_0.png',
					avatar: '',
					name: '',
					info: '',
				}
			}
		},

		onShow() {
			this.getCurrentUserInfo();
		},
		methods: {
			...mapGetters(['getUserInfo']),
			getCurrentUserInfo() {
				let userInfo = this.getUserInfo();
				console.log('userInfo: ', userInfo);
				this.options.avatar = userInfo.avatar;
				this.options.name = userInfo.username;
				this.options.info = userInfo.city;
			},
			/**
			 * 退出登录方法
			 */
			logOut() {
				this.$storage.remove('token');
				this.$common.reLaunch('login/login');
			},
			toPersonalInfomation() {
				uni.navigateTo({
					url: '/pages/mine/personalInformation'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		/* text-align: center; */
		height: 400upx;
		margin-top: 50upx;
	}

	.list_mine {
		width: 100%;
	}

	.uni-list-item {
		margin-top: 8upx;
		margin-bottom: 8upx;
	}
</style>