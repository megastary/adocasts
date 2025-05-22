import { BaseModel, column, scope } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import MovieStatuses from '#enums/movie_statuses'

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare statusId: number

  @column()
  declare writerId: number

  @column()
  declare directorId: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare summary: string

  @column()
  declare abstract: string

  @column()
  declare posterUrl: string

  @column.dateTime()
  declare releasedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Then we can call like this
  // await models.movie.query().apply(scope => scope.released()).pojo()
  // Also can chain other filter
  // await models.movie.query().apply(scope => scope.released()).where('title', 'Nineteen Eighty Four').pojo()
  static released = scope((query) => {
    query
      .where('releasedAt', '<=', DateTime.now().toSQL())
      .andWhere('statusId', MovieStatuses.RELEASED)
      .andWhereNotNull('releasedAt')
  })
  // @column({ isPrimary: true })
  // declare id: number

  // @column.dateTime({ autoCreate: true })
  // declare createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // declare updatedAt: DateTime

  // These are already automatically defined by Lucid
  // static async all() {
  //   const slugs = await MovieService.getSlugs()
  //   const movies: Movie[] = []
  //   for (const slug of slugs) {
  //     const movie = await Movie.findBySlug(slug)
  //     movies.push(movie)
  //   }
  //   return movies
  // }

  // These are already automatically defined by Lucid
  // static async findBySlug(slug: string): Promise<Movie> {
  //   if (await cache.has(slug)) {
  //     console.log('Cache hit: ' + slug)
  //     return cache.get(slug)
  //   }
  //   const md = await MovieService.read(slug)
  //   const movie = new Movie()
  //   movie.title = md.frontmatter.title
  //   movie.summary = md.frontmatter.summary
  //   movie.slug = slug
  //   movie.abstract = toHtml(md).contents

  //   if (!movie) {
  //     throw new Error(`Movie with slug ${slug} not found`)
  //   }

  //   await cache.set(slug, movie)

  //   return movie
  // }
}
