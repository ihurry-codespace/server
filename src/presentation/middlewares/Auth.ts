// 1 verificar se token é um JWT válido
// 2 verificar se data do token ainda nao expirou
// 3 verificar se token foi gerado pela app
// 4 verificar se token esta na lista de tokens ja utilizados
// 5 verificar se usuario existe
// 7 liberar acesso

import { AuthTokenVerify } from '@domain/usecases/AuthToken'
import { errorManager, ok, unauthorized } from '@presentation/helpers/http-helper'
import { HttpRequest, HttpResponse } from '@presentation/interfaces/http'

export class AuthMiddleware {
  constructor (
    private readonly tokenValidator: AuthTokenVerify
  ) {}

  async handle ({ headers }: HttpRequest<AuthTokenVerify.Params>): Promise<HttpResponse<AuthTokenVerify.Result>> {
    try {
      const token = headers['x-access-token']
      const result = await this.tokenValidator.validate({ token })

      if (!result) {
        return unauthorized()
      }

      return ok(result)
    } catch (error) {
      return errorManager(error)
    }
  }
}
