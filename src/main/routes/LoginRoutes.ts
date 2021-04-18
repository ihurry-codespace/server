import { makeRouterAdapter } from '@infra/adapters'
import { makeLogin } from '@main/factory/Login'
import { FastifyInstance } from 'fastify'

export default async (router: FastifyInstance): Promise<void> => {
  router.post('/login', makeRouterAdapter(makeLogin()))
}
