'use strict'

const BaseValidator = use('BaseValidator')

class UserUpdateValidator extends BaseValidator {
  get rules () {
    return {
      id: 'required',
      username: `required|unique:users,username,id,${this.ctx.params.id}`
    }
  }

  get messages () {
    return {
      'id.required': 'User ID required',
      'username.required': 'Username field required',
      'username.unique': 'Username is already in use',
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = UserUpdateValidator
