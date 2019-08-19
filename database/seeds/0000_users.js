'use strict'

const chalk = require('chalk')
const Database = use('Database')
const Factory = use('Factory')

class UsersSeeder {
  async run() {
    try {
      await Factory.model('User').createMany(4)
      await Factory.model('User').create({
        username: 'liam',
        emailAddress: 'test5@tynesidegroup.com',
        initialiseDeletion: true,
      })
      console.log(`${chalk.green('seed:')} 0000_users.js`)
    } catch (error) {
      console.log(error)
      Database.close()
    }
  }
}

module.exports = UsersSeeder
