import { FastifyReply, FastifyRequest } from 'fastify'
import { Middleware } from '@presentation/interfaces/Middleware'
import { range } from '@utils/index'

export function makeMiddlewareAdapter (middleware: Middleware) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const result = await middleware.handle({
      headers: request.headers
    })

    if (range(400, 599).includes(result.statusCode)) {
      await reply.status(result.statusCode).send(result)
    }
  }
}
