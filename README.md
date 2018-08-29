
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

// 一对一(One-To-One)关联
// BelongsTo关联表示一对一关系的外键存在于源模型
let Team  = this.sequelize.define('team', {/* attributes */});
let Player = this.sequelize.define('player', {/* attributes */})
// 添加一个 teamId 属性到 Player 模型
Player.belongsTo(Team);

// HasOne关联表示一对一关系的外键存在于目标模型
var User = sequelize.define('user', {/* attributes */})
var Project = sequelize.define('project', {/* attributes */})
// 添加一个 projectId 属性到 User 模型
Project.hasOne(User)

// One-To-Many关联是指一个源模型连接多个目标模型
var User = sequelize.define('user', {/* attributes */})
var Project = sequelize.define('project', {/* attributes */})
// 添加 projectId 属性到 User 模型
Project.hasMany(User, {as: 'Workers'})

// Belongs-To-Many 关联是指一个源模型连接多个目标模型
var User = sequelize.define('user', {/* attributes */})
var Project = sequelize.define('project', {/* attributes */})
// 互相设置关联 UserProject 其中会 projectId 和 userId 两个外键
Project.belongsToMany(User, {through: 'UserProject'});
User.belongsToMany(Project, {through: 'UserProject'});
// 多对多 调用查询
// 添加
let teacher = await teacherModel.insert({
  TeacherName: 'test'
})
let classroom = await classroomModel.insert({
  ClassroomName: 'test'
})
let res = await teacher.addClassroom(classroom)
// 查找
let teacher = await teacherModel.find({
  TeacherName: 'test'
})
let classroom = await classroomModel.find({
  ClassroomName: 'test'
})
let res = null
let res2 = null
if (teacher[0] && classroom[0]) {
  res = await teacher[0].getClassrooms({attributes: ['id', 'ClassroomName']})
  teacher[0].classroom = res
  res2 = await classroom[0].getTeachers({attributes: ['id', 'TeacherName']})
  classroom[0].teacher = res2
}
// count 统计
resC = await teacher[0].countClassrooms()
res2C = await classroom[0].countTeachers()
// remove 删除
resR = await teacher[0].removeClassrooms(classroom[0])


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
// limit 分页 page 当前页
User.findAll({
  where: where,
  limit: limit,
  offset: limit * (page - 1)
})
Cooking.findAll({
  // exclude 过滤不必要的字段
  attributes: {
    exclude: ['data', 'createdAt', 'updatedAt']
  },
  where: where,
  limit: limit,
  offset: limit * (page - 1)
})
Cooking.findAll({
  // 只方法指定字段
  attributes: ['id', 'name', 'type', 'typeName', 'img', 'praise', 'evaluate'],
  where: where,
  limit: limit,
  offset: limit * (page - 1)
})
// 统计数量 count[0].get('count') 必须使用 .get('count') 方法获取
exports.count = async function (where) {
  let count = await Cooking.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
    where: where
  })
  return count[0] && count[0].get && count[0].get('count')
}

// 因为 Sequelize 做了很多神奇的事，所以你必须在设置关联后调用 Sequelize.sync
// 指定 User 和 UserChildren 的关系为 1：1 的关系 User.userChildrenId === UserChildren.id
// user
/* 字段定义
  id: {
    primaryKey: true, // id 必须是主键
    type: Sequelize.INTEGER,
    autoIncrement: true, // 设置 id 自增
    field: 'id'
  }
*/
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
