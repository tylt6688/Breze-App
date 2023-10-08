<template>
	<view class="content">

		<view class="setting-view" @click="toSetting">
			<uni-icons type="gear" size="35"></uni-icons>
		</view>

		<view class="logo-view">
			<image class="logo-img" src="/static/logo.png"></image>
		</view>

		<view class="app-name-view">
			<text class="app-name-text">{{title}}</text>
		</view>

		<uni-section title="账户登录" titleFontSize="20px" type="line">
			<view class="login-form-view">
				<uni-forms ref="loginForm" :modelValue="loginForm">
					<uni-forms-item label="账号:" required>
						<uni-easyinput v-model="loginForm.username" placeholder="请输入账号" />
					</uni-forms-item>

					<uni-forms-item label="密码:" required>
						<uni-easyinput type="password" v-model="loginForm.password" placeholder="请输入密码" />
					</uni-forms-item>

					<uni-forms-item label="验证码:" required>
						<view class="captcha-view">
							<uni-easyinput v-model="loginForm.code" placeholder="请输入验证码" />
							<image class="captcha-img" :src="captchaImg" @click="getCaptcha"></image>
						</view>
					</uni-forms-item>
				</uni-forms>
			</view>

			<uni-forms-item style="float: right;">
				<uni-data-checkbox @change="checkChange" v-model="loginCheckBox" multiple :localdata="checkBoxs"
					selectedColor="#53E953" selectedTextColor="#53E953" />
			</uni-forms-item>

			<view class="login-btn-view">
				<button class="login-btn" type="default" @click="login">立即登录</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import login from '@/api/login/login.js'
	import config from '@/config.js'
	export default {
		data() {
			return {
				title: '',
				// 图片验证码
				captchaImg: '',

				// 登录表单
				loginForm: {
					username: 'breze',
					password: '123456',
					key: 'developer',
					code: 'breze'
				},

				loginCheckBox: [0],
				checkBoxs: [{
					text: '记住密码',
					value: 0
				}, {
					text: '自动登录',
					value: 1
				}],
			};
		},
		onLoad() {
			this.getCaptcha();
		},
		onShow() {
			this.title = config.APP_NAME;

			let loginForm = this.$storage.get('loginForm');
			if (loginForm) {
				this.loginForm = loginForm;
				if (this.loginCheckBox.length == 2) {
					this.login();
					console.log("开启自动登录");
				}
			}
		},
		methods: {
			/**
			 * 获取验证码
			 */
			getCaptcha() {
				login.getCaptcha()
					.then(res => {
						this.captchaImg = res.data.result.data.base64Img;
						this.loginForm.key = res.data.result.data.key;
					});
			},

			/**
			 * 执行登录
			 */
			login() {
				let loginForm = this.$qs.stringify(this.loginForm);
				login.login(loginForm).then(res => {
					console.log(res);
					if (res.data.success) {
						uni.showToast({
							title: '登录成功',
							duration: 1000,
							success: () => {
								this.$common.switchTab('tabbar/index/index');
								this.$storage.set('token', res.data.result.data);
							}
						});

					} else {
						common.showToast(res.data.message, 2000);
					}
				});
			},
			/**
			 * 跳转配置页面
			 */
			toSetting() {
				this.$common.navigateTo('setting/setting');
			},
			/**
			 * @param {Object} e 选项框选择
			 */
			checkChange(e) {
				console.log(e.detail, e.detail.value);
				var checks = e.detail.value;
				if (checks.length === 0) {
					console.log("全部取消");
					this.loginCheckBox = [];
					this.$storage.remove('loginForm');
				} else {
					checks.forEach(item => {
						console.log('当前选中', item);
						switch (item) {
							case 0:
								console.log("选中记住密码");
								this.loginCheckBox = [0];
								break;
							case 1:
								console.log("选中自动登录，自动勾选记住密码");
								this.loginCheckBox = [0, 1];
								uni.showToast({
									icon: 'none',
									title: '已选择自动登录',
									duration: 2000
								});
								break;
							default:
								break;
						}
					})

				}

				this.$storage.set('loginForm', this.loginForm);

			},
		}
	};
</script>

<style scoped>
	.setting-view {
		float: right;
		margin-right: 25upx;
	}

	.logo-view {
		display: flex;
		/* 主轴对齐方式 */
		justify-content: center;
		/* 侧轴对齐方式 */
		align-items: center;
	}

	.logo-img {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.login-form-view {
		padding: 15upx;
		background-color: #fff;
	}

	.captcha-view {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.captcha-img {
		display: flex;
		align-items: center;
		height: 35px;
		width: 80px;
		line-height: 35px;
		margin-left: 10px;
	}

	.login-btn-view {
		margin-top: 60px;
		width: 60%;
		margin: 0 auto;
	}

	.login-btn {
		text-align: center;
		background: #67c23a;
		width: 80%;
		line-height: 80rpx;
		color: #fff;
		font-size: 30rpx;
		margin-top: 5%;
	}

	.app-name-view {
		display: flex;
		/* 主轴对齐方式 */
		justify-content: center;
		/* 侧轴对齐方式 */
		align-items: center;
	}

	.app-name-text {
		font-weight: bold;
		font-size: 50upx;
	}
</style>