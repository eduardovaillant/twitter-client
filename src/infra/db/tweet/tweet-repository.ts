import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { SaveTweetRepository } from '@/data/protocols/repositories/save-tweet-repository'
import { AddRuleRepository, RuleModel, TwitterAddRuleResponse } from '@/data/usecases/rules/add-rule/add-rule-impl-protocols'
import { SaveTweetModel } from '@/domain/usecases/save-tweet'

export class TweetRepository implements AddRuleRepository, SaveTweetRepository {
  async addRule (rule: TwitterAddRuleResponse): Promise<RuleModel> {
    const rulesCollection = await MongoHelper.getCollection('rules')
    const result = await rulesCollection.insertOne(rule)
    return MongoHelper.map(result.ops[0])
  }

  async saveTweet (tweet: SaveTweetModel): Promise<void> {
    const tweetsCollection = await MongoHelper.getCollection('tweets')
    await tweetsCollection.insertOne(tweet)
  }
}
