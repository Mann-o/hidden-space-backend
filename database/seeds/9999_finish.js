'use strict'

const Database = use('Database')

class FinishSeeder {

  async run () {
    await Database.close()
  }

}

module.exports = FinishSeeder
