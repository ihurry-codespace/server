import { makeSignupUserController } from '@main/factory/Signup'
import { SignupUser } from '@presentation/controllers/SignupUserController'
import { FastifyInstance } from 'fastify'

export default async (router: FastifyInstance): Promise<void> => {
  const signupUserController = makeSignupUserController()

  router.post('/signup', async (request, reply) => {
    const { name, email, password, avatar } = request.body as SignupUser.Params

    const body = {
      name,
      email,
      password,
      avatar
    }

    const result = await signupUserController.handle({
      body
    })

    await reply.status(result.statusCode).send(result)
  })
}
