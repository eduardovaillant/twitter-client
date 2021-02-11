import { AddRuleController } from './add-rule-controller'
import { AddRule, AddRuleModel } from '@/domain/usecases/add-rule'
import { RuleModel } from '@/domain/models/rule-model'

describe('AddRuleController', () => {
  test('should call add rule with correct values', async () => {
    class AddRulesStub implements AddRule {
      async add (rule: AddRuleModel): Promise<RuleModel> {
        return await Promise.resolve({ id: 'any_id', value: 'any_value', tag: 'any_tag' })
      }
    }
    const addRulesStub = new AddRulesStub()
    const sut = new AddRuleController(addRulesStub)
    const addSpy = jest.spyOn(addRulesStub, 'add')
    const fakeRule = {
      value: 'any_value'
    }
    await sut.handle({
      body: fakeRule
    })
    expect(addSpy).toBeCalledWith(fakeRule)
  })
})
