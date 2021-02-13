import { TwitterAddRule } from '@/data/protocols/clients/twitter-add-rule'
import { RuleModel } from '@/domain/models/rule-model'
import { AddRule, AddRuleModel } from '@/domain/usecases/add-rule'

export class AddRuleImpl implements AddRule {
  constructor (
    private readonly twitterClient: TwitterAddRule
  ) {}

  async add (rule: AddRuleModel): Promise<RuleModel> {
    await this.twitterClient.addRule(rule)
    return Promise.resolve(null)
  }
}
