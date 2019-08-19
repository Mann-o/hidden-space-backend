'use strict'

const Env = use('Env')

const AuthConfig = {
  authenticator: 'session',

  session: {
    serializer: 'lucid',
    model: 'User',
    scheme: 'session',
    uid: 'email_address',
    password: 'password',
  },

  basic: {
    serializer: 'lucid',
    model: 'User',
    scheme: 'basic',
    uid: 'email_address',
    password: 'password',
  },

  jwt: {
    serializer: 'lucid',
    model: 'User',
    scheme: 'jwt',
    uid: 'email_address',
    password: 'password',
    options: {
      secret: Env.get('APP_KEY'),
    },
  },

  api: {
    serializer: 'lucid',
    model: 'User',
    scheme: 'api',
    uid: 'email_address',
    password: 'password',
  },
}

module.exports = AuthConfig
