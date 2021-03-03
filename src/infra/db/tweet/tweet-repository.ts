import { AddRuleRepository, RuleModel, TwitterAddRuleResponse } from '@/data/usecases/rules/add-rule/add-rule-impl-protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class TweetRepository implements AddRuleRepository {
  async addRule (rule: TwitterAddRuleResponse): Promise<RuleModel> {
    const ruleCollection = await MongoHelper.getCollection('rules')
    const result = await ruleCollection.insertOne(rule)
    return MongoHelper.map(result.ops[0])
  }
}
