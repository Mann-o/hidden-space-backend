'use strict'

const Route = use('Route')

Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store')
Route.get('users/:username', 'UserController.show')
Route.patch('users/:username', 'UserController.update')
Route.delete('users/:username', 'UserController.destroy')
