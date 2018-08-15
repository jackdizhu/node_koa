const router = require('koa-router')()
const userModel = require('../models/user')
const userChildrenModel = require('../models/userChildren')

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
  // let users = await userModel.find({name: 'jackdizhu'})
  ctx.body = {
    title: 'koa2 json'
  }
})
// 添加记录
router.get('/add', async (ctx, next) => {
  let userChildren = await userChildrenModel.insert({
    name: 'jackdizhu1',
    password: 'password1'
  })
  let users = await userModel.find({ name: 'jackdizhu' })
  let obj = {
    name: 'jackdizhu',
    password: 'password',
    _userChildren: userChildren._id,
    _userChildrenList: [userChildren._id]
  }

  let user = await userModel.insert(obj)
  ctx.body = {
    title: 'koa2 json',
    user: user,
    userChildren: userChildren
  }
})
// 查找记录
router.get('/find', async (ctx, next) => {
  let users = await userModel.find({ name: 'jackdizhu' }).populate('_userChildren').populate('_userChildrenList')
  ctx.body = {
    title: 'koa2 json',
    users: users
  }
})
// 修改记录
router.get('/edit', async (ctx, next) => {
  let _user = await userModel.findOne({name: 'jackdizhu'})
  _user._id = _user._id.toString()
  _user.nick_name = 'jackdizhu1'
  // let R =
  await userModel.update(_user)
  let user = await userModel.findOne({name: 'jackdizhu'})
  ctx.body = {
    title: 'koa2 json',
    user: user
  }
})

module.exports = router
