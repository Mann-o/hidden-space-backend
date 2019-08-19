'use strict'

const Env = use('Env')

class CheckAppKey {
  /**
   * Checks if the request contains a valid Hidden-Space-App-Key header
   * and that the header value matches the APP_KEY specified in our .env
   * file
   *
   * @method handle
   * @param {object} ctx
   * @param {object} ctx.request
   * @param {object} ctx.response
   * @param {function} next
   */
  async handle ({ request, response }, next) {
    // We don't really need this check outside of production
    if (Env.get('NODE_ENV') === 'development') {
      return next()
    }

    const appKeyFromEnv = Env.get('APP_KEY')
    const appKeyFromHeader = request.header('hiddenspace-api-key')

    // Handle APP_KEY variable not existing in .env file
    if (appKeyFromEnv == null) {
      return response
        .status(500)
        .json({
          status: 'error',
          error: 'Invalid server configuration',
        })
    }

    // Handle Hidden-Space-App-Key header being missing from request
    if (appKeyFromHeader == null) {
      return response
        .status(401)
        .json({
          status: 'error',
          error: 'HiddenSpace-Api-Key header missing from request',
        })
    }

    // Handle Hidden-Space-App-Key header value not matching APP_KEY
    // in our .env file
    if (appKeyFromHeader !== appKeyFromEnv) {
      return response
        .status(401)
        .json({
          status: 'error',
          error: 'HiddenSpace-Api-Key header invalid',
        })
    }

    return next()
  }
}

module.exports = CheckAppKey
