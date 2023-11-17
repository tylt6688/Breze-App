<template>
	<view>
		<view class="content">
			<view>
				<web-view :src="viewPath"></web-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "BrezePDFView",
		data() {
			return {
				viewPath: '',
				viewerUrl: '/static/pdf/hybrid/html/web/viewer.html', // 格式化文件流的一个js 文件
			};
		},
		onLoad() {
			// let internetUrl = 'http://xxx.pdf';
			let filePath = 'test.pdf'
			let fileUrl = encodeURIComponent(decodeURIComponent(filePath));
			this.viewPath = this.viewerUrl + '?file=' + fileUrl
		},
		onShow() {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 20upx;
	}
</style>