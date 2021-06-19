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
