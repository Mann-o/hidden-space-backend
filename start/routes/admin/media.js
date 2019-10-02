'use strict'

const Route = use('Route')

Route.get('media', 'MediaController.index')
Route.post('media', 'MediaController.upload')
Route.get('media/:hash', 'MediaController.show')
Route.post('media/:hash', 'MediaController.update').middleware(['strip-csrf-from-post-data', 'json-deserializer'])
Route.delete('media/:hash', 'MediaController.destroy')
