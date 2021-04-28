import { UserRole } from '@data/use-cases/interfaces'
import { makeRouterAdapter } from '@infra/adapters'
import { makeMiddlewareAdapter } from '@infra/adapters/FastifyMiddlewareAdapter'
import { makeAddBusiness } from '@main/factory/AddBusiness'
import { makeAuthentication } from '@main/factory/AuthRoute'
import { FastifyInstance } from 'fastify'

export default async (router: FastifyInstance): Promise<void> => {
  router.post('/business', {
    preValidation: makeMiddlewareAdapter(makeAuthentication([UserRole.CANDIDATE]))
  }, makeRouterAdapter(makeAddBusiness()))
}
