'use strict'

const Schema = use('Schema')

class UpdateTherapistsSchema extends Schema {
  up () {
    this.alter('therapists', (table) => {
      table.dropColumn('title')
    })
  }

  down () {
    this.alter('therapists', (table) => {
      table.string('title')
    })
  }
}

module.exports = UpdateTherapistsSchema
