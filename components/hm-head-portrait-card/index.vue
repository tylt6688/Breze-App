<template>
	<div class="hm-head-portrait-card">
		<div class="box">
			<div class="bd">
				<image class="actionBg" :src="options.actionBg" />
				<image class="avatar" :src="options.avatar" />
				<div class="wrap">
					<text class="name">{{ options.name }}</text>
					<text class="info">{{ options.info }}</text>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'HmHeadPortraitCard',
		props: {
			dataId: {
				type: String,
				default: 'hm-head-portrait-card'
			},
			options: {
				type: Object,
				default: function() {
					return {
						actionBg: './images/img_25814_0_0.png',
						avatar: './images/img_25814_0_1.png',
						name: '@李莉儿',
						info: '旅行社代理人',
					};
				}
			}
		},
		data() {
			return {};
		},
		methods: {}
	};
</script>
<style>
	@import './index.response.css';
</style>
