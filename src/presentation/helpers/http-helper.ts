import { Exception } from '@data/exceptions/Exception'
import { ServerError } from '@presentation/errors'
import { ErrorBody, HttpResponse } from '@presentation/interfaces/http'

export function badRequest (error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: errorBody(error)
  }
}

export function serverError (error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: errorBody(new ServerError(error))
  }
}

export function ok (body: any): HttpResponse {
  return {
    statusCode: 200,
    body
  }
}

export function unauthorized (): HttpResponse {
  return {
    statusCode: 401,
    body: errorBody(new Error('Unauthorized'))
  }
}

export function errorBody (error: Error): ErrorBody {
  return {
    message: error?.message ?? '',
    code: error?.name ?? '',
    stack: error?.stack ?? ''
  }
}

export function errorManager (error: Error): HttpResponse {
  let response = serverError(error)

  if (error instanceof Exception) {
    response = badRequest(error)
  }

  return response
}
