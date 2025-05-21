import { CineastFactory } from '#database/factories/cineast_factory'
import { MovieFactory } from '#database/factories/movie_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment: string[] = ['development']
  async run() {
    await CineastFactory.createMany(10)
    await UserFactory.createMany(10)
    await MovieFactory.createMany(10)
  }
}
