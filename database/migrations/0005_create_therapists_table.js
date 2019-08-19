'use strict'

const Schema = use('Schema')

class TherapistsSchema extends Schema {
  up () {
    this.create('therapists', (table) => {
      table.increments()
      table.string('slug').notNullable().unique()
      table.enum('gender', ['male', 'female'], { useNative: true, enumName: 'therapist_gender_type' })
      table.string('title').notNullable()
      table.string('first_names').notNullable()
      table.string('last_names').notNullable()
      table.string('email_address').notNullable().unique()
      table.string('telephone_number').nullable()
      table.text('biography').nullable()
      table.integer('image_id').unsigned().index()
      table.foreign('image_id').references('id').on('images').onDelete('cascade')
      table.timestamp('created').notNullable()
      table.timestamp('last_updated').nullable()
    })
  }

  down () {
    this.drop('therapists')
    this.raw('DROP TYPE IF EXISTS therapist_gender_type')
  }
}

module.exports = TherapistsSchema
