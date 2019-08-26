'use strict'

const BaseValidator = use('BaseValidator')

class TherapistUpdateValidator extends BaseValidator {
  get rules () {
    return {
      id: 'required',
      slug: `required|unique:therapists,slug,id,${this.ctx.params.id}`
    }
  }

  get messages () {
    return {
      'id.required': 'Therapist ID required',
      'slug.required': 'Slug field required',
      'slug.unique': 'Slug is already in use',
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = TherapistUpdateValidator
