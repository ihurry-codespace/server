import { AuthUser } from '@domain/usecases/AuthUser'
import { ok, serverError } from '@presentation/helpers/http-helper'
import { HttpRequest, HttpResponse } from '@presentation/interfaces/http'

export class LoginController {
  constructor (
    private readonly authUser: AuthUser
  ) {}

  async handle (httpRequest: HttpRequest<Login.Params>): Promise<HttpResponse<Login.Result>> {
    try {
      const user = {
        email: httpRequest.body?.email ?? '',
        password: httpRequest.body?.password ?? ''
      }

      const { token } = await this.authUser.login(user)

      return ok({
        token
      })
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}

export namespace Login {
  export interface Params {
    email?: string
    password?: string
  }
  export interface Result {
    token: string
    name: string
    email: string
  }
}
