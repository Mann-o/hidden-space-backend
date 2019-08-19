'use strict'

const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email_address', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.boolean('has_verified_email_address').notNullable().defaultTo(false)
      table.uuid('email_verification_token').nullable().defaultTo(null)
      table.uuid('reset_password_token').nullable().defaultTo(null)
      table.uuid('delete_account_token').nullable().defaultTo(null)
      table.datetime('last_logged_in').nullable()
      table.timestamp('created').notNullable()
      table.timestamp('last_updated').nullable()
    })
  }

  down () {
    this.raw('DROP TABLE users CASCADE')
  }
}

module.exports = UsersSchema
