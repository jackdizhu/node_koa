
node_koa

npm install koa-generator -g koa 生成器
koa -e
koa2 -e

  cors  配置 返回json 处理跨域问题 搭建简单api 服务器

  (JWT/JSON Web Token 安全验证)

    cookie:token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1YTU5ZDVlYjMyODgwMzIxYjA3MTg4MzMiLCJleHAiOjE1MTcwNDY1MDgsImlkIjoiNWEyZGU2ZTJmOTU5NjYyYmM0MjI2ZTExIiwiaWF0IjoxNTE1ODM2OTA3fQ.V88MQUfq2UbPWFuUAOFj51JWeS3jrXPErzHgd_0pjRU
    eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9 由 base64 解密
    {"typ":"JWT","alg":"HS256"} alg 是加密算法名字，typ 是类型
    eyJqdGkiOiI1YTU5ZDVlYjMyODgwMzIxYjA3MTg4MzMiLCJleHAiOjE1MTcwNDY1MDgsImlkIjoiNWEyZGU2ZTJmOTU5NjYyYmM0MjI2ZTExIiwiaWF0IjoxNTE1ODM2OTA3fQ 由 base64 解密
    {"jti":"5a59d5eb32880321b0718833","exp":1517046508,"id":"5a2de6e2f959662bc4226e11","iat":1515836907} iat（创建的时间戳），exp（到期时间戳）
    V88MQUfq2UbPWFuUAOFj51JWeS3jrXPErzHgd_0pjRU 是由前面俩段字符串 HS256 加密后得到

```js
// 关闭检测变量名 中间 下划线
"rules": {
  "camelcase": [
    0,
    {
      "properties": "never"
    }
  ],
}
```

* node koa mysql sequelize 增 改 查

``` js
User.create({
  userName: userName,
  password: password
})
User.update({
  userName: user.userName,
  password: user.password
}, {
  where: {
    id: user.id
  }
})
User.findOne({
  where: where
})
User.findAll({
  where: where
})
```
