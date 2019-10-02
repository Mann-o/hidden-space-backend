'use strict'

const Route = use('Route')

Route.get('therapists', 'TherapistController.index')
Route.get('therapists/:slug', 'TherapistController.show')
