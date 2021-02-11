import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { AddRule } from '@/domain/usecases/add-rule'

export class AddRuleController implements Controller {
  constructor (
    private readonly addRule: AddRule
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addRule.add(httpRequest.body)
    return Promise.resolve(null)
  }
}
