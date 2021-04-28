import { Middleware } from '@presentation/interfaces/Middleware'
import { range } from '@utils/index'
import { FastifyReply, FastifyRequest, FastifyError } from 'fastify'

export function makeMiddlewareAdapter (middleware: Middleware) {
  return async (request: FastifyRequest, reply: FastifyReply, done: (err?: FastifyError) => void): Promise<void> => {
    const result = await middleware.handle({
      headers: request.headers
    })

    if (range(400, 599).includes(result.statusCode)) {
      await reply.status(result.statusCode).send(result)
    } else {
      done()
    }
  }
}
