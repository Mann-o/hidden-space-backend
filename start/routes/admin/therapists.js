'use strict'

const Route = use('Route')

Route.get('therapists', 'TherapistController.index')
Route.post('therapists', 'TherapistController.store')
Route.get('therapists/:slug', 'TherapistController.show')
Route.patch('therapists/:slug', 'TherapistController.update')
Route.delete('therapists/:slug', 'TherapistController.destroy')
