'use strict'

/**
 * Confirms whether or not we are currently in a production environment
 * by checking if `NODE_ENV` is `production` in the `.env` file
 *
 * @method isProduction
 * @returns {boolean}
 */
const isProduction = () => {
  return (process.env.NODE_ENV === 'production')
}

module.exports = {
  isProduction,
}
