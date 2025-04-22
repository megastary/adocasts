import Movie from '#models/movie'
import type { HttpContext } from '@adonisjs/core/http'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const movies: Movie[] = await Movie.all()

    view.share({
      title: 'Movies',
      movies,
    })
    return view.render('pages/movies')
  }

  async show({ view, params }: HttpContext) {
    const movie = await Movie.findBySlug(params.slug)

    view.share(movie)

    return view.render('pages/movies/show')
  }
}
