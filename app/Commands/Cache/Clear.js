'use strict'

const { Command } = require('@adonisjs/ace')

const Redis = use('Redis')

class CacheClear extends Command {
  /**
   * The string used to call this command through ace
   */
  static get signature () {
    return 'hs:cache:clear'
  }

  /**
   * A description of the command given when calling `adonis:help`
   */
  static get description () {
    return 'Clear any cached data in Redis'
  }

  /**
   * Deletes all cached data
   */
  async handle () {
    try {
      this.info('Clearing all cached data...')
      await Redis.flushall()
      return this.success('All cached data cleared successfully!')
    } catch (error) {
      return this.warn('Failed to clear all cached data')
    }
  }
}

module.exports = CacheClear
