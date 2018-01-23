var router = require('koa-router')();

router.prefix('/api');

router.get('/', function *(next) {
  this.body = {
  	code: '1',
  	msg: 'ok'
  };
});

router.get('/test', function *(next) {
  this.body = {
  	code: '1',
  	msg: 'test'
  };
});

module.exports = router;
