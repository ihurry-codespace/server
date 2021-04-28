export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}

export interface HttpRequest<B = any, H = any> {
  body?: B
  headers?: H
}

export interface ErrorBody {
  message: string
  code: string
  stack?: string
}
