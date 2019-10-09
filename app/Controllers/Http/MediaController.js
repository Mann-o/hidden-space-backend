'use strict'

const _ = require('lodash')
const axios = require('axios')
const { parse } = require('path')

const Cache = use('Cache')
const Drive = use('Drive')
const Image = use('Image')
const Kraken = use('Kraken')

class MediaController {
  async index () {
    const media = await Cache.remember('images', 30, async () => Image.all())
    return media
  }

  async show ({ params: { hash }, response }) {
    const image = await this._getMedia({ hash })

    return (image != null)
      ? image
      : response.notFound()
  }

  async upload ({ request }) {
    request.multipart.file('files[]', {}, async (file) => {
      try {
        const { data: optimisedImage } = await Kraken.upload({
          file: file.stream,
          wait: true,
          auto_orient: true,
          lossy: true,
          resize: {
            width: 800,
            height: 800,
            strategy: 'auto',
          },
        })

        // Set up some generic data for the image
        optimisedImage.meta = {
          extension: parse(optimisedImage.file_name).ext.toLowerCase().substring(1),
          name: parse(optimisedImage.file_name).name,
        }

        // create in database
        const savedImage = await Image.create({
          filename: optimisedImage.meta.name,
          extension: optimisedImage.meta.extension,
          original_size: optimisedImage.original_size,
          optimised_size: optimisedImage.kraked_size,
          bytes_saved: optimisedImage.saved_bytes,
        })

        // upload file to DigitalOcean
        const { data: optimisedImageFile } = await axios.get(optimisedImage.kraked_url, { responseType: 'stream' })
        await Drive
          .disk('spaces')
          .put(`hidden-space-images/${savedImage.hash}.${savedImage.extension}`, optimisedImageFile, {
            ACL: 'public-read',
            ContentType: 'image/jpeg',
            ContentDisposition: `inline; filename=${savedImage.hash}.${savedImage.extension}`,
          })
      } catch (error) {
        return {
          status: 'error',
          message: 'One or more uploads failed to complete, please check the uploaded files and try again.',
        }
      }
    })

    // Process it all!
    await request.multipart.process()

    await this._clearCachedMedia()

    return {
      status: 'success',
      message: 'All files were uploaded successfully',
    }
  }

  async update ({ params: { hash }, request, response, session }) {
    const media = await Image
      .query()
      .where({ hash })
      .first()
    if (media == null) return response.notFound()
    media.merge(_.pick(request._data, ['alt_text']))
    await media.save()
    await this._clearCachedMedia(media.hash)
    return { status: 'success', media }
  }

  async destroy ({ params: { id }, session }) {
    const media = await Image
      .query()
      .where({ id })
      .first()
    await Drive.disk('spaces').delete(`hidden-space-images/${media.hash}.${media.extension}`)
    await media.delete()
    await this._clearCachedMedia()
    return { status: 'success' }
  }

  async _getMedia ({ hash }) {
    const imagesInCache = await Cache.get(`media:${hash}`)

    if (imagesInCache != null) return imagesInCache

    const image = await Image
      .query()
      .where({ hash })
      .first()

    if (image == null) return null

    await Cache.put(`image:${hash}`, image.toJSON(), 30)
    return image.toJSON()
  }

  async _clearCachedMedia (hash = null) {
    await Cache.forget('images')
    if (hash != null) {
      await Cache.forget(`image:${hash}`)
    }
  }
}

module.exports = MediaController
