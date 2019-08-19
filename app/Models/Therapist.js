'use strict'

const BaseModel = use('BaseModel')

class Therapist extends BaseModel {
  static get computed () {
    return [
      'full_name',
      'full_name_with_title',
    ]
  }

  spaces () {
    return this
      .belongsToMany('Space')
      .pivotTable('spaces_therapists')
  }

  image () {
    return this.hasOne('Image', 'image_id', 'id')
  }

  getFullName () {
    return `${this.first_names} ${this.last_names}`
  }

  getFullNameWithTitle () {
    return `${this.title} ${this.first_names} ${this.last_names}`
  }
}

module.exports = Therapist
