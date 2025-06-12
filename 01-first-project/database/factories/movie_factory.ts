import factory from '@adonisjs/lucid/factories'
import Movie from '#models/movie'
import MovieStatuses from '#enums/movie_statuses'
import { DateTime } from 'luxon'

export const MovieFactory = factory
  .define(Movie, async ({ faker }) => {
    return {
      statusId: faker.number.int({ min: 1, max: 5 }),
      writerId: faker.number.int({ min: 1, max: 5 }),
      directorId: faker.number.int({ min: 1, max: 5 }),
      title: faker.book.title(),
      // slug: faker.string.uuid(),
      summary: faker.lorem.sentence(),
      abstract: faker.lorem.paragraphs(),
      posterUrl: faker.image.urlPicsumPhotos(),
    }
  })
  .state('released', (row, { faker }) => {
    row.statusId = MovieStatuses.RELEASED
    row.releasedAt = DateTime.fromJSDate(faker.date.past())
  })
  .state('releasingSoon', (row, { faker }) => {
    row.statusId = MovieStatuses.RELEASED
    row.releasedAt = DateTime.fromJSDate(faker.date.soon())
  })
  .state('postProduction', (row, { faker }) => {
    row.statusId = MovieStatuses.POST_PRODUCTION
    row.releasedAt = DateTime.fromJSDate(faker.date.soon())
  })
  .build()
