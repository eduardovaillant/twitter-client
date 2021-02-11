import { AddRuleController } from './add-rule-controller'
import { AddRule, AddRuleModel } from '@/domain/usecases/add-rule'
import { RuleModel } from '@/domain/models/rule-model'
import { HttpRequest } from '@/presentation/protocols/http'

const makeAddRuleStub = (): AddRule => {
  class AddRulesStub implements AddRule {
    async add (rule: AddRuleModel): Promise<RuleModel> {
      return await Promise.resolve({ id: 'any_id', value: 'any_value', tag: 'any_tag' })
    }
  }
  return new AddRulesStub()
}

const makeFakeRule = (): AddRuleModel => ({
  value: 'any_value'
})

const makeFakeRequest = (): HttpRequest => ({
  body: makeFakeRule()
})

type SutTypes = {
  sut: AddRuleController
  addRuleStub: AddRule
}
const makeSut = (): SutTypes => {
  const addRuleStub = makeAddRuleStub()
  const sut = new AddRuleController(addRuleStub)
  return {
    sut,
    addRuleStub
  }
}

describe('AddRuleController', () => {
  test('should call add rule with correct values', async () => {
    const { sut, addRuleStub } = makeSut()
    const addSpy = jest.spyOn(addRuleStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toBeCalledWith(makeFakeRule())
  })
})
