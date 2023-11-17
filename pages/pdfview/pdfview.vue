<template>
	<view class="content">
		<BrezePDFView></BrezePDFView>
	</view>
</template>

<script>
	import BrezePDFView from '@/components/breze-pdf-view/index.vue';
	export default {
		data() {
			return {
				viewPath: '',
				viewerUrl: '/static/pdf/hybrid/html/web/viewer.html', // 格式化文件流的一个js 文件
			};
		},

	};
</script>