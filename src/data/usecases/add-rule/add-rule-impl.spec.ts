import { AddRuleImpl } from './add-rule-impl'
import { AddRuleRepository } from '@/data/protocols/repositories/add-rule-repository'
import { TwitterAddRule, TwitterAddRuleResponse } from '@/data/protocols/clients/twitter-add-rule'
import { AddRuleModel } from '@/domain/usecases/add-rule'
import { RuleModel } from '@/domain/models/rule-model'

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

const makeAddRuleRepositoryStub = (): AddRuleRepository => {
  class AddRuleRepositoryStub implements AddRuleRepository {
    async addRule (rule: TwitterAddRuleResponse): Promise<RuleModel> {
      return {
        id: 'any_id',
        value: 'any_value',
        tag: 'any_tag',
        twitter_rule_id: 'any_id'
      }
    }
  }
  return new AddRuleRepositoryStub()
}

const makeFakeAddRule = (): AddRuleModel => (
  {
    value: 'any_value',
    tag: 'any_tag'
  }
)

const makeFakeTwitterAddRuleResponse = (): TwitterAddRuleResponse => (
  {
    value: 'any_value',
    tag: 'any_tag',
    twitter_rule_id: 'any_id'
  }
)

type SutTypes = {
  sut: AddRuleImpl
  twitterAddRuleStub: TwitterAddRule
  addRuleRepositoryStub: AddRuleRepository
}

const makeSut = (): SutTypes => {
  const twitterAddRuleStub = makeTwitterAddRuleStub()
  const addRuleRepositoryStub = makeAddRuleRepositoryStub()
  const sut = new AddRuleImpl(twitterAddRuleStub, addRuleRepositoryStub)
  return {
    sut,
    twitterAddRuleStub,
    addRuleRepositoryStub
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

  test('should call the AddRuleRepository with correct values', async () => {
    const { sut, addRuleRepositoryStub } = makeSut()
    const addRuleSpy = jest.spyOn(addRuleRepositoryStub, 'addRule')
    await sut.add(makeFakeAddRule())
    expect(addRuleSpy).toHaveBeenCalledWith(makeFakeTwitterAddRuleResponse())
  })
})
