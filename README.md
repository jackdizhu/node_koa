
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
* 数据表关联

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

// 因为 Sequelize 做了很多神奇的事，所以你必须在设置关联后调用 Sequelize.sync
// 指定 User 和 UserChildren 的关系为 1：1 的关系 User.userChildrenId === UserChildren.id
// user
var User = DB.define('user', {
  userChildrenId: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING,
    field: 'user_name'
  },
  password: {
    type: Sequelize.STRING
  }
},
{
  freezeTableName: true
})
// userChildren
var User = DB.define('userChildren', {
  userName: {
    type: Sequelize.STRING,
    field: 'user_name'
  },
  password: {
    type: Sequelize.STRING
  }
},
{
  freezeTableName: true
})

User.belongsTo(UserChildrenModal.User, {foreignKey: 'userChildrenId', targetKey: 'id'})

// user
var User = DB.define('user', {
  userName: {
    type: Sequelize.STRING,
    field: 'user_name'
  },
  password: {
    type: Sequelize.STRING
  }
},
{
  freezeTableName: true
})
// userChildren
var User = DB.define('userChildren', {
  userId: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING,
    field: 'user_name'
  },
  password: {
    type: Sequelize.STRING
  }
},
{
  freezeTableName: true
})
// 指定 User 和 UserChildren 的关系为 1 : n 的关系 User.id === UserChildren.userId
User.hasMany(UserChildrenModal.User, {foreignKey: 'id', targetKey: 'userId'})
```
