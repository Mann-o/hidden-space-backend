'use strict'

const Hash = use('Hash')

class HashProperties {
  /**
   * Allows the user to automatically hash the value of the specified fields.
   *
   * @method register
   * @param {object} Model The model the trait is applying to
   * @param {object} overrideOptions An object containing options to override
   */
  register (Model, overrideOptions) {
    const options = {
      fields: ['password'],
      onUpdate: true,
      ...overrideOptions, // This overrides the default option(s) above
    }

    Model.addHook('beforeCreate', async (model) => {
      return this._updateFields(model, options.fields)
    })

    if (options.onUpdate) {
      Model.addHook('beforeUpdate', async (model) => {
        return this._updateFields(model, options.fields)
      })
    }
  }

  /**
   * Since the method to hash an array of fields is used multiple times
   * in this trait it is extracted to a reusable method
   *
   * @method _updateFields
   * @param {object} Model
   * @param {array} fields
   */
  async _updateFields (Model, fields) {
    for (const field of fields) {
      if (Model[field] && Model[field] != null) {
        Model[field] = await Hash.make(Model[field])
      }
    }
  }
}

module.exports = HashProperties
