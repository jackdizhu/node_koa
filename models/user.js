// user.js

// var Sequelize = require('sequelize')
// var DB = require('../database/index')
let UserChildren = require('./index').UserChildren
let User = require('./index').User

// 添加新用户
exports.insert = function ({userName, password, userChildrenId}) {
  // 向 user 表中插入数据
  return User.create({
    userChildrenId: userChildrenId,
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
exports.findOneInclude = function (where) {
  return User.findOne({
    include: [{
      model: UserChildren,
      'where': where
    }]
  })
}

// 通过用户名查找用户
exports.find = function (where) {
  return User.findAll({
    where: where
  })
}

// 通过用户名查找用户
exports.findInclude = function (where, whereChildren) {
  return User.findAll({
    'where': where,
    include: [
      {
        model: UserChildren,
        'where': whereChildren
      }
    ]
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

