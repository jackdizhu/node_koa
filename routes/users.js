const router = require('koa-router')()
const userModel = require('../models/user')
const userChildrenModel = require('../models/userChildren')
// const userChildrenModel = require('../models/userChildren')

router.prefix('/users')

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
  let obj = {
    userName: 'jackdizhu1',
    password: 'password1'
  }
  let userChildren = await userChildrenModel.insert(obj)

  obj.userChildrenId = userChildren.id
  obj.userName = 'jackdizhu'
  obj.password = 'password'
  let user = await userModel.insert(obj)

  ctx.body = {
    title: 'koa2 json',
    user: user,
    userChildren: userChildren
  }
})
// 查找记录
router.get('/find', async (ctx, next) => {
  // let users = await userModel.find({ userName: 'jackdizhu' })
  let users = await userModel.findInclude({userName: 'jackdizhu'}, {userName: 'jackdizhu1'})

  ctx.body = {
    title: 'koa2 json',
    users: users
  }
})
// 修改记录
router.get('/edit', async (ctx, next) => {
  let _user = await userModel.findOne({userName: 'jackdizhu'})

  _user.userName = 'jackdizhu1'
  console.log(_user, 111)

  // let R =
  await userModel.update(_user)
  let user = await userModel.findOne({userName: 'jackdizhu1'})
  ctx.body = {
    title: 'koa2 json',
    user: user
  }
})

module.exports = router
