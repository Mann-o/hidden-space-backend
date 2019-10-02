'use strict'

const Route = use('Route')

Route
  .group('api', () => {
    require('./routes/api/posts')
    require('./routes/api/spaces')
    require('./routes/api/therapists')
  })
  .prefix('api/v1')
  .middleware([
    'check-app-key',
    'json-deserializer',
  ])


  Route
  .group('admin', () => {
    require('./routes/admin/auth')
    require('./routes/admin/base')
    require('./routes/admin/media')
    require('./routes/admin/posts')
    require('./routes/admin/spaces')
    require('./routes/admin/therapists')
    require('./routes/admin/users')

    // Route.get('users', 'UserController.index')
    // Route.post('users/new', 'UserController.store')
    // Route.get('users/:username', 'UserController.show')
    // Route.post('users/:username', 'UserController.update').middleware(['strip-csrf-from-post-data', 'json-deserializer'])
    // Route.get('users/:username/delete', 'UserController.destroy')


    // Route.get('spaces/new', 'SpaceController.create')

    // Route.get('spaces/:slug', 'SpaceController.show')
    // // Route.post('spaces/:slug', 'SpaceController.update').middleware(['strip-csrf-from-post-data', 'json-deserializer'])
    // Route.get('spaces/:slug/delete', 'SpaceController.destroy')

    // Route.get('therapists', 'TherapistController.index')
    // Route.get('therapists/new', 'TherapistController.create')
    // Route.post('therapists/new', 'TherapistController.store')
    // Route.get('therapists/:slug', 'TherapistController.show')
    // Route.post('therapists/:slug', 'TherapistController.update').middleware(['strip-csrf-from-post-data', 'json-deserializer'])
    // Route.get('therapists/:slug/delete', 'TherapistController.destroy')

    // Route.get('posts', 'PostController.index')
    // Route.get('posts/new', 'PostController.create')
    // Route.post('posts/new', 'PostController.store')
    // Route.get('posts/:slug', 'PostController.show')
    // Route.post('posts/:slug', 'PostController.update').middleware(['strip-csrf-from-post-data', 'json-deserializer'])
    // Route.get('posts/:slug/delete', 'PostController.destroy')
  })
  .prefix('api/v1/admin')
  .middleware([
    'check-app-key',
    'json-deserializer',
  ])
