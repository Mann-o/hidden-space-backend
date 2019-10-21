'use strict'

const { Command } = require('@adonisjs/ace')

const Helpers = use('Helpers')

class ApiUp extends Command {
  /**
   * The string used to call this command through ace
   */
  static get signature () {
    return 'hs:api:up'
  }

  /**
   * A description of the command given when calling `adonis:help`
   */
  static get description () {
    return 'Take the HiddenSpace API out of maintenance mode'
  }

  /**
   * Deletes a `down` file in the application root if one exists.
   */
  async handle () {
    try {
      await this.removeFile(`${Helpers.appRoot()}/down`)
      return this.info('HiddenSpace API is now live!')
    } catch (error) {
      return this.info('HiddenSpace API is already live!')
    }
  }
}

module.exports = ApiUp
