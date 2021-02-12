import { AddRuleValidator } from './add-rule-validator'

describe('AddRuleValidator', () => {
  test('should return an error if no value is provided', () => {
    const sut = new AddRuleValidator()
    const result = sut.validate({ })
    expect(result.isValid).toBeFalsy()
    expect(result.errors[0]).toBe('"value" is required')
  })
})
