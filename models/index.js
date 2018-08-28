'use strict'
var Sequelize = require('sequelize')
var DB = require('../database/index')

// 创建 model
var UserChildren = DB.define('userChildren', {
  userId: {
    type: Sequelize.STRING
  },
  userName: {
    type: Sequelize.STRING, // 指定值的类型
    field: 'user_name' // 指定存储在表中的键名称
  }
},
{
  // 如果为 true 则表的名称和 model 相同，即 user
  // 为 false MySQL创建的表名称会是复数 users
  // 如果指定的表名称本就是复数形式则不变
  freezeTableName: true
})

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

// 创建 model
var Classroom = DB.define('classroom', {
  ClassroomName: {
    type: Sequelize.STRING
  }
})
var Teacher = DB.define('teacher', {
  TeacherName: {
    type: Sequelize.STRING
  }
})
// 创建 model
var TeacherClassroom = DB.define('TeacherClassroom', {
  state: {
    type: Sequelize.STRING
  }
})

// 建立表 关联 ( 会生成外键约束 导致新增数据报错 )
// 指定 User 和 UserChildren 的关系为 1：1 的关系 User.userChildrenId === UserChildren.id
// User.belongsTo(UserChildren.User, {foreignKey: 'userChildrenId', targetKey: 'id'})
// 指定 User 和 UserChildren 的关系为 1 : n 的关系 User.id === UserChildren.userId
User.hasMany(UserChildren, {foreignKey: 'id', targetKey: 'userId'})

Classroom.belongsToMany(Teacher, {through: 'TeacherClassroom'})
Teacher.belongsToMany(Classroom, {through: 'TeacherClassroom'})

// 创建表
// 如果 force = true 则会把存在的表（如果users表已存在）先销毁再创建表
// 默认情况下 forse = false
// DB.sync({
//   force: false
// })
;(async function () {
  await User.sync({
    force: false
  })
  await UserChildren.sync({
    force: false
  })
  await Classroom.sync({
    force: false
  })
  await Teacher.sync({
    force: false
  })
  await TeacherClassroom.sync({
    force: false
  })
})()

exports.User = User
exports.UserChildren = UserChildren
exports.Classroom = Classroom
exports.Teacher = Teacher
// exports.TeacherClassroom = TeacherClassroom
