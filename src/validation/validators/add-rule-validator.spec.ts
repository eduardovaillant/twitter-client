import { AddRuleValidator } from './add-rule-validator'

describe('AddRuleValidator', () => {
  test('should return an error if no value is provided', () => {
    const sut = new AddRuleValidator()
    const result = sut.validate({ })
    expect(result.isValid).toBeFalsy()
    expect(result.errors[0]).toBe('"value" is required')
  })

  test('should return an error if value does not have the min length required', () => {
    const sut = new AddRuleValidator()
    const result = sut.validate({ value: 'ad' })
    expect(result.isValid).toBeFalsy()
    expect(result.errors[0]).toBe('"value" length must be at least 3 characters long')
  })
})
