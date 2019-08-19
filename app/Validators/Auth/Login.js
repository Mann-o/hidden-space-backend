'use strict'

const BaseValidator = use('BaseValidator')

class AuthLoginValidator extends BaseValidator {
  get rules () {
    return {
      login_id: 'required',
      password: 'required',
    }
  }

  get messages () {
    return {
      'login_id.required': 'Login ID field required',
      'password.required': 'Password field required',
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = AuthLoginValidator
