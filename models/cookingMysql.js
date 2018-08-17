'use strict'
var Sequelize = require('sequelize')
var DB = require('../database/indexMysql')

// 创建 model
var User = DB.define('cooking', {
  id: {
    primaryKey: true, // id 必须是主键
    type: Sequelize.STRING, // 指定值的类型
    field: 'id' // 指定存储在表中的键名称
  },
  __v: {
    type: Sequelize.INTEGER, // 指定值的类型
    field: '__v' // 指定存储在表中的键名称
  },
  target: {
    type: Sequelize.STRING, // 指定值的类型
    field: 'target' // 指定存储在表中的键名称
  },
  img: {
    type: Sequelize.STRING, // 指定值的类型
    field: 'img' // 指定存储在表中的键名称
  },
  typeName: {
    type: Sequelize.STRING, // 指定值的类型
    field: 'typeName' // 指定存储在表中的键名称
  },
  type: {
    type: Sequelize.STRING, // 指定值的类型
    field: 'type' // 指定存储在表中的键名称
  },
  name: {
    type: Sequelize.STRING, // 指定值的类型
    field: 'name' // 指定存储在表中的键名称
  },
  data: {
    type: Sequelize.TEXT, // 指定值的类型
    field: 'data' // 指定存储在表中的键名称
  },
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

exports.User = User

// let User = require('./index').User

// 添加新用户
exports.insert = function ({_id, __v, target, img, typeName, type, name, data}) {
  let dataString = ''
  try {
    dataString = JSON.stringify(data)
  } catch (error) {
    dataString = ''
  }
  // 向 user 表中插入数据
  return User.create({
    "id" : _id,
    "__v" : __v,
    "target" : target,
    "img" : img,
    "typeName" : typeName,
    "type" : type,
    "name" : name,
    "data" : dataString
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
