'use strict'

const BaseModel = use('BaseModel')
const Env = use('Env')
const InlineMailer = use('HiddenSpace/InlineMailer')

class User extends BaseModel {
  static boot () {
    super.boot()
    this.addTrait('HashProperties')
    this.addTrait('GenerateUUID', { field: 'email_verification_token' })
    this.addHook('afterCreate', 'User.sendVerificationEmail')
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
