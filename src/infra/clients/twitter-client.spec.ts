import { TwitterAddRuleResponse } from '@/data/protocols/clients/twitter-add-rule'
import { AddRuleModel } from '@/domain/usecases/add-rule'
import { HttpPost } from '../protocols/http-client/http-post'
import { TwitterClient } from './twitter-client'

const makeFakeTwitterAddRuleResponse = (): TwitterAddRuleResponse => ({
  value: 'any_value',
  tag: 'any_tag',
  twitter_rule_id: 'any_id'
})

const makeFakeAddRule = (): AddRuleModel => (
  {
    value: 'any_value',
    tag: 'any_tag'
  }
)

describe('TwitterClient', () => {
  describe('Add Rule', () => {
    test('should call the twitter api with correct values ', async () => {
      class HttpPostStub implements HttpPost {
        async post (data: any, url: string): Promise<any> {
          return Promise.resolve(makeFakeTwitterAddRuleResponse())
        }
      }
      const httpPostStub = new HttpPostStub()
      const postSpy = jest.spyOn(httpPostStub, 'post')
      const sut = new TwitterClient(httpPostStub)
      await sut.addRule(makeFakeAddRule())
      expect(postSpy.mock.calls[0][1]).toEqual(makeFakeAddRule())
    })
  })
})
