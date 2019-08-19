'use strict'

const Server = use('Server')

const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
  'Adonis/Middleware/Session',
  'Adonis/Middleware/Shield',
  'Adonis/Middleware/AuthInit',
]

const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth',
  guest: 'Adonis/Middleware/AllowGuestOnly',
  'check-app-key': 'App/Middleware/CheckAppKey',
  'check-for-maintenance-mode': 'App/Middleware/CheckForMaintenanceMode',
  'json-deserializer': 'App/Middleware/JsonDeserializer',
  'redirect-to-login-if-not-authenticated': 'App/Middleware/RedirectToLoginIfNotAuthenticated',
  'strip-csrf-from-post-data': 'App/Middleware/StripCsrfFromPostData',
}

const serverMiddleware = [
  'Adonis/Middleware/Static',
  'Adonis/Middleware/Cors',
]

Server
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware)
