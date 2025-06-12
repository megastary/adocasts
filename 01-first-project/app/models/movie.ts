import { BaseModel, beforeCreate, column, scope } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import MovieStatuses from '#enums/movie_statuses'
import string from '@adonisjs/core/helpers/string'

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

  static notReleased = scope((query) => {
    query.where((group) => {
      group
        .whereNot('statusId', MovieStatuses.RELEASED)
        .orWhereNull('releasedAt')
        .orWhere('releasedAt', '>', DateTime.now().toSQL())
    })
  })

  @beforeCreate()
  static async slugify(movie: Movie) {
    if (movie.slug) return

    const slug = string.slug(movie.title, {
      replacement: '-',
      lower: true,
      strict: true,
    })

    // Returns all other records using this exact slug or incremented variant
    const rows = await Movie.query()
      .select('slug')
      .whereRaw('lower(??) = ?', ['slug', slug])
      .orWhereRaw('lower(??) like ?', ['slug', `${slug}-%`])

    // If no records returned, we use unique slug
    if (!rows.length) {
      movie.slug = slug
      return
    }

    // This will calculate next available increment number
    const incrementors = rows.reduce<number[]>((result, row) => {
      const tokens = row.slug.toLocaleLowerCase().split(`${slug}-`)

      if (tokens.length < 2) {
        return result
      }

      const increment = Number(tokens.at(1))

      if (!Number.isNaN(increment)) {
        result.push(increment)
      }

      return result
    }, [])

    const increment = incrementors.length ? Math.max(...incrementors) + 1 : 1

    movie.slug = `${slug}-${increment}`
  }
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
