import { FastifyInstance } from 'fastify'
import { readdirSync } from 'fs'

export async function setupRoutes (app: FastifyInstance): Promise<void> {
  await app.register(function (instance, _opts, done) {
    // eslint-disable-next-line node/no-path-concat
    readdirSync(`${__dirname}/../routes`).map(async file => {
      if (!file.endsWith('.map')) {
        (await import(`../routes/${file}`)).default(instance)
      }
    })

    done()
  }, { prefix: '/api' })
}
