import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddRule } from '@/domain/usecases/add-rule'
import { badRequest, created, serverError } from '@/presentation/helpers/http-helper'
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
      const ruleModel = await this.addRule.add(httpRequest.body)
      return created(ruleModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
