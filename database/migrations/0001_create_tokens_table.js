'use strict'

const Schema = use('Schema')

class TokensSchema extends Schema {
  up () {
    this.create('tokens', (table) => {
      table.increments()
      table.integer('user').unsigned().index()
      table.foreign('user').references('id').on('users').onDelete('cascade')
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').notNullable().defaultTo(false)
      table.timestamp('created').notNullable()
      table.timestamp('last_updated').nullable()
    })
  }

  down () {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
