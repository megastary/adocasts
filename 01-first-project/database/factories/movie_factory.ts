import factory from '@adonisjs/lucid/factories'
import Movie from '#models/movie'

export const MovieFactory = factory
  .define(Movie, async ({ faker }) => {
    return {
      statusId: faker.number.int({ min: 1, max: 5 }),
      writerId: faker.number.int({ min: 1, max: 5 }),
      directorId: faker.number.int({ min: 1, max: 5 }),
      title: faker.book.title(),
      slug: faker.string.uuid(),
      summary: faker.lorem.sentence(),
      abstract: faker.lorem.paragraphs(),
      posterUrl: faker.image.urlPicsumPhotos(),
    }
  })
  .build()
