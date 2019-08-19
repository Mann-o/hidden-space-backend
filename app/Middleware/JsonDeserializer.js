'use strict'

const _ = require('lodash')

class JsonDeserializer {
  async handle ({ request }, next) {
    request._data = _.mapKeys(request._data, _.rearg(_.snakeCase, 1))

    return next()
  }
}

module.exports = JsonDeserializer
