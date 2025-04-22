import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import MovieService from '#services/movie_service'
import { toHtml } from '@dimerapp/markdown/utils'

export default class Movie {
  declare title: string

  declare slug: string

  declare summary: string

  declare abstract?: string
  // @column({ isPrimary: true })
  // declare id: number

  // @column.dateTime({ autoCreate: true })
  // declare createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // declare updatedAt: DateTime

  static async all() {
    const slugs = await MovieService.getSlugs()
    const movies: Movie[] = []
    for (const slug of slugs) {
      const movie = await Movie.findBySlug(slug)
      movies.push(movie)
    }
    return movies
  }

  static async findBySlug(slug: string) {
    const md = await MovieService.read(slug)
    const movie = new Movie()
    movie.title = md.frontmatter.title
    movie.summary = md.frontmatter.summary
    movie.slug = slug
    movie.abstract = toHtml(md).contents

    if (!movie) {
      throw new Error(`Movie with slug ${slug} not found`)
    }
    return movie
  }
}
