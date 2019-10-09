'use strict'

const Route = use('Route')

Route.get('spaces', 'SpaceController.index')
Route.post('spaces', 'SpaceController.store').validator('Space/Store')
Route.get('spaces/:slug', 'SpaceController.show')
Route.patch('spaces/:slug', 'SpaceController.update').validator('Space/Update')
Route.delete('spaces/:id', 'SpaceController.destroy')
