'use strict'

const Cache = use('Cache')
const Post = use('Post')
const { validateAll } = use('Validator')

class PostController {
  async index ({ view }) {
    const posts = await Cache.remember('posts', 30, async () => Post.all())
    return view.render('pages.posts.index', { posts })
  }

  async show ({ params: { slug }, response, view }) {
    const post = await this._getPost({ slug })

    return (post != null)
      ? view.render('pages.posts.show', { post })
      : response.notFound()
  }

  create ({ view }) {
    return view.render('pages.posts.create')
  }

  async store ({ request, response, session }) {
    const data = request.only([
      'slug',
      'title',
      'content',
    ])

    const validation = await validateAll(data, {
      slug: 'required|unique:posts,slug',
      title: 'required|min:2',
      content: 'required|min:2',
    }, {
      'slug.required': 'Please provide a slug',
      'slug.unique': 'Slug already in use',
      'title.required': 'Please provide a title',
      'title.min': 'Title must be at least 2 characters',
      'content.required': 'Please provide content',
      'content.min': 'Content must be at least 2 characters',
    })

    console.log(validation.messages())

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }

    await Post.create(data)
    await this._clearCachedPosts()
    session.flash({ status: 'success', message: 'Post created successfully.' })
    return response.redirect('/admin/posts')
  }

  async update ({ params: { slug }, request, response, session }) {
    const post = await Post
      .query()
      .where({ slug })
      .first()
    if (post == null) return response.notFound()
    post.merge(request._data)
    await post.save()
    await this._clearCachedPosts(post.slug)
    session.flash({ status: 'success', message: 'Post updated successfully.' })
    return response.redirect(`/admin/posts/${post.slug}`)
  }

  async destroy ({ params: { slug }, response, session }) {
    const post = await Post
      .query()
      .where({ slug })
      .first()
    await post.delete()
    session.flash({ status: 'success', message: 'Post deleted successfully.' })
    await this._clearCachedPosts()
    return response.redirect('/admin/posts')
  }

  async apiIndex () {
    return Cache.remember('posts', 30, async () => Post.all())
  }

  async apiShow ({ params: { slug }, response }) {
    const post = await this._getPost({ slug })
    return (post != null) ? post : response
      .status(404)
      .json({
        status: 'error',
        error: 'Blog post not found',
      })
  }

  async _getPost ({ slug }) {
    const postInCache = await Cache.get(`post:${slug}`)

    if (postInCache != null) {
      return postInCache
    } else {
      const post = await Post
        .query()
        .where({ slug })
        .first()

      if (post != null) {
        await Cache.put(`post:${slug}`, post.toJSON(), 30)
        return post.toJSON()
      }

      return null
    }
  }

  async _clearCachedPosts (slug) {
    await Cache.forget('posts')
    await Cache.forget(`post:${slug}`)
  }
}

module.exports = PostController
