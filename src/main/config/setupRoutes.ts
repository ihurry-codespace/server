import { FastifyInstance } from 'fastify'
import path from 'path'
import fg from 'fast-glob'

export async function setupRoutes (app: FastifyInstance): Promise<void> {
  await app.register(function (instance, _opts, done) {
    fg.sync('**/src/main/routes/**Route.ts').map(async file => {
      (await import(path.join('../../../', file))).default(instance)
    })

    done()
  })

  await app.register(function (instance, _opts, done) {
    fg.sync('**/src/main/routes/**Routes.ts').map(async file => {
      (await import(path.join('../../../', file))).default(instance)
    })

    done()
  }, { prefix: '/api' })
}
