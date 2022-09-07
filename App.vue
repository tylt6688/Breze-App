<script>
	import storage from '@/utils/storage.js'
	export default {
		onLaunch: function() {
			console.log(">>>>>>>", storage.get("token"))
			if (!storage.get("token")) {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
			console.log('App Launch')
		},
		onShow: function() {

			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
