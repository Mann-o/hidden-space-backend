'use strict'

const Schema = use('Schema')

class TherapistImagesSchema extends Schema {
  up () {
    this.create('therapist_images', (table) => {
      table.increments()
      table.integer('therapist_id').unsigned().index()
      table.foreign('therapist_id').references('id').on('therapists').onDelete('cascade')
      table.integer('image_id').unsigned().index()
      table.foreign('image_id').references('id').on('images').onDelete('cascade')
      table.timestamp('created').notNullable()
      table.timestamp('last_updated').nullable()
    })
  }

  down () {
    this.drop('therapist_images')
  }
}

module.exports = TherapistImagesSchema
