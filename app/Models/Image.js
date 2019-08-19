'use strict'

const BaseModel = use('BaseModel')

class Image extends BaseModel {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'Image.addHashProperty')
  }

  static get computed () {
    return [
      'full_filename',
      'url',
    ]
  }

  getFullFilename () {
    return `${this.filename}.${this.extension}`
  }

  getUrl () {
    return `https://d6d9dbp41whrq.cloudfront.net/${this.hash}.${this.extension}`
  }
}

module.exports = Image
