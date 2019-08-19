const { ServiceProvider } = require('@adonisjs/fold')
const inlineCSS = require('inline-css')
const InlineMailer = require('./InlineMailer')

class InlineMailerProvider extends ServiceProvider {
  /**
   * Registers InlineMailer as a service provider so that it can
   * be used throughout our application
   *
   * @method register
   */
  register () {
    this.app.singleton('HiddenSpace/InlineMailer', () => {
      const View = this.app.use('View')
      const Mail = this.app.use('Mail')
      const { isProduction } = this.app.use('CustomHelpers')
      return new (InlineMailer)(View, Mail, isProduction, inlineCSS)
    })
  }
}

module.exports = InlineMailerProvider
