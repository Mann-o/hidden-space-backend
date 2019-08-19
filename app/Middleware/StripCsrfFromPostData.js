'use strict'

const _ = require('lodash')

class StripCsrfFromPostData {
  /**
   * Strip the CSRF field from POST/PATCH data (should fire *after* the built-in CSRF checks)
   *
   * @method handle
   * @param {object} ctx
   * @param {object} ctx.auth
   * @param {object} ctx.response
   * @param {function} next
   */
  async handle ({ request }, next) {
    request.body = _.omit(request.post(), ['_csrf'])

    return next()
  }
}

module.exports = StripCsrfFromPostData
