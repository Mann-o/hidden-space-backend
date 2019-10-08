'use strict'

const Cache = use('Cache')
const Post = use('Post')

class PostController {
  async index () {
    const posts = await Cache.remember('posts', 30, async () => {
      return (await Post
        .query()
        .with('author')
        .fetch()
      ).toJSON()
    })
    return posts
  }

  async show ({ params: { slug }, response }) {
    const post = await this._getPost({ slug })
    return (post != null) ? post : response.notFound()
  }

  async store ({ request }) {
    const data = request.only([
      'slug',
      'title',
      'content',
    ])

    const post = await Post.create(data)
    await this._clearCachedPosts()
    return { status: 'success', post }
  }

  async update ({ params: { slug }, request, response }) {
    const post = await Post
      .query()
      .where({ slug })
      .first()
    if (post == null) return response.notFound()
    post.merge(request._data)
    await post.save()
    await this._clearCachedPosts(post.slug)
    return { status: 'success', post }
  }

  async destroy ({ params: { slug }, response, session }) {
    const post = await Post
      .query()
      .where({ slug })
      .first()
    await post.delete()

    await this._clearCachedPosts()

    return { status: 'success' }
  }

  async _getPost ({ slug }) {
    const postInCache = await Cache.get(`post:${slug}`)

    if (postInCache != null) return postInCache

    const post = await Post
      .query()
      .with('author')
      .where({ slug })
      .first()

    if (post == null) return null

    await Cache.put(`post:${slug}`, post.toJSON(), 30)
    return post.toJSON()
  }

  async _clearCachedPosts (slug = null) {
    await Cache.forget('posts')
    if (slug != null) {
      await Cache.forget(`post:${slug}`)
    }
  }
}

module.exports = PostController
