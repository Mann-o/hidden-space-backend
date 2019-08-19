'use strict'

const Schema = use('Schema')

class SpacesSchema extends Schema {
  up () {
    this.create('spaces', (table) => {
      table.increments()
      table.string('slug').notNullable().unique()
      table.string('property_number').nullable()
      table.string('building_name').nullable()
      table.string('street_address').nullable()
      table.string('city').notNullable()
      table.timestamp('created').notNullable()
      table.timestamp('last_updated').nullable()
    })
  }

  down () {
    this.drop('spaces')
  }
}

module.exports = SpacesSchema
