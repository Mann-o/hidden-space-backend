'use strict'

const Route = use('Route')

Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store').validator('User/Store')
Route.get('users/:username', 'UserController.show')
Route.patch('users/:username', 'UserController.update').validator('User/Update')
Route.delete('users/:username', 'UserController.destroy')
