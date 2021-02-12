// TODO improve this response
export type ValidationResponse = {
  isValid: boolean
  errors?: string[]
}

export interface Validation {
  validate: (value: any) => ValidationResponse
}
