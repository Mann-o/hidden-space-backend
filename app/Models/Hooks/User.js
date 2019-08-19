'use strict'

const UserHooks = {
  /**
   * Sends an email to any newly registered user to ask them to confirm their
   * email address
   *
   * @method sendConfirmationEmail
   * @param {object} User
   */
  sendVerificationEmail: async (User) => {
    return User.sendVerificationEmail()
  }
}

module.exports = UserHooks
