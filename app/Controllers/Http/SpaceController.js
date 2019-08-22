'use strict'

const Cache = use('Cache')
const Space = use('Space')
const { validateAll } = use('Validator')

class SpaceController {
  async index ({ view }) {
    const spaces = await Cache.remember('spaces', 30, async () => Space.all())
    return view.render('pages.spaces.index', { spaces: spaces.sort((a, b) => a.id - b.id) })
  }

  async show ({ params: { slug }, response, view }) {
    const space = await this._getSpace({ slug })

    return (space != null)
      ? view.render('pages.spaces.show', { space })
      : response.notFound()
  }

  create ({ view }) {
    return view.render('pages.spaces.create')
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

  async destroy ({ params: { slug } }) {
    const space = await Space
      .query()
      .where({ slug })
      .first()
    await space.delete()
    await this._clearCachedSpaces()
    return { status: 'success' }
  }

  async apiIndex () {
    return Cache.remember('spaces', 30, async () => Space.all())
  }

  async apiShow ({ params: { slug }, response }) {
    const space = await this._getSpace({ slug })
    return (space != null) ? space : response
      .status(404)
      .json({
        status: 'error',
        error: 'Space not found',
      })
  }

  async _getSpace ({ slug }) {
    const spaceInCache = await Cache.get(`space:${slug}`)

    if (spaceInCache != null) {
      return spaceInCache
    } else {
      const space = await Space
        .query()
        .where({ slug })
        .first()

      if (space != null) {
        await Cache.put(`space:${slug}`, space.toJSON(), 30)
        return space.toJSON()
      }

      return null
    }
  }

  async _clearCachedSpaces (slug = null) {
    await Cache.forget('spaces')
    if (slug != null) await Cache.forget(`space:${slug}`)
  }
}

module.exports = SpaceController
