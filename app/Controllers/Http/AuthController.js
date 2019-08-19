'use strict'

const User = use('User')

class AuthController {
  async renderLogin ({ view, request }) {
    return view.render('pages.login', {
      target: request.get().target,
    })
  }

  async login ({ auth, request, response, session }) {
    const { login_id, password, target } = request.post()

    if (login_id == null || login_id === '') return this._loginError(response, session, 'Login ID field must be completed', target)
    if (password == null || password === '') return this._loginError(response, session, 'Password field must be completed', target)

    try {
      const user = await User
        .query()
        .select(['id', 'username', 'email_address', 'last_logged_in'])
        .whereRaw('lower(username) = ?', login_id.toLowerCase())
        .orWhereRaw('lower(email_address) = ?', login_id.toLowerCase())
        .first()

      if (user != null) {
        await auth.attempt(user.email_address, password)
        user.last_logged_in = new Date()
        await user.save()
        return response.redirect((target == null || target === 'null' || target === '') ? '/admin' : target)
      } else {
        return this._loginError(response, session, 'Invalid Login ID and/or Password', target)
      }
    } catch (error) {
      return this._loginError(response, session, error.message, target)
    }
  }

  async logout ({ auth, response }) {
    await auth.logout()
    return response.redirect('/admin/login')
  }

  _loginError (response, session, errorMessage, target) {
    session.flash({ error: errorMessage })
    return response.redirect(`/admin/login${target != null ? `?target=${encodeURIComponent(target)}` : ''}`)
  }
}

module.exports = AuthController
