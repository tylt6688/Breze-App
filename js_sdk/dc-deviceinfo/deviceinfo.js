
var WIFI_SERVICE = 'wifi';
var ACTIVITY_SERVICE = 'activity';

/**
 * 获取wifi的mac地址
 */
function getMac(){
try{
  var os = plus.os.name;
  if('Android' == os){
    var main = plus.android.runtimeMainActivity();
    var wifiService = main.getSystemService(WIFI_SERVICE);
    var wifiInfo = plus.android.invoke(wifiService, 'getConnectionInfo');
    var mac = plus.android.invoke(wifiInfo, 'getMacAddress');
    return mac;
  }else{
    //unsupport, nothing to do.
  }
}catch(e){
  console.error('error @getMac!!');
}
}

/**
 * 获取手机可用内存大小
 * 单位为字节
 */
function getAvailMemory(){
try{
  var os = plus.os.name;
  if('Android' == os){
    var ActivityManager = plus.android.importClass('android.app.ActivityManager');  
    var mi = new ActivityManager.MemoryInfo();  
    var activityService = plus.android.runtimeMainActivity().getSystemService(ACTIVITY_SERVICE);  
    activityService.getMemoryInfo(mi);  
    var memoryInfo = mi.plusGetAttribute('availMem');
    return memoryInfo;
  }else{
    //unsupport, nothing to do.
  }
}catch(e){
  console.error('error @getAvailMemory!!');
}
}

/**
 * 获取手机总内存大小
 * 单位为KB
 */
function getTotalMemory(){
try{
  var os = plus.os.name;
  if('Android' == os){
    var memInfo = '/proc/meminfo';
    var temp = '',
      ramSize = '',
      arrays, initMemory;
    var fileReader = plus.android.importClass("java.io.FileReader");
    var bufferedReader = plus.android.importClass("java.io.BufferedReader");
    var FileReader = new fileReader(memInfo);
    var BufferedReader = new bufferedReader(FileReader, 8192);
    while ((temp = BufferedReader.readLine()) != null) {
      if (-1 != temp.indexOf('MemTotal:')) {
        var value = temp.replace(/[^0-9]/ig, "");
        ramSize = parseInt(value);
      }
    }
    return ramSize;
  }else{
    //unsupport, nothing to do.
  }
}catch(e){
  console.error('error @getAvailMemory!!');
}
}

/**
 * 获取内部存储空间大小
 * 单位为字节
 */
function getInternalStorage(){
try{
  var os = plus.os.name;
  if('Android' == os){
    var environment = plus.android.importClass('android.os.Environment');
    var statFs = plus.android.importClass('android.os.StatFs');
    var files = plus.android.importClass('java.io.File');
    var Files = environment.getDataDirectory();
    var StatFs = new statFs(Files.getPath());
    var blockSize = parseFloat(StatFs.getBlockSize());
    var blockCount = parseFloat(StatFs.getBlockCount());
    var internalMemSize = blockSize*blockCount;
    return internalMemSize;
  }else{
    //unsupport, nothing to do.
  }
}catch(e){
  console.error('error @getCpuInfo!!');
}
}

/**
 * 获取CPU信息
 */
function getCpuInfo(){
try{
  var os = plus.os.name;
  if('Android' == os){
    var cpuInfo = '/proc/cpuinfo';
    var temp = '',
      cpuHardware;
    var fileReader = plus.android.importClass('java.io.FileReader');
    var bufferedReader = plus.android.importClass('java.io.BufferedReader');
    var FileReader = new fileReader(cpuInfo);
    var BufferedReader = new bufferedReader(FileReader, 8192);
    while ((temp = BufferedReader.readLine()) != null) {
      if (-1 != temp.indexOf('Hardware')) {
        cpuHardware = temp.substr(parseInt(temp.indexOf(":")) + 1);
      }
    }
    return cpuHardware;
  }else{
    //unsupport, nothing to do.
  }
}catch(e){
  console.error('error @getCpuInfo!!');
}
}

/**
 * 获取CPU核数
 */
function getCpuCount(){
try{
  var os = plus.os.name;
  if('Android' == os){
    var Runtime = plus.android.importClass("java.lang.Runtime");  
    var cpuCount = Runtime.getRuntime().availableProcessors();  
    return cpuCount;
  }else{
    //unsupport, nothing to do.
  }
}catch(e){
  console.error('error @getCpuInfo!!');
}
}



module.exports = {
  mac: getMac,
  availMem: getAvailMemory,
  totalMem: getTotalMemory,
  interStorage: getInternalStorage,
  cpuInfo: getCpuInfo,
  cpuCount: getCpuCount
}
