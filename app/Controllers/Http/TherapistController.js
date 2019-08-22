'use strict'

const Cache = use('Cache')
const Image = use('Image')
const Therapist = use('Therapist')
const { validateAll } = use('Validator')

class TherapistController {
  async index ({ view }) {
    const therapists = await Cache.remember('therapists', 30, async () => {
      return (
        await Therapist
          .query()
          .with('image')
          .fetch()
      ).toJSON()
    })
    return view.render('pages.therapists.index', { therapists })
  }

  async show ({ params: { slug }, response, view }) {
    const therapist = await this._getTherapist({ slug })
    const media = await Cache.remember('media', 30, async () => Image.all())

    return (therapist != null)
      ? view.render('pages.therapists.show', { therapist, media })
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

  async destroy ({ params: { slug } }) {
    const therapists = await Therapist
      .query()
      .where({ slug })
      .first()
    await therapists.delete()
    await this._clearCachedTherapists()
    return { status: 'success' }
  }

  async apiIndex () {
    return Cache.remember('therapists', 30, async () => Therapist.all())
  }

  async apiShow ({ params: { slug }, response }) {
    const therapist = await this._getTherapist({ slug })
    return (therapist != null) ? therapist : response
      .status(404)
      .json({
        status: 'error',
        error: 'Therapist not found',
      })
  }

  async _getTherapist ({ slug }) {
    const therapistInCache = await Cache.get(`therapist:${slug}`)

    if (therapistInCache != null) {
      return therapistInCache
    } else {
      const therapist = await Therapist
        .query()
        .with('image')
        .where({ slug })
        .first()

      if (therapist != null) {
        await Cache.put(`therapist:${slug}`, therapist.toJSON(), 30)
        return therapist.toJSON()
      }

      return null
    }
  }

  async _clearCachedTherapists (slug) {
    await Cache.forget('therapists')
    await Cache.forget(`therapist:${slug}`)
  }
}

module.exports = TherapistController
