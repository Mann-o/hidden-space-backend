'use strict'

const Env = use('Env')

class BaseValidator {
  async fails (errors) {
    return this.ctx.response.status(422).send({
      status: 'failed',
      errors: Env.get('NODE_ENV' === 'production')
        ? errors.map(({ message }) => message)
        : errors
    })
  }
}

module.exports = BaseValidator
