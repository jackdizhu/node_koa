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
  let data = false
  if (teacher && classroom && res) {
    data = true
  }

  ctx.body = {
    title: 'koa2 json',
    data: data
  }
})
router.get('/find', async (ctx, next) => {
  let teacher = await teacherModel.findOne({
    TeacherName: 'test'
  })
  let classroom = await classroomModel.findOne({
    ClassroomName: 'test'
  })
  let resC = null
  let res2C = null
  if (teacher) {
    resC = await teacher.countClassrooms()
    teacher = await teacher.getClassrooms({attributes: ['id', 'ClassroomName']})
  }
  if (classroom) {
    res2C = await classroom.countTeachers()
    classroom = await classroom.getTeachers({attributes: ['id', 'TeacherName']})
  }

  ctx.body = {
    title: 'koa2 json',
    data: {
      teacher: teacher,
      teacherC: resC,
      classroom: classroom,
      classroomC: res2C
    }
  }
})
router.get('/remove', async (ctx, next) => {
  let teacher = await teacherModel.find({
    TeacherName: 'test'
  })
  let classroom = await classroomModel.find({
    ClassroomName: 'test'
  })
  let resR = null
  let res2R = null
  if (teacher[0] && classroom[0]) {
    resR = await teacher[0].removeClassrooms(classroom[0])
    // res2R = await classroom[0].removeTeachers()
  }
  // teacher.getClassroom()
  // classroom.getTeacher()

  ctx.body = {
    title: 'koa2 json',
    data: {
      teacher: teacher,
      teacherR: resR,
      classroom: classroom,
      classroomR: res2R
    }
  }
})

module.exports = router
