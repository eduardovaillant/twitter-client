import { AddRuleImpl } from './add-rule-impl'
import { TwitterAddRule, TwitterAddRuleResponse } from '@/data/protocols/clients/twitter-add-rule'
import { AddRuleModel } from '@/domain/usecases/add-rule'

const makeTwitterAddRuleStub = (): TwitterAddRule => {
  class TwitterAddRuleStub implements TwitterAddRule {
    async addRule (rule: AddRuleModel): Promise<TwitterAddRuleResponse> {
      return {
        value: 'any_value',
        tag: 'any_tag',
        twitter_rule_id: 'any_id'
      }
    }
  }
  return new TwitterAddRuleStub()
}

const makeFakeAddRule = (): AddRuleModel => (
  {
    value: 'any_value',
    tag: 'any_tag'
  }
)

type SutTypes = {
  sut: AddRuleImpl
  twitterAddRuleStub: TwitterAddRule
}

const makeSut = (): SutTypes => {
  const twitterAddRuleStub = makeTwitterAddRuleStub()
  const sut = new AddRuleImpl(twitterAddRuleStub)
  return {
    sut,
    twitterAddRuleStub
  }
}

describe('AddRuleImpl', () => {
  test('should call the TwitterAddRule with correct values', async () => {
    const { sut, twitterAddRuleStub } = makeSut()
    const addRuleSpy = jest.spyOn(twitterAddRuleStub, 'addRule')
    await sut.add(makeFakeAddRule())
    expect(addRuleSpy).toHaveBeenCalledWith(makeFakeAddRule())
  })

  test('should throw if TwitterAddRule throws', async () => {
    const { sut, twitterAddRuleStub } = makeSut()
    jest.spyOn(twitterAddRuleStub, 'addRule').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(makeFakeAddRule())
    await expect(promise).rejects.toThrow()
  })
})
