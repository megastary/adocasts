import factory from '@adonisjs/lucid/factories'
import Profile from '#models/profile'

export const ProfileFactory = factory
  .define(Profile, async ({ faker }) => {
    return {
      userId: faker.number.int({ min: 1, max: 10 }),
      bio: faker.lorem.sentence(),
    }
  })
  .build()
