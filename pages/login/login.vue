<template>
	<view class="content">
		<view class="logo_box">
			<image class="logo" src="/static/logo.png"></image>
		</view>
		<uni-section title="账户登录" titleFontSize="20px" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :modelValue="loginForm">
					<uni-forms-item label="账号:" required>
						<uni-easyinput v-model="loginForm.username" placeholder="请输入账号" />
					</uni-forms-item>
					<uni-forms-item label="密码:" required>
						<uni-easyinput type="password" v-model="loginForm.password" placeholder="请输入密码" />
					</uni-forms-item>
					<uni-forms-item label="验证码:" required>
						<view class="form-item">
							<uni-easyinput v-model="loginForm.code" placeholder="请输入验证码" />
							<image class="kaptcha_img" :src="kaptchaImg" @click="getKaptcha"></image>
						</view>
					</uni-forms-item>
				</uni-forms>
			</view>
			<view style="margin-top: 60px;width: 60%;margin: 0 auto;">
				<button class="btn_login" type="default" @click="login">立即登录</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
	import config from "@/config";
	import storage from "@/utils/storage";
	export default {
		data() {
			return {
				// 图片验证码
				kaptchaImg: "",
				// 登录表单
				loginForm: {
					username: "",
					password: "",
					code: "",
					key: "",
				},
			}
		},
		onLoad() {
			this.getKaptcha();
		},
		methods: {
			getKaptcha() {
				var that = this;
				uni.request({
					url: config.app_api_url + '' + '/kaptcha',
					success: (res) => {
						that.kaptchaImg = res.data.result.data.base64Img;
						that.loginForm.key = res.data.result.data.key;
					}
				});
			},
			login() {
				var that = this;
				uni.request({
					url: config.app_api_url + '' + '/login',
					data: that.loginForm,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						console.log(res)
						if (res.statusCode == 200) {
							if (res.data.errorCode == null) {
								storage.set("token", res.header.authorization)
								uni.switchTab({
									url: '/pages/index/index'
								});
							}else {
								uni.showToast({
									title: res.data.message,
									icon:'none',
									duration: 2000
								});
							}
						}else {
							uni.showToast({
								title: '网络连接失败！',
								icon:'none',
								duration: 2000
							});
						}
						
					},
				});
			}
		}
	}
</script>

<style scoped>
	.content {}

	.logo_box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.kaptcha_img {
		display: flex;
		align-items: center;
		height: 35px;
		width: 80px;
		line-height: 35px;
		margin-left: 10px;
	}

	.form-item {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.btn_login {
		text-align: center;
		background: #67C23A;
		width: 80%;
		line-height: 80rpx;
		color: #fff;
		font-size: 30rpx;
		margin-top: 5%;
	}
</style>
