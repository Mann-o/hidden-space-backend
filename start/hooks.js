'use strict'

const ace = require('@adonisjs/ace')
const chalk = require('chalk')
const { existsSync } = require('fs')
const { hooks } = require('@adonisjs/ignitor')
const uuidValidate = require('uuid-validate')


hooks.after.providersBooted(() => {
  const Validator = use('Validator')

  Validator.extend('uuid', async (data, field, message) => {
    const uuid = data[field]
    if (!uuid || uuid == null) return
    if (!uuidValidate(uuid, 4)) throw message
  })
})

hooks.before.httpServer(async () => {
  console.log(`${chalk.yellow('info:')} starting app`)

  // Clear the cache
  await ace.call('hs:cache:clear')

  // Check if we're in maintenance mode
  if (existsSync(`./down`)) {
    console.log(`${chalk.red('error:')} failed to start app (maintenance mode active)`)
    console.log(`${chalk.red('error:')} please cancel process, deactivate maintenance mode, and re-run`)
    process.exit(0)
  }
})

hooks.after.httpServer(() => {
  console.log(`${chalk.green('info:')} app started successfully 💪`)
})
