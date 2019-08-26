'use strict'

const BaseValidator = use('BaseValidator')

class SpaceUpdateValidator extends BaseValidator {
  get rules () {
    return {
      id: 'required',
      slug: `required|unique:spaces,slug,id,${this.ctx.params.id}`
    }
  }

  get messages () {
    return {
      'id.required': 'Space ID required',
      'slug.required': 'Slug field required',
      'slug.unique': 'Slug is already in use',
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = SpaceUpdateValidator
