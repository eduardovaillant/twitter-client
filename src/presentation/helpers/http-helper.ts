import { HttpResponse } from '@/presentation/protocols/http'
import { ServerError } from '@/presentation/errors/server-error'

export const badRequest = (errors: string[]): HttpResponse => (
  {
    statusCode: 400,
    body: {
      code: 400,
      errors
    }
  }
)

export const serverError = (error: Error): HttpResponse => (
  {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
)
