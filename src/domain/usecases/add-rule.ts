import { RuleModel } from '@/domain/models/rule-model'

export type AddRuleModel = Omit<RuleModel, 'id'>

export interface AddRule {
  add: (rule: AddRuleModel) => Promise<RuleModel>
}
