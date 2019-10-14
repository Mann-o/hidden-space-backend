'use strict'

const Schema = use('Schema')

class PostImagesSchema extends Schema {
  up () {
    this.create('post_images', (table) => {
      table.increments()
      table.integer('post_id').unsigned().index()
      table.foreign('post_id').references('id').on('posts').onDelete('cascade')
      table.integer('image_id').unsigned().index()
      table.foreign('image_id').references('id').on('images').onDelete('cascade')
      table.timestamp('created').notNullable()
      table.timestamp('last_updated').nullable()
    })
  }

  down () {
    this.drop('post_images')
  }
}

module.exports = PostImagesSchema
