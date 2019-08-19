'use strict'

const chalk = require('chalk')
const Database = use('Database')
const Factory = use('Factory')

class PostsSeeder {
  async run() {
    try {
      await Factory.model('Post').createMany(20)
      console.log(`${chalk.green('seed:')} 0001_posts.js`)
    } catch (error) {
      console.log(error)
      Database.close()
    }
  }
}

module.exports = PostsSeeder
