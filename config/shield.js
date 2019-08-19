'use strict'

const ShieldConfig = {
  csp: {
    directives: {
    },
    reportOnly: false,
    setAllHeaders: false,
    disableAndroid: true,
  },

  xss: {
    enabled: true,
    enableOnOldIE: false,
  },

  xframe: 'DENY',
  nosniff: true,
  noopen: true,

  csrf: {
    enable: true,
    methods: [
      'POST',
      'PUT',
      'PATCH',
      'DELETE',
    ],
    filterUris: [
      /^\/(api)\/v1\/[a-z0-9.\-_]+\/?./,
      '/admin/media/upload',
    ],
    cookieOptions: {
      httpOnly: false,
      sameSite: true,
      path: '/',
      maxAge: 7200,
    },
  },
}

module.exports = ShieldConfig
