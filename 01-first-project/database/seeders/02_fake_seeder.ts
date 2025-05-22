import { CineastFactory } from '#database/factories/cineast_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { UserFactory } from '#database/factories/user_factory'
import MovieStatuses from '#enums/movie_statuses'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  static environment: string[] = ['development']
  async run() {
    await CineastFactory.createMany(10)
    await UserFactory.createMany(10)
    await MovieFactory.merge({
      statusId: MovieStatuses.RELEASED,
      releasedAt: DateTime.now().minus({ days: 10 }),
    }).createMany(10)
  }
}
