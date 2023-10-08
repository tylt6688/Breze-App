<template>
	<view class="content">
		<view>
			<web-view :src="viewPath"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				viewPath: '',
				viewerUrl: '/static/pdf/hybrid/html/web/viewer.html', // 格式化文件流的一个js 文件
			};
		},
		onLoad() {
			// let internetUrl = 'http://xxx.pdf';
			let filePath = '计算机的起源与发展历程.pdf'
			let fileUrl = encodeURIComponent(decodeURIComponent(filePath));
			this.viewPath = this.viewerUrl + '?file=' + fileUrl
		},
		onShow() {

		}
	};
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 20upx;
	}
</style>