/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import Movie from '#models/movie'
const MoviesController = () => import('#controllers/movies_controller')

router
  .get('/', async (ctx) => {
    const movies = await Movie.all()

    return ctx.view.render('pages/home', { movies })
  })
  .as('home')

router.on('/test').render('pages/test').as('test')

router.get('/movies', [MoviesController, 'index']).as('movies.index')

router
  .get('/movies/:slug', [MoviesController, 'show'])
  .as('movies.show')
  .where('slug', router.matchers.slug())
