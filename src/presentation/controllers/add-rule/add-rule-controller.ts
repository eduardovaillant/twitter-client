import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddRule } from '@/domain/usecases/add-rule'
import { badRequest } from '@/presentation/helpers/http-helper'
import { MissingParamError } from '@/presentation/errors/missing-param-error'

export class AddRuleController implements Controller {
  constructor (
    private readonly addRule: AddRule
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { value } = httpRequest.body

    if (!value) {
      return badRequest(new MissingParamError('value'))
    }

    await this.addRule.add(httpRequest.body)
    return Promise.resolve(null)
  }
}
