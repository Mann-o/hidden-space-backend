'use strict'

const Schema = use('Schema')

class SpacesTherapistsSchema extends Schema {
  up () {
    this.create('spaces_therapists', (table) => {
      table.increments()
      table.integer('space_id').unsigned().index()
      table.foreign('space_id').references('id').on('spaces').onDelete('cascade')
      table.integer('therapist_id').unsigned().index()
      table.foreign('therapist_id').references('id').on('therapists').onDelete('cascade')
      table.timestamp('created').notNullable()
      table.timestamp('last_updated').nullable()
    })
  }

  down () {
    this.drop('spaces_therapists')
  }
}

module.exports = SpacesTherapistsSchema
