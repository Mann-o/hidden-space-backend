'use strict'

const _ = require('lodash')

const Cache = use('Cache')
const Hash = use('Hash')
const Permission = use('Permission')
const Role = use('Role')
const User = use('User')
const { validateAll } = use('Validator')

class UserController {
  async index () {
    const users = await Cache.remember('users', 30, async () => User.all())
    return users
  }

  async show ({ params: { username }, response }) {
    const user = await this._getUser({ username })

    return (user != null)
      ? user
      : response.notFound()
  }

  async store ({ request }) {
    const data = request.only([
      'username',
      'email_address',
      'password',
    ])

    await User.create(data)
    await this._clearCachedUsers()
    return { status: 'success' }
  }

  async update ({ params: { id }, request, response }) {
    const user = await User
      .query()
      .where({ id })
      .first()

    if (user != null) {
      await this._clearCachedUsers(user.username)
      user.merge(request.only(['username', 'email_address', 'has_verified_email_address']))
      await user.save()
      return { status: 'success', user }
    }

    return response.notFound()
  }

  async destroy ({ auth, params: { id } }) {
    const authenticatedUser = await auth.getUser()
    const user = await User
      .query()
      .where({ id })
      .first()

    if (authenticatedUser.username === user.toJSON().username) {
      return {
        status: 'error',
        message: 'Unable to delete the user you are currently logged in as',
      }
    }

    await user.delete()
    await this._clearCachedUsers()
    return { status: 'success' }
  }

  async resetPassword ({ params: { id }, request }) {
    const user = await User
      .query()
      .where({ id })
      .first()

    if (user != null) {
      user.password = await Hash.make(request.input('new_password'))
      await user.save()
      return { status: 'success' }
    }

    return response.notFound()
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
