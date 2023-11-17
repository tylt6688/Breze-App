<template>
	<view class="content">

		<view class="logo-view">
			<image class="cover-img" mode="scaleToFill" :src="logo"></image>
		</view>

		<view class="footer-view"
			style="-webkit-flex: 1;flex: 1;height: 10rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: flex-end;align-items: center;margin-top: 900rpx;">
			<view>
				<uni-row>
					<uni-col>{{logPath}}</uni-col>
				</uni-row>
				<uni-row>
					<uni-col>Version:1.0.4-Release</uni-col>
				</uni-row>

				<uni-row>
					<uni-col> © 2023</uni-col>
				</uni-row>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				logo: '/static/logo.png',
				logPath: ''
			}
		},
		onShow() {
			this.logPath = this.$storage.get('logPath');
		}
	}
</script>

<style>
	.flex-item {
		width: 33.3%;
		text-align: center;
	}

	.flex-item-V {
		width: 100%;
		text-align: center;
	}

	.text {
		margin: 15rpx 10rpx;
		padding: 0 20rpx;
		background-color: #ebebeb;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #777;
		font-size: 26rpx;
	}

	.logo-view {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cover-img {

		height: 300rpx;
	}
</style>