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
