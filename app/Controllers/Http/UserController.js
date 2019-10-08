'use strict'

const _ = require('lodash')

const Cache = use('Cache')
const Permission = use('Permission')
const Role = use('Role')
const User = use('User')
const { validateAll } = use('Validator')

class UserController {
  async index () {
    const users = await Cache.remember('users', 30, async () => User.all())
    return users
  }

  async show ({ params: { username }, response, view }) {
    const user = await this._getUser({ username })

    return (user != null)
      ? user
      : response.notFound()
  }

  async store ({ request, response, session }) {
    const data = request.only([
      'username',
      'email_address',
      'password',
      'password_confirmation',
    ])

    const validation = await validateAll(data, {
      username: 'required|unique:users,username',
      email_address: 'required|email',
      password: 'required|min:8',
      password_confirmation: 'required_if:password|same:password',
    }, {
      'username.required': 'Please provide a username',
      'username.unique': 'Username already in use',
      'email_address.required': 'Please provide an email address',
      'email_address.email': 'Email address must be valid',
      'password.required': 'Please provide a password',
      'password.min': 'Password must be at least 8 characters',
      'password_confirmation.required_if': 'Please re-enter the password',
      'password_confirmation.same': 'Re-enter password field does not match password field',
    })

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }

    await User.create(_.omit(data, ['password_confirmation']))
    await this._clearCachedUsers()
    session.flash({ status: 'success', message: 'User created successfully.' })
    return response.redirect('/admin/users')
  }

  async update ({ params: { username }, request, response, session }) {
    const user = await User
      .query()
      .where({ username })
      .first()
    if (user != null) {
      user.merge(request._data)
      await user.save()
      await this._clearCachedUsers(user.slug)
      session.flash({ status: 'success', message: 'User updated successfully.' })
      return response.redirect(`/admin/users/${user.username}`)
    }
    return response.notFound()
  }

  async destroy ({ auth, params: { username }, response, session }) {
    const authenticatedUser = await auth.getUser()
    if (authenticatedUser.username === username) {
      session.flash({ status: 'error', message: 'Unable to delete the user you are currently logged in as' })
      return response.redirect(`/admin/users/${authenticatedUser.username}`)
    }

    const user = await User
      .query()
      .where({ username })
      .first()
    await user.delete()
    session.flash({ status: 'success', message: 'User deleted successfully.' })
    await this._clearCachedUsers()
    return response.redirect('/admin/users')
  }

  async roles ({ params: { id: role_id } }) {
    return Role
      .query()
      .with('permissions')
      .where({ role_id })
      .fetch()
  }

  async permissions ({ params: { id: user_id } }) {
    return Permission
      .query()
      .where({ user_id })
      .fetch()
  }

  async apiIndex () {
    return User.all()
  }

  async apiShow ({ params: { username }, response }) {
    const user = await User.query().where({ username }).first()
    return (user != null)
      ? user
      : response
          .status(404)
          .json({
            status: 'error',
            errors: [
              {
                status: 404,
                message: 'User not found'
              },
            ]
          })
  }

  async apiVerifyEmailAddress ({ request, response }) {
    const {
      email: emailAddress,
      token: verificationToken
    } = request.post()

    const user = await User
      .query()
      .where({ email_address: emailAddress })
      .first()

    if (user == null) {
      return this._apiVerifyTokenError(response, 'Email address does not exist')
    }
    if (user.has_verified_email_address) {
      return this._apiVerifyTokenError(response, 'Email address already verified')
    }
    if (user.email_verification_token !== verificationToken) {
      return this._apiVerifyTokenError(response, 'Verification token is invalid')
    }

    user.email_verification_token = null;
    user.has_verified_email_address = true;

    await user.save()

    return response.json({
      status: 'success',
    })
  }

  _apiVerifyTokenError (response, errorMessage) {
    return response
      .status(409)
      .json({
        status: 'error',
        errors: [
          {
            status: 409,
            message: errorMessage,
          }
        ]
      })
  }

  async _getUser ({ username }) {
    const userInCache = await Cache.get(`user:${username}`)

    if (userInCache != null) {
      return userInCache
    } else {
      const user = await User
        .query()
        .where({ username })
        .first()

      if (user != null) {
        await Cache.put(`user:${username}`, user.toJSON(), 30)
        return user.toJSON()
      }

      return null
    }
  }

  async _clearCachedUsers (username) {
    await Cache.forget('users')
    await Cache.forget(`user:${username}`)
  }
}

module.exports = UserController
