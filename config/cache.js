'use strict'

const Env = use('Env')

const CacheConfig = {
  default: Env.get('CACHE_STORE', 'object'),

  stores: {
    object: {
      driver: 'object',
    },

    database: {
      driver: 'database',
      table: 'cache',
      connection: 'sqlite',
    },

    redis: {
      driver: 'redis',
      connection: 'local',
    },

    null: {
      driver: 'null',
    },
  },

  prefix: Env.get('CACHE_PREFIX', 'adonis'),
}

module.exports = CacheConfig
