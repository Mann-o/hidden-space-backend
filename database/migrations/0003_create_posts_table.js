'use strict'

const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('slug').notNullable().unique()
      table.string('title').notNullable()
      table.text('content').notNullable()
      table.integer('author').unsigned().index()
      table.foreign('author').references('id').on('users').onDelete('cascade')
      table.timestamp('created').notNullable()
      table.timestamp('last_updated').nullable()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
