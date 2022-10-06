<template>
	<view class="container">
		<view class="class-head">
			<!-- //默认显示的 -->
			<image v-if="!imgUrl" :src="options.avatar" mode="aspectFit" class="headPhoto"  @tap="openChooseImg"></image>
			<!-- //用户点击修改的 -->
			<image v-else :src="imgUrl" mode="aspectFit" class="headPhoto"></image>
		</view>
		<uni-section title="个人资料" type="line">
			<uni-card :is-shadow="false">
				<uni-forms ref="baseForm" :modelValue="options">
					<uni-forms-item label="用户名:">
						<uni-easyinput v-model="options.username" :disabled="true"/>
					</uni-forms-item>
					<uni-forms-item label="姓 名:">
						<uni-easyinput v-model="options.trueName" :disabled="editFlag"/>
					</uni-forms-item>
					<uni-forms-item label="手机号:">
						<uni-easyinput v-model="options.phone" :disabled="editFlag"/>
					</uni-forms-item>
					<uni-forms-item label="身 份:">
						<uni-easyinput v-model="this.roles" :disabled="true"/>
					</uni-forms-item>
					<uni-forms-item label="邮 箱:">
						<uni-easyinput v-model="options.email" :disabled="editFlag"/>
					</uni-forms-item>
					<uni-forms-item label="居住地:">
						<uni-easyinput v-model="options.city" :disabled="editFlag"/>
					</uni-forms-item>
					<uni-forms-item label="创 建:">
						<uni-easyinput v-model="createTime" :disabled="true"/>
					</uni-forms-item>
					<uni-forms-item label="登 录:">
						<uni-easyinput v-model="loginTime" :disabled="true"/>
					</uni-forms-item>
				</uni-forms>
			</uni-card>
		</uni-section>
		<uni-section title="所任职位" type="line">
			<uni-card :is-shadow="false">
			</uni-card>
		</uni-section>
		<view class="btn-class" v-if="editFlag">
			<button class="button" type="primary" @click="editInfo()">编辑资料</button>
		</view>
		<view class="btn-class" v-else>
			<button class="button" type="default" style="background-color: green;color: white;" @click="saveInfo()">保存资料</button>
		</view>
	</view>
</template>

<script>
	import config from "@/config";
	import mine from '@/api/mine/mine'
	import HmHeadPortraitCard from '@/components/hm-head-portrait-card/index.vue'

	export default {
		components: {
			HmHeadPortraitCard
		},
		data() {
			return {
				title: 'UserCenter',
				imgUrl: "",
				photoStyleHeight: '',
				roles: '',
				createTime: '',
				loginTime: '',
				editFlag: true,
				options: {}
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				var that = this;
				mine.getUserInfo().then((res) => {
					var info = res.result.data.result;
					console.log("[]*[*][*]", info)
					this.options = info;
					this.createTime = this.options.createTime.replace("T"," ");
					this.loginTime = this.options.loginTime.replace("T"," ");
					console.log(this.options.roles.length)
					for (let i = 0; i < this.options.roles.length; i++) {
						this.roles = this.roles + this.options.roles[i].name + " ";
					}
				})
			},
			openChooseImg() {
				uni.chooseImage({
					count: 1, //最多可选择的张数
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择，和摄像头功能，默认二者都有
					success: res => {
						console.log(res, '头像res')
						this.imgUrl = res.tempFilePaths[0] //把选择的头像赋值给imgurl
						console.log(this.imgUrl, 'this.imgUrl')
					}
				});
			},
			editInfo() {
				this.editFlag = false;
			},
			saveInfo() {
				this.editFlag = true;
				uni.request({
					url: config.app_api_url + '' + '/sys/user/update_userinfo',
					data: this.options,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {
						console.log(res)
						// if (res.statusCode == 200) {
						// 	if (res.data.errorCode == null) {
						// 		storage.set("token", res.header.authorization)
						// 		uni.switchTab({
						// 			url: '/pages/index/index'
						// 		});
						// 	}else {
						// 		uni.showToast({
						// 			title: res.data.message,
						// 			icon:'none',
						// 			duration: 2000
						// 		});
						// 	}
						// }else {
						// 	uni.showToast({
						// 		title: '网络连接失败！',
						// 		icon:'none',
						// 		duration: 2000
						// 	});
						// }
						
					},
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		/* text-align: center; */
		height: 400upx;
		margin-top: 50upx;
	}

	.list_mine {
		width: 100%;
	}

	.uni-list-item {
		margin-top: 8upx;
		margin-bottom: 8upx;
	}
	.headPhoto {
		width: 150rpx;
		height: 150rpx;
		margin-left: 40%;
		margin-top: 30rpx;
	}
	.btn-class {
		width: 200rpx;
		margin-left: 37%;
	}
</style>
