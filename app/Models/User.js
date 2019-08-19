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

  async sendVerificationEmail () {
    const {
      email_address,
      email_verification_token,
      has_verified_email_address,
      username,
    } = this

    if (!has_verified_email_address && (email_verification_token != null)) {
      const options = { username, email_address, email_verification_token }

      await InlineMailer.send('emails.verify-email-address', options, (message) => {
        message
          .subject('HiddenSpace - Please confirm your email address!')
          .from('noreply@thehiddenspace.co.uk', 'HiddenSpace')
          .to(email_address)
      })
    }
  }
}

module.exports = User
