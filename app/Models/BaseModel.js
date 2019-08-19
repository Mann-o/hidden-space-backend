'use strict'

const Model = use('Model')

class BaseModel extends Model {
  /**
   * Formats all created_at and updated_at dates being saved to the database.
   * The list of dates being formatted can be adjusted in an individual model
   * by calling:
   *
   * ```
   * static get dates() {
   *   return super.dates.concat(arrayOfDateFields)
   * }
   * ```
   *
   * @method formatDates
   * @param {string} field
   * @param {string} value
   * @returns {string} The UTC formatted date as a UTC string
   */
  static formatDates (field, value) {
    const dateFields = ['created', 'last_updated']
    if (dateFields.includes(field)) {
      return this._formatDateTimeAsUTCString(value)
    }
    return super.formatDates(field, value)
  }

  /**
   * Formats all dates when the queried data is formatted to JSON. We just
   * want a UTC string so we can format a date/time to the users local
   * timezone in the client
   *
   * @method castDates
   * @param {string} field
   * @param {string} value
   * @returns {string} The UTC formatted date as a UTC string
   *
   */
  static castDates (field, value) {
    return this._formatDateTimeAsUTCString(value)
  }

  /**
   * Overrides the default `created_at` column name for timestamps
   *
   * @method createdAtColumn
   * @returns {string} The new column name
   */
  static get createdAtColumn () {
    return 'created'
  }

  /**
   * Overrides the default `updated_at` column name for timestamps
   *
   * @method updatedAtColumn
   * @returns {string} The new column name
   */
  static get updatedAtColumn () {
    return 'last_updated'
  }

  /**
   * Boots the BaseModel if not yet booted (required in order for the
   * BaseModel to work correctly and allow other models to extend it)
   *
   * @method _bootIfNotBooted
   */
  static _bootIfNotBooted () {
    if (this.name !== 'BaseModel') {
      super._bootIfNotBooted()
    }
  }

  /**
   * Formats the given date as a UTC String
   *
   * @method _formatDateTimeAsUTCString
   * @param {string} date
   * @returns {string} The UTC formatted date as a UTC string
   */
  static _formatDateTimeAsUTCString (date) {
    const d = new Date(date)
    return new Date(Date.UTC(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds(),
    )).toUTCString()
  }

  static get Serializer () {
    return use('JsonSerializer')
  }
}

module.exports = BaseModel
