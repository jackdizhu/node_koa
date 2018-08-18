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
    userName: 'jackdizhu',
    password: 'password'
  }
  let user = await userModel.insert(obj)

  obj.userId = user.id
  obj.userName += '1'
  obj.password += '1'
  let userChildren = await userChildrenModel.insert(obj)

  ctx.body = {
    title: 'koa2 json',
    user: user,
    userChildren: userChildren
  }
})
// 查找记录
router.get('/find', async (ctx, next) => {
  let pagesize = ctx.query.pagesize || 1
  let page = ctx.query.page || 1
  // let users = await userModel.find({ userName: 'jackdizhu' })
  let count = await userModel.count({userName: 'jackdizhu'})
  let users = await userModel.findInclude({userName: 'jackdizhu'}, {userName: 'jackdizhu1'}, pagesize, page)

  ctx.body = {
    title: 'koa2 json',
    data: {
      count: count,
      pagesize: pagesize,
      page: page,
      data: users
    }
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
