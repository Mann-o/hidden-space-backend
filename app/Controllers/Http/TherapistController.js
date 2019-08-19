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

  async store ({ request, response, session }) {
    const data = request.only([
      'slug',
      'gender',
      'title',
      'first_names',
      'last_names',
      'email_address',
      'telephone_number',
      'biography',
      'image_id',
    ])

    const validation = await validateAll(data, {
      slug: 'required|unique:therapists,slug',
      gender: 'required|in:male,female',
      title: 'required|min:2',
      first_names: 'required|min:2',
      last_names: 'required|min:2',
    }, {
      'slug.required': 'Please provide a slug',
      'slug.unique': 'Slug already in use',
      'title.required': 'Please provide a title',
      'title.min': 'Title must be at least 2 characters',
      'first_names.required': 'Please provide first name(s)',
      'first_names.min': 'First name(s) must be at least 2 characters',
      'last_names.required': 'Please provide last name(s)',
      'last_names.min': 'Last name(s) must be at least 2 characters',
    })

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }

    await Therapist.create(data)
    await this._clearCachedTherapists()
    session.flash({ status: 'success', message: 'Therapist created successfully.' })
    return response.redirect('/admin/therapists')
  }

  async update ({ params: { slug }, request, response, session }) {
    const therapist = await Therapist
      .query()
      .where({ slug })
      .first()
    if (therapist != null) {
      therapist.merge(request._data)
      await therapist.save()
      await this._clearCachedTherapists(therapist.slug)
      session.flash({ status: 'success' })
      return response.redirect(`/admin/therapists/${therapist.slug}`)
    }
    return response.notFound()
  }

  async destroy ({ params: { slug }, response, session }) {
    const therapist = await Therapist
      .query()
      .where({ slug })
      .first()
    await therapist.delete()
    session.flash({ status: 'success', message: 'Therapist deleted successfully.' })
    await this._clearCachedTherapists()
    return response.redirect('/admin/therapists')
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
