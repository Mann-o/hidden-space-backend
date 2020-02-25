'use strict'

const BaseValidator = use('BaseValidator')

class TherapistStoreValidator extends BaseValidator {
  get rules () {
    return {
      slug: 'required|unique:spaces,slug',
      gender: 'required|in:male,female',
      first_names: 'required|min:2',
      last_names: 'required|min:2',
      email_address: 'required|email',
    }
  }

  get messages () {
    return {
      'slug.required': 'Slug field required',
      'slug.unique': 'Slug is already in use',
      'gender.required': 'Gender field is required',
      'gender.in': 'Gender field must be either Male or Female',
      'first_names.required': 'First Name(s) field is required',
      'first_names.min': 'First Name(s) field must be 2 or more characters in length',
      'last_names.required': 'Last Name(s) field is required',
      'last_names.min': 'Last Name(s) field must be 2 or more characters in length',
      'email_address.required': 'Email Address field is required',
      'email_address.email': 'Email Address field must be a valid email address',
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = TherapistStoreValidator
