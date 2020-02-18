'use strict'

const Cache = use('Cache')
const Post = use('Post')

class PostController {
  async index () {
    const posts = await Cache.remember('posts', 30, async () => {
      return (await Post
        .query()
        .with('author')
        .with('images')
        .fetch()
      ).toJSON()
    })
    return posts
  }

  async show ({ params: { slug }, response }) {
    const post = await this._getPost({ slug })

    return (post != null)
      ? post
      : response.notFound()
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

  async update ({ params: { id }, request, response }) {
    const post = await Post
      .query()
      .where({ id })
      .first()

    if (post != null) {
      await this._clearCachedPosts(post.slug)
      post.merge(request.only([
        'slug',
        'author_id',
        'title',
        'content',
      ]))
      await post.save()
      return { status: 'success', post }
    }

    return response.notFound()
  }

  async destroy ({ params: { id } }) {
    const post = await Post
      .query()
      .where({ id })
      .first()

    await post.delete()

    await this._clearCachedPosts()

    return { status: 'success' }
  }

  async addImages ({ params: { id }, request }) {
    const post = await Post
      .query()
      .where({ id })
      .first()

    await post.images().attach(request.input('image_ids'), (row) => {
      row.created = new Date()
      row.last_updated = new Date()
    })

    await this._clearCachedPosts(post.toJSON().slug)
    return { status: 'success' }
  }

  async removeImages ({ params: { id }, request }) {
    const post = await Post
      .query()
      .where({ id })
      .first()

    await post.images().detach(request.input('image_ids'))

    await this._clearCachedPosts(post.toJSON().slug)
    return { status: 'success' }
  }

  async _getPost ({ slug }) {
    const postInCache = await Cache.get(`post:${slug}`)

    if (postInCache != null) return postInCache

    const post = await Post
      .query()
      .with('author')
      .with('images')
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
