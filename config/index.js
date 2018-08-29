module.exports = {
  'port': 8000,
  'db': {
    database: 'nodemysql',
    username: 'root',
    password: '',
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
      max: 1000,
      min: 5,
      idle: 1000000
    }
  },
  'jwt': {
    'key': 'user',
    'expire': '14 days',
    'collection': 'tokens',
    'secret': 'shared-secret'
  }
}
