'use strict'

const BaseModel = use('BaseModel')

class Post extends BaseModel {
  author () {
    return this.belongsTo('User', 'author_id', 'id')
  }

  space () {
    return this.hasOne('Space')
  }

  images () {
    return this
      .belongsToMany('Image')
      .pivotTable('post_images')
  }
}

module.exports = Post
