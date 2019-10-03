'use strict'

const BaseValidator = use('BaseValidator')

class PostUpdateValidator extends BaseValidator {
  get rules () {
    return {
      id: 'required',
      slug: `required|unique:posts,slug,id,${this.ctx.params.id}`,
      title: 'required|min:2',
      content: 'required|min:2',
    }
  }

  get messages () {
    return {
      'id.required': 'Post ID required',
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

module.exports = PostUpdateValidator
