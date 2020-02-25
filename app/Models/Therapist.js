'use strict'

const BaseModel = use('BaseModel')

class Therapist extends BaseModel {
  static get computed () {
    return [
      'full_name',
    ]
  }

  spaces () {
    return this
      .belongsToMany('Space')
      .pivotTable('spaces_therapists')
  }


  images () {
    return this
      .belongsToMany('Image')
      .pivotTable('therapist_images')
  }

  getFullName () {
    return `${this.first_names} ${this.last_names}`
  }
}

module.exports = Therapist
