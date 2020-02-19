'use strict'

const BaseValidator = use('BaseValidator')

class UserStoreValidator extends BaseValidator {
  get rules () {
    return {
      username: 'required|unique:users',
      email_address: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required|same:password',
    }
  }

  get messages () {
    return {
      'username.required': 'Username field required',
      'username.unique': 'Username already in use',
      'email_address.required': 'Email address field required',
      'email_address.email': 'Email addres must be a valid email address',
      'email_address.unique': 'Email address already in use',
      'password.required': 'Password field required',
      'password_confirmation.required': 'Password confirmation field required',
      'password_confirmation.same': 'Password confirmation field must have same value as password field',
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = UserStoreValidator
