// TODO improve this response
export type ValidationResponse = {
  isValid: boolean
  errors?: any
}

export interface Validation {
  validate: (value: any) => ValidationResponse
}
