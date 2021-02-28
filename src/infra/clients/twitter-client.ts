import { HttpPost } from '@/data/protocols/http-client/http-post'
import { TwitterAddRule, TwitterAddRuleResponse } from '@/data/protocols/clients/twitter-add-rule'
import { AddRuleModel } from '@/domain/usecases/add-rule'
import env from '@/main/config/env'

// TODO add correct fixtures to simulate the api calls
// TODO return an error if the api call is not successfull
// TODO error handling, twitter api responses to the user, validation
export class TwitterClient implements TwitterAddRule {
  constructor (
    private readonly httpPost: HttpPost
  ) {}

  async addRule (rule: AddRuleModel): Promise<TwitterAddRuleResponse> {
    const config = {
      headers: { Authorization: `Bearer ${env.bearerToken}` }
    }
    const body = {
      add: [
        {
          value: rule.value,
          tag: rule.tag || ''
        }
      ]
    }
    const result = await this.httpPost.post(env.baseUrl + 'tweets/search/stream/rules', body, config)
    const twitterAddRuleResponse: TwitterAddRuleResponse = {
      twitter_rule_id: result.data.data[0].id,
      value: result.data.data[0].value,
      tag: result.data.data[0].tag
    }
    return twitterAddRuleResponse
  }
}
