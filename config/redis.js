'use strict'

const Env = use('Env')

const RedisConfig = {
  connection: Env.get('REDIS_CONNECTION', 'local'),

  local: {
    host: Env.get('REDIS_HOST', '127.0.0.1'),
    port: Env.get('REDIS_PORT', 6379),
    password: Env.get('REDIS_PASSWORD', null),
    db: 0,
    keyPrefix: ''
  },

  cluster: {
    clusters: [
      {
        host: '127.0.0.1',
        port: 6379,
        password: null,
        db: 0
      },
      {
        host: '127.0.0.1',
        port: 6380,
        password: null,
        db: 0
      }
    ]
  }
}

module.exports = RedisConfig
