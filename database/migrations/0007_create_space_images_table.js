'use strict'

const Schema = use('Schema')

class SpaceImagesSchema extends Schema {
  up () {
    this.create('space_images', (table) => {
      table.increments()
      table.integer('space_id').unsigned().index()
      table.foreign('space_id').references('id').on('spaces').onDelete('cascade')
      table.integer('image_id').unsigned().index()
      table.foreign('image_id').references('id').on('images').onDelete('cascade')
      table.timestamp('created').notNullable()
      table.timestamp('last_updated').nullable()
    })
  }

  down () {
    this.drop('space_images')
  }
}

module.exports = SpaceImagesSchema
