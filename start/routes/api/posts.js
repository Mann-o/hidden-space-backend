'use strict'

const Route = use('Route')

Route.get('posts', 'PostController.index')
Route.get('posts/:slug', 'PostController.show')
