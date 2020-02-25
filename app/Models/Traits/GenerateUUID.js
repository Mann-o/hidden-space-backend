'use strict'

const { v4: uuidv4 } = require('uuid')

class GenerateUUID {
  /**
   * Generates a unique identifier (UUID v4) for the specified field
   *
   * @method register
   * @param {object} Model The model the trait is applying to
   * @param {object} overrideOptions An object containing options to override
   */
  register (Model, overrideOptions) {
    const options = {
      field: 'uuid',
      onUpdate: false,
      ...overrideOptions, // This overrides the default option(s) above
    }

    Model.addHook('beforeCreate', async (model) => {
      model[options.field] = uuidv4()
    })

    if (options.onUpdate) {
      Model.addHook('beforeUpdate', async (model) => {
        model[options.field] = uuidv4()
      })
    }
  }
}

module.exports = GenerateUUID
