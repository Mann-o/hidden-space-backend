'use strict'

const _ = require('lodash')

class JsonDeserializer {
  async handle ({ request }, next) {
    request.body = _.mapKeys(request._body, _.rearg(_.snakeCase, 1))

    return next()
  }
}

module.exports = JsonDeserializer
