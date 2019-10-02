'use strict'

const BaseValidator = use('BaseValidator')

class PostStoreValidator extends BaseValidator {
  get rules () {
    return {
      slug: 'required|unique:posts,slug',
      title: 'required|min:2',
      content: 'required|min:2',
    }
  }

  get messages () {
    return {
      'slug.required': 'Please provide a slug',
      'slug.unique': 'Slug already in use',
      'title.required': 'Please provide a title',
      'title.min': 'Title must be at least 2 characters',
      'content.required': 'Please provide content',
      'content.min': 'Content must be at least 2 characters',
    }
  }

  get validateAll () {
    return true
  }
}

module.exports = PostStoreValidator
