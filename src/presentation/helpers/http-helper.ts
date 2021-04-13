import { Exception } from '@data/exceptions/Exception'
import { ServerError } from '@presentation/errors'
import { HttpResponse } from '@presentation/interfaces/http'

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

export function errorManager (error: Error, _params: any = {}): HttpResponse {
  let response = serverError()

  if (error instanceof Exception) {
    response = badRequest(error)
  }

  return response
}
