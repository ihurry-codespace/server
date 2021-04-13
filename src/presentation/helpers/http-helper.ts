import { Exception } from '@data/exceptions/Exception'
import { ServerError } from '@presentation/errors'
import { HttpResponse } from '@presentation/interfaces/http'
import { I18nType } from '@presentation/interfaces/I18n'

export function badRequest (error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error
  }
}

export function serverError (): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}

export function ok (body: any): HttpResponse {
  return {
    statusCode: 200,
    body
  }
}

export function errorManager ({ error, options = '', i18n }: { error: Error, options?: any, i18n: I18nType }): HttpResponse {
  console.error(error)
  let response = serverError()

  if (error instanceof Exception) {
    response = badRequest(error)
  }

  response.body = i18n.translate(response.body.message, ...options)
  return response
}
