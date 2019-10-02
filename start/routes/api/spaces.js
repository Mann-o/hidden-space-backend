'use strict'

const Route = use('Route')

Route.get('spaces', 'SpaceController.index')
Route.get('spaces/:slug', 'SpaceController.show')
