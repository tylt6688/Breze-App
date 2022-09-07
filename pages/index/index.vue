<template>
	<view class="content">
		<view class=""></view>
		<carousel :img-list="imgList" url-key="url" @selected="selectedBanner" />


		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>

	</view>
</template>

<script>
	import index from '@/api/index/index'
	import request from '@/utils/request.js'
	import carousel from '@/components/vear-carousel/vear-carousel'
	export default {
		components: {
			carousel
		},
		data() {
			return {
				title: '首页',
				imgList: [],
				param: {}
			}
		},
		onLoad() {
			this.getBanner();


		},
		methods: {
			getBanner() {
				index.getBanner().then((res) => {
					this.imgList = res.result.data;
				});
			},
			selectedBanner(item, index) {
				console.log('🥒', item, index)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}



	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
