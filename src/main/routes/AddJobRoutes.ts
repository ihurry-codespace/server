import { UserRole } from '@data/use-cases/interfaces'
import { makeRouterAdapter } from '@infra/adapters'
import { makeMiddlewareAdapter } from '@infra/adapters/FastifyMiddlewareAdapter'
import { makeAddJobController } from '@main/factory/AddJob'
import { makeAuthentication } from '@main/factory/AuthRoute'
import { FastifyInstance } from 'fastify'

export default async (router: FastifyInstance): Promise<void> => {
  router.post('/job', {
    preValidation: makeMiddlewareAdapter(makeAuthentication([UserRole.ADMIN, UserRole.ANALYST]))
  },
  makeRouterAdapter(makeAddJobController()))
}
