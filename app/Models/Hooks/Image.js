'use strict'

const { v4: uuidv4 } = require('uuid')

const ImageHooks = {
  /**
   * Adds a unique hash to the image object that is used
   * to hide the real filename in public use
   *
   * @method addHashProperty
   * @param {object} User
   */
  addHashProperty: async (Image) => {
    Image.hash = uuidv4().replace(/-/g, '')
  }
}

module.exports = ImageHooks
