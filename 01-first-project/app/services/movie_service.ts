import { Exception } from '@adonisjs/core/exceptions'
import app from '@adonisjs/core/services/app'
import { MarkdownFile } from '@dimerapp/markdown'
import { readdir, readFile } from 'node:fs/promises'

interface MovieOverview {
  title: string
  summary: string
  slug: string
}

export default class MovieService {
  static getSlugUrl(slug: string) {
    if (!slug.endsWith('.md')) {
      slug += '.md'
    }
    return app.makeURL(`resources/movies/${slug}`)
  }

  static async getSlugs(): Promise<string[]> {
    const files = await readdir(app.makeURL('resources/movies'))
    return files.map((file) => file.replace('.md', ''))
  }

  static async read(slug: string) {
    try {
      const url = this.getSlugUrl(slug)
      const file = await readFile(url, 'utf8')
      const md = new MarkdownFile(file)

      await md.process()
      return md
    } catch (error) {
      throw new Exception(`Could not find a movie called ${slug}`, {
        status: 404,
        code: 'E_MOVIE_NOT_FOUND',
      })
    }
  }

  static async getMoviesOverview(): Promise<MovieOverview[]> {
    try {
      const slugs = await this.getSlugs()
      const movies: MovieOverview[] = []
      for (const slug of slugs) {
        const md = await this.read(slug)

        movies.push({
          title: md.frontmatter.title,
          summary: md.frontmatter.summary,
          slug,
        })
      }
      return movies
    } catch (error) {
      throw new Exception(`Could not find any movies. ${error}`, {
        status: 404,
        code: 'E_MOVIES_NOT_FOUND',
      })
    }
  }
}
