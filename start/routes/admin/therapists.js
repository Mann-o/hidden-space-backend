'use strict'

const Route = use('Route')

Route.get('therapists', 'TherapistController.index')
Route.post('therapists', 'TherapistController.store')
Route.get('therapists/:slug', 'TherapistController.show')
Route.patch('therapists/:id', 'TherapistController.update').validator('Therapist/Update')
Route.delete('therapists/:id', 'TherapistController.destroy')
Route.post('therapists/:id/images', 'TherapistController.addImages')
Route.post('therapists/:id/images/remove', 'TherapistController.removeImages')
