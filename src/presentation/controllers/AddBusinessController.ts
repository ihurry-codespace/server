import { AddBusiness } from '@domain/usecases/AddBusiness'
import { MissingParameterError } from '@presentation/errors'
import { badRequest, errorManager, ok } from '@presentation/helpers/http-helper'
import { Controller } from '@presentation/interfaces/Controller'
import { HttpRequest, HttpResponse } from '@presentation/interfaces/http'

/**
 * Eu como usuario logado devo ser capaz de incluir um e apenas um
 * novo business com name e description
 */

export class AddBusinessController implements Controller {
  constructor (
    private readonly addBusiness: AddBusiness
  ) {}

  async handle (httpRequest: HttpRequest<SignupBusiness.Params>): Promise<HttpResponse> {
    try {
      const body = httpRequest?.body ?? {}

      const requiredParams = ['name', 'description', 'avatar', 'user_id']

      for (const key of requiredParams) {
        if (!body[key as keyof SignupBusiness.Params]) {
          return badRequest(new MissingParameterError(key))
        }
      }

      const business: AddBusiness.Params = {
        name: body.name as string,
        description: body.description as string,
        avatar: body.avatar as string,
        user_id: body.user_id as string
      }

      await this.addBusiness.save(business)

      return ok('')
    } catch (error) {
      return errorManager(error)
    }
  }
}

export namespace SignupBusiness {
  export interface Params {
    name?: string
    description?: string
    avatar?: string
    user_id?: string
  }
}
