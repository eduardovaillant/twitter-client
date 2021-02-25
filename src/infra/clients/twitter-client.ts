import { HttpPost } from '@/infra/protocols/http-client/http-post'
import { TwitterAddRule, TwitterAddRuleResponse } from '@/data/protocols/clients/twitter-add-rule'
import { AddRuleModel } from '@/domain/usecases/add-rule'

export class TwitterClient implements TwitterAddRule {
  constructor (
    private readonly httpPost: HttpPost
  ) {}

  async addRule (rule: AddRuleModel): Promise<TwitterAddRuleResponse> {
    await this.httpPost.post('add_rule_url', rule)
    return null
  }
}
