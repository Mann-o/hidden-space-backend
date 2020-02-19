'use strict'

const BaseModel = use('BaseModel')

class User extends BaseModel {
  static boot () {
    super.boot()
    this.addTrait('HashProperties', { onUpdate: false })
    this.addTrait('GenerateUUID', { field: 'email_verification_token' })
  }

  static get traits () {
    return [
      '@provider:Adonis/Acl/HasPermission',
      '@provider:Adonis/Acl/HasRole',
    ]
  }

  static get hidden () {
    return [
      'password',
      'email_verification_token',
      'reset_password_token',
      'delete_account_token',
    ]
  }

  posts () {
    return this.hasMany('Post')
  }

  tokens () {
    return this.hasMany('Token')
  }
}

module.exports = User
