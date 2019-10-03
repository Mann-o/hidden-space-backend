'use strict'

const Route = use('Route')

Route.get('spaces', 'SpaceController.index')
Route.post('spaces', 'SpaceController.store')
Route.get('spaces/:slug', 'SpaceController.show')
Route.patch('spaces/:slug', 'SpaceController.update').validator('Space/Update')
Route.delete('spaces/:slug', 'SpaceController.destroy')
