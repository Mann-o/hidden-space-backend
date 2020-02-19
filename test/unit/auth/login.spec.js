'use strict'

const { test, trait } = use('Test/Suite')('Auth/Login')
const Env = use('Env')

trait('Test/ApiClient')

test('Errors if HiddenSpace-Api-Key header is missing', async ({ assert, client }) => {
  assert.plan(2)

  const response = await client
    .post('/api/v1/admin/auth/login')
    .send({ username: 'test', password: 'test' })
    .end()

  response.assertStatus(401)
  response.assertJSON({
    status: 'error',
    error: 'HiddenSpace-Api-Key header missing from request',
  })
})

test('Validation fails if login_id is not provided', async ({ assert, client }) => {
  assert.plan(2)

  const response = await client
    .post('/api/v1/admin/auth/login')
    .header('HiddenSpace-Api-Key', Env.get('APP_KEY'))
    .send({ password: 'test' })
    .end()

  response.assertStatus(422)
  response.assertJSONSubset({
    errors: [
      { message: 'Login ID field required' },
    ],
  })
})

test('Validation fails if password is not provided', async ({ assert, client }) => {
  assert.plan(2)

  const response = await client
    .post('/api/v1/admin/auth/login')
    .header('HiddenSpace-Api-Key', Env.get('APP_KEY'))
    .send({ loginId: 'test@test.com' })
    .end()

  response.assertStatus(422)
  response.assertJSONSubset({
    errors: [
      { message: 'Password field required' },
    ],
  })
})

test('Errors if invalid login credentials are provided', async ({ assert, client }) => {
  assert.plan(3)

  const response = await client
    .post('/api/v1/admin/auth/login')
    .header('HiddenSpace-Api-Key', Env.get('APP_KEY'))
    .send({ loginId: 'liam', password: 'invalid-password' })
    .end()

  response.assertStatus(401)
  response.assertHeader('WWW_Authenticate', 'Bearer token_type="JWT"')
  response.assertJSON({
    status: 'error',
    error: 'Invalid Login ID and/or password',
  })
})

test('Returns a JWT upon successful login', async ({ assert, client }) => {
  assert.plan(5)

  const response = await client
    .post('/api/v1/admin/auth/login')
    .header('HiddenSpace-Api-Key', Env.get('APP_KEY'))
    .send({ loginId: 'liam', password: 'password' })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    status: 'success',
    payload: {
      type: 'bearer',
      refreshToken: null,
    },
  })

  const { payload } = JSON.parse(response.text)
  assert.property(payload, 'token')

  const { iat: tokenIssuedAt } = JSON.parse(
    Buffer
      .from(
        payload.token
          .split('.')[1]
          .replace('-', '+')
          .replace('_', '/'),
        'base64',
      )
      .toString('binary')
  )

  assert.isAtLeast(tokenIssuedAt, Math.floor(((Date.now() - 5) / 1000))) // token was issued no more than 5 seconds ago
  assert.isAtMost(tokenIssuedAt, Math.floor((Date.now() / 1000))) // token was not issued in advance
})
