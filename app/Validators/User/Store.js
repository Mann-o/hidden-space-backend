'use strict'

const BaseValidator = use('BaseValidator')

class UserStoreValidator extends BaseValidator {
  get rules () {
    return {
      id: 'required',
      username: `required|unique:users,username,id,${this.ctx.params.id}`,
      password: 'required',
    }
  }

  get messages () {
    return {
      'id.required': 'User ID required',
      'username.required': 'Username field required',
      'username.unique': 'Username already in use',
      'password.required': 'Password field required',
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = UserStoreValidator
