import Movie from '#models/movie'
import type { HttpContext } from '@adonisjs/core/http'

export default class MoviesController {
  async index({ view }: HttpContext) {
    // const movies: Movie[] = await Movie.all()
    const recentlyReleased = await Movie.query()
      .apply((scope) => scope.released())
      .orderBy('releasedAt', 'desc')
      .limit(9)

    const comingSoon = await Movie.query()
      .apply((scope) => scope.notReleased())
      .whereNotNull('releasedAt')
      .orderBy('releasedAt', 'asc')
      .limit(9)

    // Share makes the data available to all views, not just the current one
    view.share({
      title: 'Movies',
      comingSoon,
      recentlyReleased,
    })
    // If we pass movies as second argument here, it will be available only in this view as a state
    return view.render('pages/movies')
  }

  async show({ view, params }: HttpContext) {
    const movie = await Movie.findByOrFail('slug', params.slug)

    view.share({ movie })

    return view.render('pages/movies/show')
  }
}
