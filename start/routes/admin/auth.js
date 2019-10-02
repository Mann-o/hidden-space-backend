'use strict'

const Route = use('Route')

Route.post('/auth/login', 'AuthController.login').validator('Auth/Login')
Route.get('/auth/me', 'AuthController.getAuthenticatedUser')
