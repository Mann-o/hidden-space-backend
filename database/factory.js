'use strict'

const Factory = use('Factory')

const {
  address,
  helpers,
  internet,
  lorem,
  name,
  random,
} = require('faker')

/**
 * User
 */
Factory.blueprint('User', (faker, i, { emailAddress, initialiseDeletion, username }) => {
  const hasVerifiedEmailAddress = random.boolean()
  return {
    username: (username != null) ? username : internet.userName().toLowerCase(),
    email_address: (emailAddress != null) ? emailAddress : `test${(i + 1)}@tynesidegroup.com`,
    password: 'password',
    has_verified_email_address: hasVerifiedEmailAddress,
    ...(initialiseDeletion && {
      delete_account_token: random.uuid(),
    }),
  }
})

/**
 * Post
 */
Factory.blueprint('Post', (faker, i) => {
  const title = lorem.words()
  return {
    slug: helpers.slugify(title).toLowerCase(),
    title,
    content: lorem.paragraphs(random.number({ min: 3, max: 10 })),
    author_id: random.number({ min: 1, max: 5 })
  }
})

/**
 * Space
 */
Factory.blueprint('Space', (faker, i) => ({
  slug: helpers.slugify(address.city()).toLowerCase(),
  building_name: address.secondaryAddress(),
  street_address: address.streetAddress(),
  city: address.city()
}))

/**
 * Therapist
 */
Factory.blueprint('Therapist', (faker, i) => {
  const firstNames = name.firstName()
  const lastNames = name.lastName()
  return {
    slug: helpers.slugify(`${firstNames} ${lastNames}`).toLowerCase(),
    gender: faker.gender().toLowerCase(),
    title: name.prefix().replace(/\./g, ''),
    first_names: firstNames,
    last_names: lastNames,
    email_address: `test${(i + 1)}@tynesidegroup.com`,
    telephone_number: '01234567890',
    biography: lorem.paragraphs(random.number({ min: 1, max: 5 })),
  }
})
