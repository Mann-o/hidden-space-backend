'use strict'

const BaseModel = use('BaseModel')

class Space extends BaseModel {
  static get computed () {
    return [
      'address',
    ]
  }

  therapists () {
    return this
      .belongsToMany('Therapist')
      .pivotTable('spaces_therapists')
  }

  post () {
    return this.belongsTo('Post')
  }

  images () {
    return this
      .belongsToMany('Image')
      .pivotTable('space_images')
  }

  getAddress () {
    return (this.building_name == null)
      ? this.street_address
      : `${this.building_name}, ${this.street_address}`
  }
}

module.exports = Space
