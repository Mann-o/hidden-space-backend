'use strict'

const chalk = require('chalk')
const Database = use('Database')
const Factory = use('Factory')

class SpacesSeeder {
  async run() {
    try {
      await Factory.model('Space').createMany(3)
      console.log(`${chalk.green('seed:')} 0002_spaces.js`)
    } catch (error) {
      console.log(error)
      Database.close()
    }
  }
}

module.exports = SpacesSeeder
