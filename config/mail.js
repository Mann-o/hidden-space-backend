'use strict'

const Env = use('Env')

const MailConfig = {
  connection: Env.get('MAIL_CONNECTION', 'smtp'),

  smtp: {
    driver: 'smtp',
    pool: true,
    port: Env.get('MAIL_PORT', '2525'),
    host: Env.get('MAIL_HOST', 'smtp.gmail.com'),
    secure: Env.get('MAIL_SECURE', false),
    auth: {
      user: Env.get('MAIL_USERNAME'),
      pass: Env.get('MAIL_PASSWORD'),
    },
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10,
  },

  sparkpost: {
    driver: 'sparkpost',
    apiKey: Env.get('SPARKPOST_API_KEY'),
    extras: {},
  },
}

module.exports = MailConfig
