import { makeLogin } from '@main/factory/Login'
import { makeSignupUserController } from '@main/factory/Signup'
import { Login } from '@presentation/controllers/LoginController'
import { SignupUser } from '@presentation/controllers/SignupUserController'
import { FastifyInstance } from 'fastify'

export default async (router: FastifyInstance): Promise<void> => {
  router
    .post('/signup', async (request, reply) => {
      const signupUserController = makeSignupUserController()
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
    .post('/login', async (request, reply) => {
      const loginController = makeLogin()
      const { email, password } = request.body as Login.Params

      const body = {
        email,
        password
      }

      const result = await loginController.handle({
        body
      })

      await reply.status(result.statusCode).send(result)
    })
}
