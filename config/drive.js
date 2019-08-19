'use strict'

const Helpers = use('Helpers')
const Env = use('Env')

module.exports = {
  default: 'local',

  disks: {
    local: {
      root: Helpers.appRoot(),
      driver: 'local'
    },
    spaces: {
      driver: 's3',
      key: Env.get('DO_SPACES_KEY'),
      secret: Env.get('DO_SPACES_SECRET'),
      endpoint: `${Env.get('DO_SPACES_REGION')}.digitaloceanspaces.com`,
      bucket: Env.get('DO_SPACES_BUCKET'),
      region: Env.get('DO_SPACES_REGION'),
    },
  },
}
