import { makeAddBusiness } from '@main/factory/AddBusiness'
import { SignupBusiness } from '@presentation/controllers/AddBusinessController'
import { FastifyInstance } from 'fastify'

export default async (router: FastifyInstance): Promise<void> => {
  router
    .post('/business', async (request, reply) => {
      const addBusinessController = makeAddBusiness()
      const { name, avatar, description, user_id: userId } = request.body as SignupBusiness.Params

      const body = {
        name,
        description,
        user_id: userId,
        avatar
      }

      const result = await addBusinessController.handle({
        body
      })

      await reply.status(result.statusCode).send(result)
    })
}
