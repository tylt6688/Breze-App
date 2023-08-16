
# MT-TTS

安卓原生离线语音合成引擎工具插件
包含两个工具：MT-TTS-Speech（调用系统已安装TTS）、MT-TTS-Baidu(调用百度离线SDK，需要自行购买授权)

## MT-TTS-Speech

调用安卓系统已安装的TTS进行语音合成播放

[相关免费的安卓语音引擎TTS](https://blog.csdn.net/yingchengyou/article/details/79591954)

### 使用方式

```js
const TTSSpeech = uni.requireNativePlugin("MT-TTS-Speech");
```

### API

- 初始化 `init(callback, engineName?)`
- 获取已系统安装的TTS `getInstallTTS(([{label, name}])=>{})`
- 设置引擎 `setEngine(engineName)`
- 设置语调 `setPitch(num)` 0-100, 默认 50
- 设置语速 `setSpeed(num)` 0-100, 默认 50
- 获取状态 `isSpeeking()`
- 设置语言 `setLanguage(name)` 默认中文
- 播放 `speek({text: 'test'})`
- 停止 `stop()`
- 销毁 `destroy()`
- 打开语音设置 `openSetting()`
- 开始播放回调注册 `onStart(callback)`
- 完成播放回调注册 `onDone(callback)`
- 播放出错回调注册 `onError(callback)`


### 示例

```js
TTSSpeech.getInstallTTS(list => {
  list.forEach(v => console.log(`引擎名 ${v.label} 包名：${v.name}`));
})

TTSSpeech.init((status) => {
  if(status === 0){
    console.log('引擎初始化成功')
    TTSSpeech.speek({ text: '语音播放成功'})
  }
}, 'com.iflytek.speechcloud')
```

## MT-TTS-Baidu

调用百度离线SDK，需要购买百度授权

[百度语音离线合成SDK文档](https://ai.baidu.com/ai-doc/SPEECH/Qk4nwu25z)

### 使用方式

```js
const TTSBaidu = uni.requireNativePlugin("MT-TTS-Baidu");
```

### API

- 初始化 `init(options, callback)`
- 设置语调 `setPitch(num)` 范围 0-9，默认5
- 设置语速 `setSpeed(num)` 范围 0-9，默认5
- 设置语速 `setVolumn(num)` 范围 0-9，默认15
- 获取状态 `isSpeeking()`
- 播放 `speek(text, utteranceId)`
- 播放 `changeSpeeker(text)` text: F(度小美)、M(度小宇)、Y(度丫丫)、X(度逍遥), 成功返回0
- 停止合成 `stop()`
- 暂停播放 `paused()`
- 恢复播放 `resume()`
- 销毁 `destroy()`
- 开始播放回调注册 `onStart(callback)`
- 完成播放回调注册 `onDone(callback)`
- 播放出错回调注册 `onError(callback)`


### 示例

```js
TTSBaidu.init({
  appId: '',
  appKey: '',
  secretKey: '',
  sn: '', // 序列号
}, (status) => {
  if(status === 0){
    console.log('初始化成功')
    TTSBaidu.speek('语音播放成功!');
  }
})
```