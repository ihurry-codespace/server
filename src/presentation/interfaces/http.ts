export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}

export interface HttpRequest<T = any> {
  body: T
}

export interface ErrorBody {
  message: string
  code: string
  stack?: string
}
