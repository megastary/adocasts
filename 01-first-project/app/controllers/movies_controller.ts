import Movie from '#models/movie'
import type { HttpContext } from '@adonisjs/core/http'

export default class MoviesController {
  async index({ view }: HttpContext) {
    const movies: Movie[] = await Movie.all()

    // Share makes the data available to all views, not just the current one
    view.share({
      title: 'Movies',
      movies,
    })
    // If we pass movies as second argument here, it will be available only in this view as a state
    return view.render('pages/movies')
  }

  async show({ view, params }: HttpContext) {
    const movie = await Movie.findBySlug(params.slug)

    view.share(movie)

    return view.render('pages/movies/show')
  }
}
