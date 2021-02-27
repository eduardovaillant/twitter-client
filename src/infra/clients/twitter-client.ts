import { HttpPost } from '@/data/protocols/http-client/http-post'
import { TwitterAddRule, TwitterAddRuleResponse } from '@/data/protocols/clients/twitter-add-rule'
import { AddRuleModel } from '@/domain/usecases/add-rule'
import env from '@/main/config/env'

// TODO if the twitter response is equal null, what i should do?
// TODO add tests: url and authorization
export class TwitterClient implements TwitterAddRule {
  constructor (
    private readonly httpPost: HttpPost
  ) {}

  async addRule (rule: AddRuleModel): Promise<TwitterAddRuleResponse> {
    const result = await this.httpPost.post(env.baseUrl + 'tweets/search/stream/rules', rule)
    return result
  }
}
