import { AddRuleImpl } from './add-rule-impl'
import { TwitterAddRule, TwitterAddRuleResponse } from '@/data/protocols/clients/twitter-add-rule'
import { AddRuleModel } from '@/domain/usecases/add-rule'

describe('AddRuleImpl', () => {
  test('should call the twitter api with correct data', async () => {
    class TwitterClientStub implements TwitterAddRule {
      async addRule (rule: AddRuleModel): Promise<TwitterAddRuleResponse> {
        return {
          value: 'any_value',
          tag: 'any_tag',
          twitter_rule_id: 'any_id'
        }
      }
    }
    const twitterClientStub = new TwitterClientStub()
    const sut = new AddRuleImpl(twitterClientStub)
    const addRuleSpy = jest.spyOn(twitterClientStub, 'addRule')
    await sut.add({
      value: 'any_value',
      tag: 'any_tag'
    })
    expect(addRuleSpy).toHaveBeenCalledWith({
      value: 'any_value',
      tag: 'any_tag'
    })
  })
})
