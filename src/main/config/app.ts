import fastify from 'fastify'
import { setupRoutes, setupMiddlewares } from '@main/config'
import { setupHooks } from './setupHooks'

const app = fastify()

// eslint-disable-next-line @typescript-eslint/no-floating-promises
Promise.all([
  setupHooks(app),
  setupRoutes(app),
  setupMiddlewares(app)
])

export default app
