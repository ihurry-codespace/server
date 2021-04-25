import { makeRouterAdapter } from '@infra/adapters'
import { makeAddJobController } from '@main/factory/AddJob'
import { FastifyInstance } from 'fastify'

export default async (router: FastifyInstance): Promise<void> => {
  router.post('/job', makeRouterAdapter(makeAddJobController()))
}
