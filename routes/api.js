const router = require('koa-router')()
const Mock = require('mockjs')

router.prefix('/api')

let for_req_fn = (obj, _get, _post) => {
  Object.keys(obj).forEach(item => {
    if (typeof obj[item] === 'object') {
      for_req_fn(obj[item], _get, _post)
    } else if (typeof obj[item] === 'function') {
      obj[item] = obj[item](_get, _post)
    }
  })
}

router.get('/', async (ctx, next) => {
  let _obj = {
    obj: {
      code: '1',
      msg: 'ok',
      _get: function (_get, _post) {
        return _get
      }
    }
  }

  for_req_fn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj);
})
router.post('/', async (ctx, next) => {
  let _obj = {
    obj: {
      code: '1',
      msg: 'ok',
      _post: function (_get, _post) {
        return _post
      }
    }
  }
  console.log(ctx.request.body)
  
  for_req_fn(_obj, ctx.query, ctx.request.body)
  ctx.body = Mock.mock(_obj);
})
router.get('/test', async (ctx, next) => {
  let _obj = {
    obj: {
      code: '1',
      msg: 'test'
    }
  }
  _obj
  ctx.body = Mock.mock(_obj);
})

module.exports = router
