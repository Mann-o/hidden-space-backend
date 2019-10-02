'use strict'

const Route = use('Route')

Route.get('posts', 'PostController.index')
Route.post('posts', 'PostController.store')
Route.get('posts/:slug', 'PostController.show')
Route.patch('posts/:slug', 'PostController.update')
Route.delete('posts/:slug', 'PostController.destroy')
