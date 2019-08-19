'use strict'

const Config = use('Config')
const Env = use('Env')

const SessionConfig = {
  driver: Env.get('SESSION_DRIVER', 'cookie'),
  cookieName: 'adonis-session',
  clearWithBrowser: true,
  age: '2h',
  cookie: {
    httpOnly: true,
    sameSite: false,
    path: '/',
  },
  file: {
    location: 'sessions',
  },
  redis: Config.get('redis.local'),
}

module.exports = SessionConfig
