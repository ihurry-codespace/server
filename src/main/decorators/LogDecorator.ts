import { Controller } from '@presentation/interfaces/Controller'
import { HttpRequest, HttpResponse } from '@presentation/interfaces/http'

export class LogDecorator implements Controller {
  constructor (
    private readonly controller: Controller
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = await this.controller.handle(httpRequest)

    if (result.statusCode > 399 && result.statusCode < 600) {
      console.log('======result.body?.stack======')
      console.error(result.body?.stack)
      console.log('======result.body?.stack======')
    }

    return result
  }
}
