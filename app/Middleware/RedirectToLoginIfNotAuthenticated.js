'use strict'

class RedirectToLoginIfNotAuthenticated {
  /**
   * Redirects an unauthenticated user to the login page
   *
   * @method handle
   * @param {object} ctx
   * @param {object} ctx.auth
   * @param {object} ctx.response
   * @param {function} next
   */
  async handle ({ auth, request, response }, next) {
    if (auth.user == null) {
      return (request.url() === '/admin')
        ? response.redirect('/admin/login')
        : response.redirect(`/admin/login?target=${encodeURIComponent(request.url())}`)
    }

    return next()
  }
}

module.exports = RedirectToLoginIfNotAuthenticated
