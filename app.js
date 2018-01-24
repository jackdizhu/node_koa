const Koa = require('koa')
const app = new Koa()
const cors = require('koa-cors')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser') // form-data 不支持  x-www-form-urlencoded 改为
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const api = require('./routes/api')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text', 'multipart']
}))
app.use(json())
app.use(cors()) // api 服务器 允许跨域
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes

// 针对 /api 的中间件
app.use(async (ctx, next) => {
  await next()
  if (/^\/api\//.test(ctx.path)) {
    // 处理 !==200 错误
    if (ctx.response.status !== 200) {
      ctx.body = {
        obj: {
          code: '0',
          msg: 'ok'
        }    
      }
    }
    // let {...obj} = ctx.body
    // ctx.body = {}
    // ctx.body.obj = obj
    
    if (ctx.body) {
      ctx.body.path = ctx.path
      ctx.body.query = ctx.query
      ctx.body.body = ctx.request.body
      ctx.body._req = ctx.request
      ctx.body._res = ctx.response
      ctx.body.apiV = '1.0'
      // console.log(ctx.path)
    }
  }
})

app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(api.routes(), api.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  ctx.body = err
  console.error('server error', err, ctx)
});

module.exports = app
