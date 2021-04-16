import { Controller } from '@presentation/interfaces/Controller'
import { HttpRequest, HttpResponse } from '@presentation/interfaces/http'
import { I18nType } from '@presentation/interfaces/I18n'

export class TranslateErrorMessageDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly i18nProvider: I18nType
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const result = await this.controller.handle(httpRequest)

    if (result.statusCode > 399 && result.statusCode < 600) {
      result.body.message = this.i18nProvider.translate(result.body.message)
    }

    return result
  }
}
