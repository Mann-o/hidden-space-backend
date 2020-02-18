'use strict'

const BaseValidator = use('BaseValidator')

class UserResetPasswordValidator extends BaseValidator {
  get rules () {
    return {
      new_password: 'required',
      new_password_confirmation: `required|same:new_password`
    }
  }

  get messages () {
    return {
      'new_password.required': 'New password field required',
      'new_password_confirmation.required': 'New password confirmation required',
      'new_password_confirmation.same': 'New password field must match new password confirmation field',
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = UserResetPasswordValidator
