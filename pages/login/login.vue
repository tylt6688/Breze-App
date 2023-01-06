<template>
	<view class="content">
		<view class="logo_box"><image class="logo" src="/static/logo.png"></image></view>
		<uni-section title="账户登录" titleFontSize="20px" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :modelValue="loginForm">
					<uni-forms-item label="账号:" required><uni-easyinput v-model="loginForm.username" placeholder="请输入账号" /></uni-forms-item>
					<uni-forms-item label="密码:" required><uni-easyinput type="password" v-model="loginForm.password" placeholder="请输入密码" /></uni-forms-item>
					<uni-forms-item label="验证码:" required>
						<view class="form-item">
							<uni-easyinput v-model="loginForm.code" placeholder="请输入验证码" />
							<image class="captcha_img" :src="captchaImg" @click="getCaptcha"></image>
						</view>
					</uni-forms-item>
				</uni-forms>
			</view>
			<view style="margin-top: 60px;width: 60%;margin: 0 auto;"><button class="btn_login" type="default" @click="login">立即登录</button></view>
		</uni-section>
	</view>
</template>

<script>
import config from '@/config';
import storage from '@/utils/storage';
export default {
	data() {
		return {
			// 图片验证码
			captchaImg: '',
			// 登录表单
			loginForm: {
				username: '',
				password: '',
				code: '',
				key: ''
			}
		};
	},
	onLoad() {
		this.getCaptcha();
	},
	methods: {
		getCaptcha() {
			var that = this;
			this.$request({
				url: '/captcha',
				method: 'GET'
			}).then(res => {
				console.log(res);
				that.captchaImg = res.data.result.data.base64Img;
				that.loginForm.key = res.data.result.data.key;
			});
		},
		login() {
			this.$request({
				url: '/login',
				method: 'POST',
				data: this.baseFormData
			}).then(res => {
				if (res.data.Success) {
					console.log('登录成功');
					uni.showToast({
						icon: 'none',
						title: '登录成功'
					});
					uni.setStorageSync('token', res.data.Data);
					uni.setStorageSync('username', this.baseFormData.username);
					uni.reLaunch({
						url: '/pages/index/index'
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: res.data.Msg,
						duration: 2000
					});
				}
			});
		}
	}
};
</script>

<style scoped>
.content {
}

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

.captcha_img {
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
	background: #67c23a;
	width: 80%;
	line-height: 80rpx;
	color: #fff;
	font-size: 30rpx;
	margin-top: 5%;
}
</style>
