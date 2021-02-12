import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddRule } from '@/domain/usecases/add-rule'
import { badRequest, serverError } from '@/presentation/helpers/http-helper'
import { Validation } from '@/presentation/protocols/validation'

export class AddRuleController implements Controller {
  constructor (
    private readonly addRule: AddRule,
    private readonly validation: Validation

  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest.body)
      if (!validationResult.isValid) {
        return badRequest(validationResult.errors)
      }
      await this.addRule.add(httpRequest.body)
    } catch (error) {
      return serverError(error)
    }
  }
}
