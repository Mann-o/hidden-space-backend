'use strict'

const Env = use('Env')

const HashConfig = {
  driver: Env.get('HASH_DRIVER', 'bcrypt'),
  bcrypt: {
    rounds: 10,
  },
  argon: {
    type: 1,
  },
}

module.exports = HashConfig
