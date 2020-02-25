'use strict'

const Schema = use('Schema')

class UpdateTherapistsSchema extends Schema {
  up () {
    this.alter('therapists', (table) => {
      table.string('treatment').nullable()
    })
  }

  down () {
    this.alter('therapists', (table) => {
      table.dropColumn('treatment')
    })
  }
}

module.exports = UpdateTherapistsSchema
