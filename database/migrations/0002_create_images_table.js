'use strict'

const Schema = use('Schema')

class ImagesSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.string('hash', 56).notNullable()
      table.string('filename').notNullable()
      table.string('extension').notNullable()
      table.string('alt_text').nullable()
      table.string('original_size', 255).nullable()
      table.string('optimised_size', 255).nullable()
      table.string('bytes_saved', 255).nullable()
      table.timestamp('created').notNullable()
      table.timestamp('last_updated').nullable()
    })
  }

  down () {
    this.drop('images')
  }
}

module.exports = ImagesSchema
