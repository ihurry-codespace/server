import { FastifyInstance } from 'fastify'
import middie from 'middie'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'

export async function setupMiddlewares (app: FastifyInstance): Promise<void> {
  await app.register(middie)
  await app.register(helmet)
  await app.register(cors)
}
