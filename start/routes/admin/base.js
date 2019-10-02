'use strict'

const Image = use('Image')
const Post = use('Post')
const Space = use('Space')
const Therapist = use('Therapist')
const User = use('User')

const Route = use('Route')

Route.get('/', async () => {
  const [spaceCount, therapistCount, postCount, userCount, mediaCount] = await Promise.all([
    await Space.getCount(),
    await Therapist.getCount(),
    await Post.getCount(),
    await User.getCount(),
    await Image.getCount(),
  ])

  return {
    spaceCount,
    therapistCount,
    postCount,
    userCount,
    mediaCount,
  }
})
