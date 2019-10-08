'use strict'

const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('slug').notNullable().unique()
      table.string('title').notNullable()
      table.text('content').notNullable()
      table.integer('author_id').unsigned().index()
      table.foreign('author_id').references('id').on('users').onDelete('cascade')
      table.timestamp('created').notNullable()
      table.timestamp('last_updated').nullable()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
