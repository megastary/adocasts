/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { toHtml } from '@dimerapp/markdown/utils'
import MovieService from '#services/movie_service'
import { title } from 'node:process'

router
  .get('/', async (ctx) => {
    const movies = await MovieService.getMoviesOverview()

    return ctx.view.render('pages/home', { movies })
  })
  .as('home')

router.on('/test').render('pages/test').as('test')

router
  .get('/movies', async ({ view }) => {
    const movies = await MovieService.getMoviesOverview()

    view.share({
      title: 'Movies',
      movies,
    })
    return view.render('pages/movies')
  })
  .as('movies.index')

router
  .get('/movies/:slug', async (ctx) => {
    const md = await MovieService.read(ctx.params.slug)

    ctx.view.share({
      title: md.frontmatter.title,
      movie: toHtml(md).contents,
    })

    return ctx.view.render('pages/movies/show')
  })
  .as('movies.show')
  .where('slug', router.matchers.slug())
