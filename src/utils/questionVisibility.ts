import { Question, SurveyFormData } from '@/types/types';

export function isQuestionVisible(
  question: Question,
  values: Partial<SurveyFormData>
): boolean {
  if (!question.visibleWhen) return true;

  const rules = Array.isArray(question.visibleWhen)
    ? question.visibleWhen
    : [question.visibleWhen];

  return rules.every((rule) => {
    const value = values[rule.field] || '';

    if (rule.equals !== undefined && value !== rule.equals) return false;
    if (rule.notEquals !== undefined && value === rule.notEquals) return false;
    if (
      rule.includesAny &&
      !rule.includesAny.some((candidate) => value.includes(candidate))
    ) {
      return false;
    }

    return true;
  });
}
