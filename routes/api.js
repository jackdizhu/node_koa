const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = {
  	code: '1',
  	msg: 'ok'
  };
})

router.get('/test', async (ctx, next) => {
  this.body = {
  	code: '1',
  	msg: 'test'
  };
})

module.exports = router
