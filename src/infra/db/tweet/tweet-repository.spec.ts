import { TweetRepository } from './tweet-repository'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'
import { TwitterAddRuleResponse } from '@/data/protocols/clients/twitter-add-rule'
import { Collection } from 'mongodb'

let accountCollection: Collection
let tweetCollection: Collection

const makeFakeTwitterAddRuleResponse = (): TwitterAddRuleResponse => (
  {
    value: 'any_value',
    tag: 'any_tag',
    twitter_rule_id: 'any_id'
  }
)

describe('TweetRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('rules')
    tweetCollection = await MongoHelper.getCollection('tweets')
    await accountCollection.deleteMany({})
    await tweetCollection.deleteMany({})
  })

  const makeSut = (): TweetRepository => {
    return new TweetRepository()
  }

  describe('addRule()', () => {
    test('Should return a rule on addRule success', async () => {
      const sut = makeSut()
      const rule = await sut.addRule(makeFakeTwitterAddRuleResponse())
      expect(rule).toBeTruthy()
      expect(rule.id).toBeTruthy()
      expect(rule.tag).toBe('any_tag')
      expect(rule.value).toBe('any_value')
      expect(rule.twitter_rule_id).toBe('any_id')
    })
  })

  describe('saveTweet()', () => {
    test('Should save the tweet on saveTweet success', async () => {
      const sut = makeSut()
      await sut.saveTweet({
        text: 'any_text',
        tweet_id: 'any_id'
      })
      const tweet = await tweetCollection.findOne({ tweet_id: 'any_id' })
      expect(tweet).toBeTruthy()
      expect(tweet._id).toBeTruthy()
      expect(tweet.tweet_id).toBe('any_id')
    })
  })
})
