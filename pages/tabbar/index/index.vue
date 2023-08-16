<template>
	<view class="content">

		<carousel :img-list="imgList" url-key="url" @selected="selectedBanner" />

		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>

	</view>
</template>

<script>
	import index from '@/api/tabbar/index/index';
	import carousel from '@/components/vear-carousel/vear-carousel';
	export default {
		components: {
			carousel
		},
		data() {
			return {
				title: '首页',
				imgList: []
			}
		},
		onShow() {
			// this.getBanner();
			this.getUserInfo();
			this.$common.preloadPage('tabbar/mine/mine')
		},
		methods: {
			getBanner() {
				index.getBanner().then((res) => {
					this.imgList = res.data.result.data;
				});
			},

			getUserInfo() {
				index.getUserInfo().then((res) => {
					let userInfo = res.data.result.data;
					this.$store.commit('INSERT_USER_INFO', userInfo);
				})
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