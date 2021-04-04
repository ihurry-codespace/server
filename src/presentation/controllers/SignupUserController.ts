import { AddCommonUser } from '@domain/usecases/AddCommonUser'
import { InvalidParameterError, MissingParameterError } from '@presentation/errors'
import { badRequest, ok, serverError } from '@presentation/helpers/http-helper'
import { HttpRequest, HttpResponse } from '@presentation/interfaces/http'

export interface Params {
  name?: string
  email?: string
  password?: string
  avatar?: string
}

export class SignupUserController {
  constructor (
    private readonly addUserService: AddCommonUser,
    private readonly emailValidator: any
  ) {}

  async handle (httpRequest: HttpRequest<Params>): Promise<HttpResponse> {
    try {
      const requiredParams = ['name', 'email', 'password', 'avatar']
      const body = httpRequest?.body ?? {}

      for (const key of requiredParams) {
        if (!body[key as keyof Params]) {
          return badRequest(new MissingParameterError(key))
        }
      }

      if (!this.emailValidator.validate(body.email)) {
        return badRequest(new InvalidParameterError('email'))
      }

      const user = await this.addUserService.add({
        name: body.name as string,
        email: body.email as string,
        password: body.password as string,
        avatar: body.avatar as string
      })

      return ok(user)
    } catch (error) {
      return serverError()
    }
  }
}
