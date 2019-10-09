'use strict'

const Route = use('Route')

Route.get('media', 'MediaController.index')
Route.post('media', 'MediaController.upload')
Route.get('media/:hash', 'MediaController.show')
Route.patch('media/:hash', 'MediaController.update')
Route.delete('media/:id', 'MediaController.destroy')
