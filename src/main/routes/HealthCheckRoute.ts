import { FastifyInstance } from 'fastify'

// NOT PREFIXED WITH /api
export default async (router: FastifyInstance): Promise<void> => {
  router.get('/ping', async (_request, reply) => {
    await reply.send({
      pong: true
    })
  })
}
