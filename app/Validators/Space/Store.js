'use strict'

const BaseValidator = use('BaseValidator')

class SpaceStoreValidator extends BaseValidator {
  get rules () {
    return {
      slug: 'required|unique:spaces,slug',
      street_address: 'required',
      city: 'required',
    }
  }

  get messages () {
    return {
      'slug.required': 'Slug field required',
      'slug.unique': 'Slug is already in use',
      'street_address.required': 'Street Address field is required',
      'city.required': 'City field is required',
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = SpaceStoreValidator
