'use strict'

const User = use('User')

class AuthController {
  async renderLogin ({ view, request }) {
    return view.render('pages.login', {
      target: request.get().target,
    })
  }

  async login ({ auth, request, response, session }) {
    const { login_id, password } = request.post()

      const user = await User
        .query()
        .select(['id', 'username', 'email_address', 'last_logged_in'])
        .whereRaw('lower(username) = ?', login_id.toLowerCase())
        .orWhereRaw('lower(email_address) = ?', login_id.toLowerCase())
        .first()

    try {
      if (user != null) {
        const payload = await auth.attempt(user.email_address, password)
        user.last_logged_in = new Date()
        await user.save()
        return { status: 'success', payload }
      }
    } catch (e) {}

    return response
			.header('WWW_Authenticate', 'Bearer token_type="JWT"')
			.status(401)
			.json({
				status: 'error',
				error: 'Invalid Login ID and/or password',
			})
  }

  async getUser ({ auth }) {
    const user = await auth.getUser()

    return { user }
  }
}

module.exports = AuthController
