<template>
	<view class="content">
		<view style="margin: 0 auto;">
			<hm-head-portrait-card :options="options"></hm-head-portrait-card>
		</view>

		<view>
			<uni-card note="Tips" :is-shadow="false">
				<uni-section title="设置" titleFontSize="17px" type="line">

					<uni-list>
						<view @click="toPersonalInfomation()">
							<uni-list-item title="个人信息" showArrow>
							</uni-list-item>
						</view>

						<view @click="toPDFView()">
							<uni-list-item title="操作手册" showArrow>
							</uni-list-item>
						</view>

						<view @click="openDir()">
							<uni-list-item title="问题反馈" showArrow>
							</uni-list-item>
						</view>

						<view @click="toAbout()">
							<uni-list-item title="关于软件" showArrow>
							</uni-list-item>
						</view>

						<view @click="logOut()">
							<uni-list-item title="退出登录" showArrow>
							</uni-list-item>
						</view>

						<view @click="navigateToPage('tabbar/test/test')">
							<uni-list-item title="关于软件" showArrow>
							</uni-list-item>
						</view>
					</uni-list>

				</uni-section>
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
				},

			}
		},

		onShow() {
			this.getCurrentUserInfo();

		},
		methods: {
			...mapGetters(['getUserInfo']),
			async getCurrentUserInfo() {
				const res = await mine.getUserInfo();
				const userInfo = res.data.result.data;
				console.log('userInfo: ', userInfo);
				this.options.avatar = userInfo.avatar;
				this.options.name = userInfo.username;
				this.options.info = userInfo.city;
			},

			/**
			 * 跳转到个人信息页
			 */
			toPersonalInfomation() {
				this.$common.navigateTo('personalInformation/personalInformation');
			},
			/**
			 * 跳转到PDF展示页
			 */
			toPDFView() {
				this.$common.navigateTo('pdfview/pdfview');
			},
			/**
			 * 跳转到关于软件页
			 */
			toAbout() {
				this.$common.navigateTo('about/about');
			},

			navigateToPage(pageUrl) {
				this.$common.navigateTo(pageUrl);
			},

			/**
			 * 退出登录
			 */
			logOut() {
				this.$storage.remove('token');
				this.$common.reLaunch('login/login');
			},

			openDir() {
				console.log("dianj")
				uni.openDocument({
					filePath: this.logPath,
					fileType: 'dir'
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


	.uni-list-item {
		margin-top: 8upx;
		margin-bottom: 8upx;
	}
</style>