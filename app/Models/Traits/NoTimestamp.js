'use strict'

class NoTimestamps {
  register (Model) {
    Object.defineProperties(Model, {
      createdAtColumn: {
        get: () => null,
      },
      updatedAtColumn: {
        get: () => null,
      },
    })
  }
}

module.exports = NoTimestamps
