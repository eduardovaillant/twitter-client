import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddRule } from '@/domain/usecases/add-rule'
import { badRequest } from '@/presentation/helpers/http-helper'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { Validation } from '@/presentation/protocols/validation'

export class AddRuleController implements Controller {
  constructor (
    private readonly addRule: AddRule,
    private readonly validation: Validation

  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const body = httpRequest.body

    if (!body.value) {
      return badRequest([new MissingParamError('value').message])
    }

    const { isValid, errors } = this.validation.validate(body)
    if (!isValid) {
      return badRequest(errors)
    }

    await this.addRule.add(httpRequest.body)
    return Promise.resolve(null)
  }
}
