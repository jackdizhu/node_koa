// user.js

var Sequelize = require('sequelize')
// var DB = require('../database/index')
// let UserChildren = require('./index').UserChildren
let Classroom = require('./index').Classroom

// 添加新用户
exports.insert = function ({ClassroomName}) {
  // 向 Classroom 表中插入数据
  return Classroom.create({
    ClassroomName: ClassroomName
  })
}

// 通过用户名查找用户
exports.findOne = async function (where) {
  return Classroom.findOne({
    attributes: ['id', 'ClassroomName', 'teacher'],
    where: where
  })
}

// 通过用户名查找用户
// exports.findOneInclude = function (where) {
//   return Classroom.findOne({
//     include: [{
//       model: ClassroomChildren,
//       'where': where
//     }]
//   })
// }

// 通过用户名查找用户
exports.find = function (where, limit, page) {
  limit = limit || 10
  page = page || 1
  return Classroom.findAll({
    attributes: ['id', 'ClassroomName', 'teacher'],
    where: where,
    limit: limit,
    offset: limit * (page - 1)
  })
}

// 统计数量
exports.count = async function (where) {
  let count = await Classroom.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
    where: where
  })
  return count[0] && count[0].get && count[0].get('count')
}

// 通过用户名查找用户
// exports.findInclude = function (where, whereChildren, limit, page) {
//   limit = limit || 10
//   page = page || 1
//   return Classroom.findAll({
//     'where': where,
//     limit: limit,
//     offset: limit * (page - 1),
//     include: [
//       {
//         model: ClassroomChildren,
//         'where': whereChildren
//       }
//     ]
//   })
// }

// 通过 ID 查找
exports.findById = function (id) {
  return Classroom.findById(id)
}

// 通过 ID 查找
exports.update = function (Classroom) {
  return Classroom.update({
    name: Classroom.name
  }, {
    where: {
      id: Classroom.id
    }
  })
}

