'use strict'

const Route = use('Route')

Route.get('posts', 'PostController.index')
Route.post('posts', 'PostController.store')
Route.get('posts/:slug', 'PostController.show')
Route.patch('posts/:id', 'PostController.update')
Route.delete('posts/:id', 'PostController.destroy')
Route.post('posts/:id/images', 'PostController.addImages')
Route.post('posts/:id/images/remove', 'PostController.removeImages')
