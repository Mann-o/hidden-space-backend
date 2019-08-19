'use strict'

const { existsSync } = require('fs')
const { resolve } = require('path')

const Helpers = use('Helpers')

class CheckForMaintenanceMode {
  /**
   * Checks if a `down` file exists in the application root. If it exists
   * the API is considered to be in maintenance mode and as such should
   * return an error to the user to indicate as such
   *
   * @method handle
   * @param {object} ctx
   * @param {object} ctx.response
   * @param {function} next
   */
  async handle ({ response }, next) {
    if (existsSync(resolve(`${Helpers.appRoot()}/down`))) {
      return response
        .header('Retry-After', '1800')
        .status(503)
        .json({
          status: 'error',
          error: 'API is currently under maintenance - please try again later',
        })
    }

    return next()
  }
}

module.exports = CheckForMaintenanceMode
