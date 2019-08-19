'use strict'

const Hash = use('Hash')
const uuid = require('uuid/v4')

const ImageHooks = {
  /**
   * Adds a unique hash to the image object that is used
   * to hide the real filename in public use
   *
   * @method addHashProperty
   * @param {object} User
   */
  addHashProperty: async (Image) => {
    Image.hash = uuid().replace(/-/g, '')
  }
}

module.exports = ImageHooks
