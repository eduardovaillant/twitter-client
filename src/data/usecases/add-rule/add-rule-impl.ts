import { TwitterAddRule } from '@/data/protocols/clients/twitter-add-rule'
import { AddRuleRepository } from '@/data/protocols/repositories/add-rule-repository'
import { RuleModel } from '@/domain/models/rule-model'
import { AddRule, AddRuleModel } from '@/domain/usecases/add-rule'

export class AddRuleImpl implements AddRule {
  constructor (
    private readonly twitterClient: TwitterAddRule,
    private readonly addRuleRepository: AddRuleRepository
  ) {}

  async add (rule: AddRuleModel): Promise<RuleModel> {
    const twitterResponse = await this.twitterClient.addRule(rule)
    await this.addRuleRepository.addRule(twitterResponse)
    return Promise.resolve(null)
  }
}
