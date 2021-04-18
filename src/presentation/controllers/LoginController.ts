import { UserNotFoundException } from '@data/exceptions'
import { AuthUser } from '@domain/usecases/AuthUser'
import { badRequest, errorManager, ok } from '@presentation/helpers/http-helper'
import { Controller } from '@presentation/interfaces/Controller'
import { HttpRequest, HttpResponse } from '@presentation/interfaces/http'

export class LoginController implements Controller {
  constructor (
    private readonly authUser: AuthUser
  ) {}

  async handle (httpRequest: HttpRequest<Login.Params>): Promise<HttpResponse<Login.Result>> {
    try {
      const user = {
        email: httpRequest.body?.email ?? '',
        password: httpRequest.body?.password ?? ''
      }

      const result = await this.authUser.login(user)

      if (!result?.token) return badRequest(new UserNotFoundException())

      return ok({
        token: result.token
      })
    } catch (error) {
      return errorManager(error)
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
