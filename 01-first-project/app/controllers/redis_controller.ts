import cache from '#services/cache_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class RedisController {
  public async destroy({ params, response }: HttpContext) {
    await cache.delete(params.slug)
    return response.redirect().back()
  }

  async flush({ response }: HttpContext) {
    await cache.flushDb()
    return response.redirect().back()
  }
}
