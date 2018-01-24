const router = require('koa-router')()

router.prefix('/api')

router.get('/', async (ctx, next) => {
  ctx.body = {
  	obj: {
  		code: '1',
	  	msg: 'ok'
  	}
  };
})
router.get('/test', async (ctx, next) => {
  ctx.body = {
  	obj: {
  		code: '1',
	  	msg: 'test'
  	}
  };
})

module.exports = router
