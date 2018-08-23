const fs = require("fs");
const path = require("path");
const qiniu = require("qiniu")
// 相册相对路径
var files_filename = path.resolve(__dirname, '../data/' + 'files.json')
var err_filename = path.resolve(__dirname, '../data/' + 'err.json')
const fileDir = path.resolve(__dirname, '../data/img/')

var arr = [];
var errArr = [];

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '';
qiniu.conf.SECRET_KEY = '';

//要上传的空间
let bucket = '';

//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
  return putPolicy.token();
}

//构造上传函数
async function uploadFile(uptoken, key, localFile, filename) {
  var extra = new qiniu.io.PutExtra();
  return new Promise((resolve, reject) => {
    qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
      if (!err) {
        arr.push(filename)
        // 上传成功， 处理返回值
        console.log('upload : ' + filename);
      } else {
        console.log(err, 222);
        errArr.push(filename)
      }
      resolve({filename: filename, err: err})
    })
  })
}

//读取文件后缀名称，并转化成小写
function getFilenameSuffix(file_name) {
  if (file_name == '.DS_Store') {
    return '.DS_Store';
  }
  if (file_name == null || file_name.length == 0)
    return null;
  var result = /\.[^\.]+/.exec(file_name);
  return result == null ? null : (result + "").toLowerCase();
}

//获取文件名后缀名，和上一个函数重复，暂时保留参考实现方式
String.prototype.extension = function () {
  var ext = null;
  var name = this.toLowerCase();
  var i = name.lastIndexOf(".");
  if (i > -1) {
    var ext = name.substring(i);
  }
  return ext;
}

//判断Array中是否包含某个值
Array.prototype.contain = function (obj) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === obj)
      return true;
  }
  return false;
};

// 类型匹配
function typeMatch(type, filename) {
  var ext = filename.extension();
  if (type.contain(ext)) {
    return true;
  }
  return false;
}

const image = async function () {
  // let files = await fs.readdir(fileDir)
  fs.readdir(fileDir, function (err, files) {
    if (err) {
      console.log(err, 111)
      return;
    }
    (async function iterator(index) {
      if (index == files.length) {
        fs.writeFile(files_filename, JSON.stringify(arr, null, "\t"));
        fs.writeFile(err_filename, JSON.stringify(errArr, null, "\t"));
        return;
      }
      var imgExt = new Array(".png", ".jpg", ".jpeg", ".bmp", ".gif"); //图片文件的后缀名
      if (typeMatch(imgExt, files[index])) {
        var suffix = getFilenameSuffix(files[index]);
        if (!(suffix == '.js' || suffix == '.DS_Store')) {
          //要上传文件的本地路径
          let filePath = fileDir + '/' + files[index];
          // console.log(files[index], 111)
          //上传到七牛后保存的文件名
          let key = files[index];
          //生成上传 Token
          let token = uptoken(bucket, key);

          await uploadFile(token, key, filePath, files[index]);
        }
      }
      await iterator(index + 1);
    }(0))
  })
}

const fn_image = async () => {
  let R = await image()
}

fn_image()
