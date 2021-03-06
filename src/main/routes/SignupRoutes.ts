import { makeRouterAdapter } from '@infra/adapters'
import { makeSignupUserController } from '@main/factory/Signup'
import { FastifyInstance } from 'fastify'

export default async (router: FastifyInstance): Promise<void> => {
  router.post('/signup', makeRouterAdapter(makeSignupUserController()))
}
