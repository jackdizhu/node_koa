const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const Mock = require('mockjs')
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const secret = 'lqwiuerpowjflaskdjffkhgoiwurpoqdjlsakjflsdkf' // 加盐 key
// const concatFiles= require('concat-files')
const crypto = require('crypto')

router.prefix('/api')

let for_req_fn = (obj, _get, _post) => {
  Object.keys(obj).forEach(item => {
    if (typeof obj[item] === 'object') {
      for_req_fn(obj[item], _get, _post)
    } else if (typeof obj[item] === 'function') {
      obj[item] = obj[item](_get, _post)
    }
  })
}
// 文件块合并
const concatFile = function ({name, chunks, fileObj, dist}) {
  return new Promise((resolve, reject) => {
    const fileArr = fileObj.chunks
    const write = fs.createWriteStream(dist)
    write.on('open', () => {
      for (let i = 0; i < chunks; i ++) {
        const chunkData = fs.readFileSync(fileArr[i])
        write.write(chunkData)
      }
      write.end()
    })
    write.on('error', (err) => {
      reject(err)
    })
    write.on('finish', () => {
      fileObj.writeNum += 1
      if (fileObj.writeNum === chunks) {
        let md5sum = crypto.createHash('md5')
        let chunk = fs.readFileSync(dist)
        md5sum.update(chunk)
        let fileMd5 = md5sum.digest('hex')
        resolve(fileMd5)
      }
    })
  })
}
let chunksPathArr = {} // 临时保存统计文件块
// 文件分块上传
router.post('/upload', async (ctx, next) => {
  const chunk = ctx.request.body.chunk || '0'
  const chunks = Number(ctx.request.body.chunks) || 1
  const files = ctx.request.files
  const file = files && files.file
  let code = '1'
  const arr = file.name.split('.')
  const ext = arr[1]
  const name = new Buffer(arr[0]).toString('base64')
  if (file) {
    const reader = fs.createReadStream(file.path)
    let filePath = path.resolve(__dirname, `../public/data/${name}_${chunk}.${ext}`)
    // 文件块数组
    chunksPathArr[name] = chunksPathArr[name] || {
      writeNum: 0,
      chunks: []
    }
    chunksPathArr[name].chunks[Number(chunk)] = filePath
    const write = fs.createWriteStream(filePath)
    write.on('finish', () => {
      let arr = chunksPathArr[name].chunks
      for (let i = 0; i < chunks; i++) {
        if (!arr[i]) {
          return false
        }
      }
      // 文件块合并
      concatFile({
        name,
        fileObj: chunksPathArr[name],
        chunks: chunks,
        dist: path.resolve(__dirname, `../public/data/${name}.${ext}`)
      }).then((fileMd5) => {
        console.log(fileMd5, '---文件合并完成---')
      })
    })
    reader.pipe(write)
    code = '1'
  } else {
    code = '-1'
  }
  ctx.body = {
    file: files.file,
    code: code,
    msg: 'ok'
  }
})

router.get('/', async (ctx, next) => {
  let userToken = {
      name: 'user.name'
  }
  const token = jwt.sign(userToken, secret, {expiresIn: '1h'})  //token签名 有效期为1小时
  // ctx.request.header['token'] = token
  // ctx.res.setHeader('token', token)
  ctx.cookies.set('token', token)
  let _obj = {
    obj: {
      token: token,
      code: '1',
      msg: 'ok',
      _get: function (_get, _post) {
        return _get
      }
    }
  }

  for_req_fn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj);
})
router.post('/', async (ctx, next) => {
  let _obj = {
    obj: {
      code: '1',
      msg: 'ok',
      _post: function (_get, _post) {
        return _post
      }
    }
  }
  console.log(ctx.request.body)

  for_req_fn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj);
})
router.get('/token', async (ctx, next) => {
  const token = 'Bearer ' + (ctx.header.authorization || ctx.query.token || ctx.request.body.token || ctx.cookies.get('token') || '')
  let payload
  if (token) {
      try{
        payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
      }catch(error){
        payload = 'err'
      }
      ctx.body = {
        obj: {
          token: payload,
          _token: token
        }
      }
  } else {
      ctx.body = {
        obj: {
          message: 'token 错误',
          code: -1,
          _token: token
        }
      }
  }
})

module.exports = router
