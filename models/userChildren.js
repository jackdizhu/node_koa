// user.js

let Sequelize = require('sequelize')
// var DB = require('../database/index')
let UserChildren = require('./index').UserChildren
// var UserModal = require('./user')

// 添加新用户
exports.insert = function ({userName, password, userId}) {
  // 向 user 表中插入数据
  return UserChildren.create({
    userId: userId,
    userName: userName,
    password: password
  })
}

// 通过用户名查找用户
exports.findOne = function (where) {
  return UserChildren.findOne({
    where: where
  })
}

// 通过用户名查找用户
exports.find = function (where, limit, page) {
  limit = limit || 10
  page = page || 1
  return UserChildren.findAll({
    where: where,
    limit: limit,
    offset: limit * (page - 1)
  })
}

// 统计数量
exports.count = function (where) {
  return UserChildren.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
    where: where
  })
}

// 通过 ID 查找
exports.findById = function (id) {
  return UserChildren.findById(id)
}

// 通过 ID 查找
exports.update = function (user) {
  return UserChildren.update({
    userName: user.userName,
    password: user.password
  }, {
    where: {
      id: user.id
    }
  })
}
