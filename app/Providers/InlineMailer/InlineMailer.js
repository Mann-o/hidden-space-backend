'use strict'

class InlineMailer {
  constructor (View, Mail, isProduction, inlineCSS) {
    this.View = View
    this.Mail = Mail
    this.isProduction = isProduction
    this.inlineCSS = inlineCSS
  }

  /**
   * Sends an email with the specified view and data. Applies message settings via the
   * message callback. Mail pre-processing encodes data and inlines CSS.
   *
   * @param {string} view The edge view to use for the email
   * @param {object} data The data to encode into the email
   * @param {function} message The message used to modify email parameters
   1*/
  async send (view, data, message) {
    const baseUrl = `http${this.isProduction ? 's://hiddenspace.com' : '://localhost:3333'}`
    const renderedView = this.View.render(view, { baseUrl, ...data })
    const inlinedHTML = await this.inlineCSS(renderedView, { url: baseUrl })

    await this.Mail.raw(inlinedHTML, message)
  }
}

module.exports = InlineMailer
