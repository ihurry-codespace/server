import { AddCommonUser } from '@domain/usecases/AddCommonUser'
import { EmailValidator } from '@infra/interfaces/EmailValidator'
import { InvalidParameterError, MissingParameterError } from '@presentation/errors'
import { badRequest, errorManager, ok } from '@presentation/helpers/http-helper'
import { HttpRequest, HttpResponse } from '@presentation/interfaces/http'

export class SignupUserController {
  constructor (
    private readonly addUserService: AddCommonUser,
    private readonly emailValidator: EmailValidator
  ) {}

  async handle (httpRequest: HttpRequest<SignupUser.Params>): Promise<HttpResponse> {
    const body = httpRequest?.body ?? {}

    try {
      const requiredParams = ['name', 'email', 'password', 'avatar']

      for (const key of requiredParams) {
        if (!body[key as keyof SignupUser.Params]) {
          return badRequest(new MissingParameterError(key))
        }
      }

      if (!this.emailValidator.validate(body.email)) {
        return badRequest(new InvalidParameterError('email'))
      }
    } catch (error) {
      return errorManager(error)
    }

    return await this.addUser(body)
  }

  private async addUser (body: SignupUser.Params): Promise<HttpResponse> {
    try {
      const user = await this.addUserService.add({
        name: body.name as string,
        email: body.email as string,
        password: body.password as string,
        avatar: body.avatar as string
      })
      return ok(user)
    } catch (error) {
      return errorManager(error)
    }
  }
}

export namespace SignupUser {
  export interface Params {
    name?: string
    email?: string
    password?: string
    avatar?: string
  }
}
