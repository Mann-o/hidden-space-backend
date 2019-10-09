'use strict'

const Cache = use('Cache')
const Image = use('Image')
const Therapist = use('Therapist')
const { validateAll } = use('Validator')

class TherapistController {
  async index () {
    const therapists = await Cache.remember('therapists', 30, async () => {
      return (
        await Therapist
          .query()
          .with('image')
          .fetch()
      ).toJSON()
    })
    return therapists
  }

  async show ({ params: { slug }, response }) {
    const therapist = await this._getTherapist({ slug })

    return (therapist != null)
      ? therapist
      : response.notFound()
  }

  async create ({ view }) {
    const media = await Cache.remember('media', 30, async () => Image.all())
    return view.render('pages.therapists.create', { media })
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
        'image_id',
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

  async _getTherapist ({ slug }) {
    const therapistInCache = await Cache.get(`therapist:${slug}`)

    if (therapistInCache != null) return therapistInCache

    const therapist = await Therapist
      .query()
      .with('image')
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
