const router = require('koa-router')()
const teacherModel = require('../models/teacher')
const classroomModel = require('../models/classroom')
// let TeacherClassroom = require('../models/index.js').TeacherClassroom

router.prefix('/teacherClassroom')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // let users = await userModel.find({userName: 'jackdizhu'})
  ctx.body = {
    title: 'koa2 json'
  }
})

// 添加记录
router.get('/add', async (ctx, next) => {
  let teacher = await teacherModel.insert({
    TeacherName: 'test'
  })
  let classroom = await classroomModel.insert({
    ClassroomName: 'test'
  })

  let res = await teacher.addClassroom(classroom)
  // classroom.addTeacher(teacher)

  console.log(teacher)

  ctx.body = {
    title: 'koa2 json',
    data: {
      teacher: teacher,
      classroom: classroom,
      teacherClassroom: res
    }
  }
})
router.get('/find', async (ctx, next) => {
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
  // teacher.getClassroom()
  // classroom.getTeacher()

  ctx.body = {
    title: 'koa2 json',
    data: {
      teacher: teacher,
      classroom: classroom
    }
  }
})

module.exports = router
