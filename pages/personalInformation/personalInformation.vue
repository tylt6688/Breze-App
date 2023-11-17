<template>
	<view class="container">
		<view class="class-head">

			<image class="avatar-img" mode="aspectFit" :src="imgUrl?imgUrl:options.avatar" @tap="openChooseImg()">
			</image>

		</view>
		<uni-section title="个人资料" type="line">
			<uni-card :is-shadow="false">
				<uni-forms ref="baseForm" :modelValue="options">
					<uni-forms-item label="用户名:">
						<uni-easyinput v-model="options.username" :disabled="true" />
					</uni-forms-item>
					<uni-forms-item label="姓 名:">
						<uni-easyinput v-model="options.trueName" :disabled="editFlag" />
					</uni-forms-item>
					<uni-forms-item label="手机号:">
						<uni-easyinput v-model="options.phone" :disabled="editFlag" />
					</uni-forms-item>
					<uni-forms-item label="身 份:">
						<uni-easyinput v-model="this.roles" :disabled="true" />
					</uni-forms-item>
					<uni-forms-item label="邮 箱:">
						<uni-easyinput v-model="options.email" :disabled="editFlag" />
					</uni-forms-item>
					<uni-forms-item label="居住地:">
						<uni-easyinput v-model="options.city" :disabled="editFlag" />
					</uni-forms-item>
					<uni-forms-item label="创 建:">
						<uni-easyinput v-model="createTime" :disabled="true" />
					</uni-forms-item>
					<uni-forms-item label="登 录:">
						<uni-easyinput v-model="loginTime" :disabled="true" />
					</uni-forms-item>
				</uni-forms>
			</uni-card>
		</uni-section>
		<uni-section title="所任职位" type="line">
			<uni-card :is-shadow="false">

			</uni-card>
		</uni-section>

		<view class="btn-view">
			<button :class="editFlag?'edit_btn':'save_btn'" type="default" @click="editInfo()">
				{{editFlag?'编辑资料':'保存信息'}}
			</button>
		</view>

	</view>
</template>

<script>
	import config from '@/config';
	import mine from '@/api/tabbar/mine/mine';
	import HmHeadPortraitCard from '@/components/hm-head-portrait-card/index.vue';

	export default {
		components: {
			HmHeadPortraitCard
		},
		data() {
			return {
				title: 'UserCenter',
				imgUrl: '',
				photoStyleHeight: '',
				roles: '',
				createTime: '',
				loginTime: '',
				editFlag: true,
				options: {}
			};
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				mine.getUserInfo().then(res => {
					let info = res.data.result.data;
					this.options = info;
					this.createTime = this.options.createTime.replace('T', ' ');
					this.loginTime = this.options.loginTime.replace('T', ' ');

					for (let i = 0; i < this.options.roles.length; i++) {
						this.roles = this.roles + this.options.roles[i].name + ' ';
					}
				});
			},
			openChooseImg() {
				uni.chooseImage({
					count: 1, //最多可选择的张数
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认都有
					sourceType: ['album', 'camera'], // 从相册选择，和摄像头功能，默认都有
					success: res => {
						console.log(res, '头像res');
						this.imgUrl = res.tempFilePaths[0]; // 把选择的头像赋值给imgurl
						console.log(this.imgUrl, 'this.imgUrl');
					}
				});
			},
			editInfo() {
				this.editFlag = false;
			},
			saveInfo() {
				this.editFlag = true;
			}
		}
	};
</script>

<style scoped lang="scss">
	.content {
		margin-top: 5rpx;
	}

	.btn-view {
		width: 300rpx;

	}

	.list_mine {
		width: 100%;
	}

	.uni-list-item {
		margin-top: 8upx;
		margin-bottom: 8upx;
	}

	.avatar-img {
		width: 150rpx;
		height: 150rpx;
		margin-left: 40%;
		margin-top: 30rpx;
	}



	.edit_btn {
		background-color: red;
		color: white;
	}

	.save_btn {
		background-color: green;
		color: white;
	}
</style>