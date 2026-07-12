import { SurveyFormData } from '@/types/types';

export type PainSupportLevel = 'standard' | 'enhanced' | 'intensive' | 'unknown';

export interface PainSensitivityAssessment {
  level: PainSupportLevel;
  label: string;
  strategy: string;
  needsWarning: boolean;
}

export function assessPainSensitivity(
  data: Pick<SurveyFormData, 'painSensitivity'>
): PainSensitivityAssessment {
  if (data.painSensitivity === '매우 높음') {
    return {
      level: 'intensive',
      label: '매우 높음 - 사전 통증 관리 계획 필요',
      strategy:
        '마취 방법과 대기 시간을 먼저 확인하고 냉각, 천천히 시작하기, 중간 휴식과 단계적 시술을 검토합니다.',
      needsWarning: true,
    };
  }

  if (data.painSensitivity === '높음') {
    return {
      level: 'enhanced',
      label: '높음 - 통증 관리 강화 필요',
      strategy:
        '마취와 냉각을 충분히 준비하고 시술 초반 반응을 확인하면서 진행 속도와 휴식을 조절합니다.',
      needsWarning: true,
    };
  }

  if (data.painSensitivity === '낮음' || data.painSensitivity === '보통') {
    return {
      level: 'standard',
      label: `${data.painSensitivity} - 표준 통증 관리`,
      strategy:
        '시술 특성에 맞는 일반적인 마취와 통증 관리 방법을 적용합니다.',
      needsWarning: false,
    };
  }

  return {
    level: 'unknown',
    label: '통증 민감도 확인 필요',
    strategy:
      '시술 전 통증 경험과 선호하는 통증 관리 방법을 의료진에게 알려주세요.',
    needsWarning: false,
  };
}
