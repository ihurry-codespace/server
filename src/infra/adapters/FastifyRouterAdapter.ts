import { Controller } from '@presentation/interfaces/Controller'
import { FastifyReply, FastifyRequest } from 'fastify'

export function makeRouterAdapter (controller: Controller) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await controller.handle({
      body: request.body
    })

    await reply.status(result.statusCode).send(result)
  }
}
