import fastify from 'fastify'
import { setupRoutes, setupMiddlewares } from '@main/config'

const app = fastify({
  logger: {
    level: 'info',
    prettyPrint: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-floating-promises
Promise.all([
  setupRoutes(app),
  setupMiddlewares(app)
])

export default app
