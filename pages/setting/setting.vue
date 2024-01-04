<template>
	<view>
		<uni-section title="服务配置" titleFontSize="18px" type="line" padding>

			<uni-row>
				<uni-col :span="6">
					<p class="form-label">服务地址 :</p>
				</uni-col>

				<uni-col :span="6">
					<uni-data-select v-model="protocol" :localdata="protocolRange" @change="protocolChange"
						:clear="false">
					</uni-data-select>
				</uni-col>

				<uni-col :span="12">
					<uni-easyinput v-model="ip" prefixIcon="settings-filled" placeholder="请输入服务器IP地址" trim="all">
					</uni-easyinput>
				</uni-col>
			</uni-row>

			<view class="input-view">
				<uni-row>
					<uni-col :span="6">
						<p class="form-label">端口号 :</p>
					</uni-col>

					<uni-col :span="9">
						<uni-easyinput v-model="port" placeholder="请输入端口号" prefixIcon="circle" maxlength="5"
							type="number">
						</uni-easyinput>
					</uni-col>
				</uni-row>
			</view>
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

				protocolRange: [{
					text: 'http://',
					value: 'http://'
				}, {
					text: 'https://',
					value: 'https://'
				}]
			};
		},

		onShow() {
			this.getAddress();
		},

		methods: {

			/**
			 * 获取后端连接地址
			 */
			getAddress() {
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
							console.log('加载缓存配置成功:', that.protocol + that.ip + that.port);
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



			protocolChange(e) {
				this.protocol = e;
			},


			saveAddress() {
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
		margin-top: 5px;
		font-size: 14px;
		font-weight: bold;
	}

	.save-btn {
		width: 80%;
		line-height: 40px;
		margin-top: 8%;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		color: #fff;
		background: repeating-linear-gradient(to right, #409EFF, #66B1FF);
	}

	.save-btn-view {
		margin-top: 40rpx;
		width: 60%;
		height: 60%;
		margin: 0 auto;
	}

	.input-view {
		margin-top: 16px;
	}
</style>