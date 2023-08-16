<template>
	<view class="content">

		<uni-list>

			<uni-easyinput v-model="talk" placeholder="请输入要播报的内容" />

			<view @click="voice">
				<uni-list-item title="声音播报" showArrow></uni-list-item>
			</view>

		</uni-list>
	</view>
</template>

<script>
	const SpeechTTS = uni.requireNativePlugin("MT-TTS-Speech");


	export default {

		data() {
			return {
				talk: "",
			};
		},
		onShow() {

			this.ttsInit();
		},
		methods: {

			ttsInit() {
				console.log('>> TTS:init...')
				SpeechTTS.init((callback) => {
					console.log('>> tts: init success,TTS初始化完成');
				});

				SpeechTTS.onDone((res) => {
					console.log(">> tts: play end " + res)
				});
			},


			voice() {
				// const audioContext = uni.createInnerAudioContext();
				// audioContext.src = '/static/media/a.mp3'; // 音频文件的路径
				// audioContext.play();

				console.log('>> tts: play...');
				const res = SpeechTTS.speak({
					text: this.talk
				});
				console.log('>> tts: play result = ' + res);

			},


		}
	};
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
</style>