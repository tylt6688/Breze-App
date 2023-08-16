<template>
	<view>
		<uni-section title="服务器配置" titleFontSize="18px" type="line" padding>
			<uni-row>
				<uni-col :span="7">
					<p class="form-label">服务器IP地址 :</p>
				</uni-col>

				<uni-col :span="6">
					<uni-easyinput v-model="protocol" prefixIcon="settings-filled" :clearable="false">
					</uni-easyinput>
				</uni-col>

				<uni-col :span="11">
					<uni-easyinput v-model="ip" placeholder="请输入服务器IP地址"></uni-easyinput>
				</uni-col>
			</uni-row>

			<uni-row style="margin-top: 1rem;">
				<uni-col :span="7">
					<p class="form-label">端口号 :</p>
				</uni-col>

				<uni-col :span="9">
					<uni-easyinput v-model="port" placeholder="请输入端口号" prefixIcon="circle" maxlength="5" type="number">
					</uni-easyinput>
				</uni-col>
			</uni-row>

			<uni-row style="margin-top: 1rem;">
				<uni-col :span="7">
					<p class="form-label">界面刷新时间 :</p>
				</uni-col>

				<uni-col :span="9">
					<uni-data-select :clear="false" v-model="time" :localdata="timerange" @change="selectTimeChange">
					</uni-data-select>
				</uni-col>
			</uni-row>
		</uni-section>

		<view class="save-btn-view">
			<button class="save-btn" @click="saveAddress">保 存 配 置</button>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				protocol: 'http://',
				ip: '192.168.8.46',
				port: '8090',

				time: 5000,
				timerange: [{
						value: 1000,
						text: "1s"
					}, {
						value: 2000,
						text: "2s"
					},
					{
						value: 3000,
						text: "3s"
					}, {
						value: 5000,
						text: "5s"
					},
					{
						value: 15000,
						text: "15s"
					},

					{
						value: 30000,
						text: "30s"
					},
					{
						value: 60000,
						text: "60s"
					}
				],

			};
		},


		onShow() {
			this.getAddress();
		},

		methods: {

			selectTimeChange(e) {
				console.log(e);
				this.time = e;
			},

			getAddress() {

				let time = this.$storage.get('time');
				if (time) {
					this.time = time;
				}

				let that = this;
				uni.getStorage({
					key: 'server',
					success: function(res) {
						// 定义 URL 正则表达式
						let urlRegex = /^(https?:)\/\/([\w\d\.-]+):?(\d*)/i;
						// 匹配 URL 正则表达式
						let matches = urlRegex.exec(res.data);
						// 判断是否匹配成功
						if (matches) {
							console.log('缓存配置匹配成功:', that.protocol + that.ip + that.ip);
							// 提取请求方式、IP 地址和端口号
							that.protocol = matches[1] + '//';
							that.ip = matches[2];
							that.port = matches[3] || (that.protocol === 'https:' ? '443' : '80');
						} else {
							console.log('URL 格式不正确！');

						}
					},
					fail: function(res) {
						console.log('未获取到！', res);
					}
				});
			},


			saveAddress() {
				uni.setStorageSync('time', this.time);
				uni.setStorage({
					key: 'server',
					data: this.protocol + this.ip + ':' + this.port,
					success: function() {
						uni.reLaunch({
							url: '/pages/login/login'
						});

						this.$common.showToast('配置保存成功');
					}
				});
			}
		}
	};
</script>

<style>
	.form-label {
		font-size: 30rpx;
		font-weight: bold;
		margin-top: 15rpx;
	}

	.save-btn {
		width: 80%;
		line-height: 80rpx;
		margin-top: 8%;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		color: #fff;
		background: repeating-linear-gradient(to right, #5fd88f, #53E953);
	}

	.save-btn-view {
		margin-top: 40rpx;
		width: 60%;
		height: 60%;
		margin: 0 auto;
	}
</style>