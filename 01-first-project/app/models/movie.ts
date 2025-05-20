import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
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
