'use strict'

const Route = use('Route')

Route.get('spaces', 'SpaceController.index')
Route.post('spaces', 'SpaceController.store').validator('Space/Store')
Route.get('spaces/:slug', 'SpaceController.show')
Route.patch('spaces/:id', 'SpaceController.update').validator('Space/Update')
Route.delete('spaces/:id', 'SpaceController.destroy')
Route.post('spaces/:id/images', 'SpaceController.addImages')
Route.post('spaces/:id/images/remove', 'SpaceController.removeImages')
