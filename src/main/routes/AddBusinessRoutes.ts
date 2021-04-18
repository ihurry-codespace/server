import { makeRouterAdapter } from '@infra/adapters'
import { makeAddBusiness } from '@main/factory/AddBusiness'
import { FastifyInstance } from 'fastify'

export default async (router: FastifyInstance): Promise<void> => {
  router.post('/business', makeRouterAdapter(makeAddBusiness()))
}
