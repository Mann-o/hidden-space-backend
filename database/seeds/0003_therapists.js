'use strict'

const chalk = require('chalk')
const Database = use('Database')
const Factory = use('Factory')

class TherapistsSeeder {
  async run() {
    try {
      await Factory.model('Therapist').createMany(5)
      console.log(`${chalk.green('seed:')} 0003_therapists.js`)
    } catch (error) {
      console.log(error)
      Database.close()
    }
  }
}

module.exports = TherapistsSeeder
