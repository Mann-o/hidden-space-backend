'use strict'

const { Command } = require('@adonisjs/ace')

const Helpers = use('Helpers')

class Down extends Command {
  /**
   * The string used to call this command through ace
   */
  static get signature () {
    return 'hs:api:down'
  }

  /**
   * A description of the command given when calling `adonis:help`
   */
  static get description () {
    return 'Put the HiddenSpace API into maintenance mode'
  }

  /**
   * Writes a `down` file in the application root if it does not already
   * exist. Existence of this file is checked in middleware, and if it
   * exists any call to the API is ignored
   */
  async handle () {
    try {
      await this.writeFile(`${Helpers.appRoot()}/down`)
      return this.info('HiddenSpace API is now in maintenance mode!')
    } catch (error) {
      return this.error('HiddenSpace API is already in maintenance mode!')
    }
  }
}

module.exports = Down
