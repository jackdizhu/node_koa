// user.js

var Sequelize = require('sequelize')
var DB = require('../database/index')

// 创建 model
var User = DB.define('user', {
  userName: {
    type: Sequelize.STRING, // 指定值的类型
    field: 'user_name' // 指定存储在表中的键名称
  },
  // 没有指定 field，表中键名称则与对象键名相同，为 password
  password: {
    type: Sequelize.STRING
  }
},
{
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: true
})

// 创建表
// User.sync() 会创建表并且返回一个Promise对象
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
User.sync({
  force: false
})

// 添加新用户
exports.insert = function ({userName, password}) {
  // 向 user 表中插入数据
  return User.create({
    userName: userName,
    password: password
  })
}

// 通过用户名查找用户
exports.findOne = function (where) {
  return User.findOne({
    where: where
  })
}

// 通过用户名查找用户
exports.find = function (where) {
  return User.findAll({
    where: where
  })
}

// 通过 ID 查找
exports.findById = function (id) {
  return User.findById(id)
}

// 通过 ID 查找
exports.update = function (user) {
  return User.update({
    userName: user.userName,
    password: user.password
  }, {
    where: {
      id: user.id
    }
  })
}

