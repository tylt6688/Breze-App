<template>
	<view class="content">
		<view class="logo-view">
			<image class="logo-img" src="/static/logo.png"></image>
		</view>
		<uni-section title="账户登录" titleFontSize="20px" type="line">
			<view class="login-form-view">
				<!-- 基础用法，不包含校验规则 -->
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
			<view class="login-btn-view">
				<button class="login-btn" type="default" @click="login">立即登录</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import login from '@/api/login/login.js'
	export default {
		data() {
			return {
				// 图片验证码
				captchaImg: '',

				// 登录表单
				loginForm: {
					username: 'breze',
					password: '123456',
					key: 'developer',
					code: 'breze'
				}
			};
		},
		onLoad() {
			this.getCaptcha();
		},
		onShow() {

		},
		methods: {
			getCaptcha() {
				login.getCaptcha()
					.then(res => {
						this.captchaImg = res.data.result.data.base64Img;
						this.loginForm.key = res.data.result.data.key;
					});
			},
			login() {
				let loginForm = this.$qs.stringify(this.loginForm);
				login.login(loginForm).then(res => {
					console.log(res);
					if (res.data.success) {
						this.$common.showToast('登录成功');

						// uni.reLaunch({
						// 	url: '/pages/tabbar/index/index'
						// });
					} else {
						common.showToast(res.data.message, 2000);
					}
				});
			}
		}
	};
</script>

<style scoped>
	.content {}

	.logo-view {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo-img {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-right: auto;
		margin-bottom: 50rpx;
		margin-left: auto;
	}

	.login-form-view {
		padding: 15px;
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
</style>