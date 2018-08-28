// user.js

var Sequelize = require('sequelize')
// var DB = require('../database/index')
// let UserChildren = require('./index').UserChildren
let Teacher = require('./index').Teacher

// 添加新用户
exports.insert = function ({TeacherName}) {
  // 向 Teacher 表中插入数据
  return Teacher.create({
    TeacherName: TeacherName
  })
}

// 通过用户名查找用户
exports.findOne = function (where) {
  return Teacher.findOne({
    where: where
  })
}

// 通过用户名查找用户
// exports.findOneInclude = function (where) {
//   return Teacher.findOne({
//     include: [{
//       model: TeacherChildren,
//       'where': where
//     }]
//   })
// }

// 通过用户名查找用户
exports.find = function (where, limit, page) {
  limit = limit || 10
  page = page || 1
  return Teacher.findAll({
    where: where,
    limit: limit,
    offset: limit * (page - 1)
  })
}

// 统计数量
exports.count = async function (where) {
  let count = await Teacher.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
    where: where
  })
  return count[0] && count[0].get && count[0].get('count')
}

// 通过用户名查找用户
// exports.findInclude = function (where, whereChildren, limit, page) {
//   limit = limit || 10
//   page = page || 1
//   return Teacher.findAll({
//     'where': where,
//     limit: limit,
//     offset: limit * (page - 1),
//     include: [
//       {
//         model: TeacherChildren,
//         'where': whereChildren
//       }
//     ]
//   })
// }

// 通过 ID 查找
exports.findById = function (id) {
  return Teacher.findById(id)
}

// 通过 ID 查找
exports.update = function (Teacher) {
  return Teacher.update({
    name: Teacher.name
  }, {
    where: {
      id: Teacher.id
    }
  })
}

