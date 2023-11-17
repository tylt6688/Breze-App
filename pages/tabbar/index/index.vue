<template>
	<view class="content">

		<view>
			<carousel :img-list="imgList" url-key="url" @selected="selectedBanner" />
		</view>


		<view>
			<uni-card title="卡片信息" thumbnail="/static/logo.png" extra="额外信息" note="Tips">
				<view>
					<uni-table border stripe emptyText="暂无更多数据">
						<!-- 表头行 -->
						<uni-tr>
							<uni-th align="center">故障日期</uni-th>
							<uni-th align="center">故障信息</uni-th>
							<uni-th align="left">出现地址</uni-th>
						</uni-tr>
						<!-- 表格数据行 -->
						<uni-tr v-for="(item,index) in 20" :key="index">
							<uni-td>2020-10-20</uni-td>
							<uni-td>Jeson</uni-td>
							<uni-td>北京市海淀区</uni-td>
						</uni-tr>

					</uni-table>
				</view>
			</uni-card>
		</view>


	</view>
</template>

<script>
	import index from '@/api/tabbar/index/index';
	import mine from '@/api/tabbar/mine/mine';
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
			this.getBanner();
			this.getUserInfo();
			this.$common.preloadPage('tabbar/mine/mine');
		},
		methods: {
			getBanner() {
				index.getBanner().then((res) => {
					this.imgList = res.data.result.data;
				});
			},

			getUserInfo() {
				mine.getUserInfo().then((res) => {
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
		margin-top: 50upx;
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