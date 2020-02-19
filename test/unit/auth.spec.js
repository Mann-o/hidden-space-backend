'use strict'

const { test, trait } = use('Test/Suite')('Auth')

trait('Test/ApiClient')

test('validation fails if no password is provided', async ({ assert, client }) => {
  // assert.plan(2)

  const { data } = await client
    .post('/auth/login', {
      email_address: 'test@test.com',
    })
    .end()

  console.log({ data })

  // assert.isTrue(validation.fails())
  // assert.deepEqual(validation.messages(), [
  //   {
  //     field: 'password',
  //     message: 'Password field required',
  //   },
  // ])
})
