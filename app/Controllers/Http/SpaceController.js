'use strict'

const Cache = use('Cache')
const Image = use('Image')
const Space = use('Space')

// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({ node: 'http://localhost:9200' })

class SpaceController {
  index () {
    return Cache.remember('spaces', 30, async () => {
      return (await Space
        .query()
        .with('images')
        .fetch()
      ).toJSON()
    })
  }

  async show ({ params: { slug }, response }) {
    const space = await this._getSpace({ slug })

    return (space != null)
      ? space
      : response.notFound()
  }

  async store ({ request }) {
    const data = request.only([
      'slug',
      'property_number',
      'building_name',
      'street_address',
      'city',
    ])

    await Space.create(data)
    await this._clearCachedSpaces()
    return { status: 'success' }
  }

  async update ({ params: { id }, request, response }) {
    const space = await Space
      .query()
      .where({ id })
      .first()

    if (space != null) {
      space.merge(request.only([
        'slug',
        'property_number',
        'building_name',
        'street_address',
        'city',
      ]))
      await space.save()
      await this._clearCachedSpaces(space.slug)
      return { status: 'success', space }
    }

    return response.notFound()
  }

  async destroy ({ params: { id } }) {
    const space = await Space
      .query()
      .where({ id })
      .first()
    await space.delete()
    await this._clearCachedSpaces(space.toJSON().slug)
    return { status: 'success' }
  }

  async addImages ({ params: { id }, request }) {
    const space = await Space
      .query()
      .where({ id })
      .first()

    await space.images().attach(request.input('image_ids'), (row) => {
      row.created = new Date()
      row.last_updated = new Date()
    })

    await this._clearCachedSpaces(space.toJSON().slug)
    return { status: 'success' }
  }

  async removeImages ({ params: { id }, request }) {
    const space = await Space
      .query()
      .where({ id })
      .first()

    await space.images().detach(request.input('image_ids'))

    await this._clearCachedSpaces(space.toJSON().slug)
    return { status: 'success' }
  }

  async _getSpace ({ slug }) {
    const spaceInCache = await Cache.get(`space:${slug}`)

    if (spaceInCache != null) return spaceInCache

    const space = await Space
      .query()
      .with('images')
      .where({ slug })
      .first()

    if (space == null) return null

    await Cache.put(`space:${slug}`, space.toJSON(), 30)
    return space.toJSON()
  }

  async _clearCachedSpaces (slug = null) {
    await Cache.forget('spaces')
    if (slug != null) await Cache.forget(`space:${slug}`)
  }
}

module.exports = SpaceController
