'use strict'

const Cache = use('Cache')
const Image = use('Image')
const Therapist = use('Therapist')
const { validateAll } = use('Validator')

class TherapistController {
  async index () {
    return Cache.remember('therapists', 30, async () => {
      return (await Therapist
        .query()
        .with('images')
        .fetch()
      ).toJSON()
    })
  }

  async show ({ params: { slug }, response }) {
    const therapist = await this._getTherapist({ slug })

    return (therapist != null)
      ? therapist
      : response.notFound()
  }

  async store ({ request }) {
    const data = request.only([
      'slug',
      'gender',
      'title',
      'first_names',
      'last_names',
      'email_address',
      'telephone_number',
      'image_id',
      'biography',
    ])

    await Therapist.create(data)
    await this._clearCachedTherapists()
    return { status: 'success' }
  }

  async update ({ params: { id }, request, response }) {
    const therapist = await Therapist
      .query()
      .where({ id })
      .first()

    if (therapist != null) {
      therapist.merge(request.only([
        'slug',
        'gender',
        'title',
        'first_names',
        'last_names',
        'email_address',
        'telephone_number',
        'biography',
      ]))
      await therapist.save()
      await this._clearCachedTherapists(therapist.slug)
      return { status: 'success', therapist }
    }

    return response.notFound()
  }

  async destroy ({ params: { id } }) {
    const therapists = await Therapist
      .query()
      .where({ id })
      .first()
    await therapists.delete()
    await this._clearCachedTherapists()
    return { status: 'success' }
  }

  async addImages ({ params: { id }, request }) {
    const therapist = await Therapist
      .query()
      .where({ id })
      .first()

    await therapist.images().attach(request.input('image_ids'), (row) => {
      row.created = new Date()
      row.last_updated = new Date()
    })

    await this._clearCachedTherapists(therapist.toJSON().slug)
    return { status: 'success' }
  }

  async removeImages ({ params: { id }, request }) {
    const therapist = await Therapist
      .query()
      .where({ id })
      .first()

    await therapist.images().detach(request.input('image_ids'))

    await this._clearCachedTherapists(therapist.toJSON().slug)
    return { status: 'success' }
  }

  async _getTherapist ({ slug }) {
    const therapistInCache = await Cache.get(`therapist:${slug}`)

    if (therapistInCache != null) return therapistInCache

    const therapist = await Therapist
      .query()
      .with('images')
      .where({ slug })
      .first()

    if (therapist == null) return null

    await Cache.put(`therapist:${slug}`, therapist.toJSON(), 30)
    return therapist.toJSON()
  }

  async _clearCachedTherapists (slug = null) {
    await Cache.forget('therapists')
    if (slug != null) {
      await Cache.forget(`therapist:${slug}`)
    }
  }
}

module.exports = TherapistController
