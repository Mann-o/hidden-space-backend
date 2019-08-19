'use strict'

const Fold = require('@adonisjs/fold')
const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(Fold)
  .appRoot(__dirname)
  .loadCommands()
  .fireHttpServer()
  .catch(console.error)
