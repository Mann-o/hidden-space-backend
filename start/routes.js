'use strict'

const Image = use('Image')
const Post = use('Post')
const Route = use('Route')
const Space = use('Space')
const Therapist = use('Therapist')
const User = use('User')

Route.get('admin/login', 'AuthController.renderLogin')
Route.post('admin/login', 'AuthController.login')
Route.get('admin/logout', 'AuthController.logout')

Route
  .group('admin', () => {
    Route.get('/', async ({ view }) => {
      const [spaceCount, therapistCount, postCount, userCounts, mediaCount] = await Promise.all([
        await Space.getCount(),
        await Therapist.getCount(),
        await Post.getCount(),
        await User.getCount(),
        await Image.getCount(),
      ])

      return {
        spaceCount,
        therapistCount,
        postCount,
        userCount,
        mediaCount,
      }
    })

    Route.get('users', 'UserController.index')
    Route.get('users/new', 'UserController.create')
    Route.post('users/new', 'UserController.store')
    Route.get('users/:username', 'UserController.show')
    Route.post('users/:username', 'UserController.update').middleware(['strip-csrf-from-post-data', 'json-deserializer'])
    Route.get('users/:username/delete', 'UserController.destroy')

    Route.get('spaces', 'SpaceController.index')
    Route.get('spaces/new', 'SpaceController.create')
    Route.post('spaces/new', 'SpaceController.store')
    Route.get('spaces/:slug', 'SpaceController.show')
    Route.post('spaces/:slug', 'SpaceController.update').middleware(['strip-csrf-from-post-data', 'json-deserializer'])
    Route.get('spaces/:slug/delete', 'SpaceController.destroy')

    Route.get('therapists', 'TherapistController.index')
    Route.get('therapists/new', 'TherapistController.create')
    Route.post('therapists/new', 'TherapistController.store')
    Route.get('therapists/:slug', 'TherapistController.show')
    Route.post('therapists/:slug', 'TherapistController.update').middleware(['strip-csrf-from-post-data', 'json-deserializer'])
    Route.get('therapists/:slug/delete', 'TherapistController.destroy')

    Route.get('posts', 'PostController.index')
    Route.get('posts/new', 'PostController.create')
    Route.post('posts/new', 'PostController.store')
    Route.get('posts/:slug', 'PostController.show')
    Route.post('posts/:slug', 'PostController.update').middleware(['strip-csrf-from-post-data', 'json-deserializer'])
    Route.get('posts/:slug/delete', 'PostController.destroy')

    Route.get('media', 'MediaController.index')
    Route.get('media/upload', 'MediaController.renderUpload')
    Route.post('media/upload', 'MediaController.upload')
    Route.get('media/:hash', 'MediaController.show')
    Route.post('media/:hash', 'MediaController.update').middleware(['strip-csrf-from-post-data', 'json-deserializer'])
    Route.get('media/:hash/delete', 'MediaController.destroy')
  })
  .prefix('admin')
  .middleware([
    'redirect-to-login-if-not-authenticated',
  ])



Route
  .group('api', () => {
    Route.get('/', async () => {
      const [spaceCount, therapistCount, postCount, userCount, mediaCount] = await Promise.all([
        await Space.getCount(),
        await Therapist.getCount(),
        await Post.getCount(),
        await User.getCount(),
        await Image.getCount(),
      ])

      return {
        spaceCount,
        therapistCount,
        postCount,
        userCount,
        mediaCount,
      }
    })
    Route.get('users', 'UserController.apiIndex')
    Route.get('users/:username', 'UserController.apiShow')
    Route.get('spaces', 'SpaceController.apiIndex')
    Route.get('spaces/:slug', 'SpaceController.apiShow')
    Route.get('therapists', 'TherapistController.apiIndex')
    Route.get('therapists/:slug', 'TherapistController.apiShow')
    Route.get('posts', 'PostController.apiIndex')
    Route.get('posts/:slug', 'PostController.apiShow')
    Route.post('verify-email-address', 'UserController.apiVerifyEmailAddress')
    Route.get('media', 'MediaController.apiIndex')
    Route.post('media/upload', 'MediaController.upload')
    Route.get('media/:hash', 'MediaController.apiShow')
  })
  .prefix('api/v1')
  .middleware([
    'check-app-key',
  ])
