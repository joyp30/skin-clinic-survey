import { SurveyFormData } from '@/types/types';

export type CirsGrade = 'Green' | 'Yellow' | 'Red';

type CirsField =
  | 'cirsAcuteLesion'
  | 'cirsCurrentSensitivity'
  | 'cirsPersistentMarks'
  | 'cirsRecentIrritation';

export interface CirsAssessment {
  grade: CirsGrade;
  label: string;
  isComplete: boolean;
  redFlags: string[];
  cautionSignals: string[];
  reasons: string[];
  patientMessage: string;
  strategy: string;
  shouldBlockAddOns: boolean;
}

const CIRS_FIELDS: CirsField[] = [
  'cirsAcuteLesion',
  'cirsCurrentSensitivity',
  'cirsPersistentMarks',
  'cirsRecentIrritation',
];

const CIRS_APPLICABLE_PROCEDURES = new Set([
  'pigment',
  'lifting',
  'acne',
  'scar',
  'pore',
]);

export function isCirsApplicableProcedure(procedure?: string) {
  return (procedure || '')
    .split(',')
    .map((item) => item.trim())
    .some((item) => CIRS_APPLICABLE_PROCEDURES.has(item));
}

export function hasCompleteCirsResponses(data: Record<string, string | undefined>) {
  return CIRS_FIELDS.every((field) => data[field] === 'yes' || data[field] === 'no');
}

export function assessCollagenReadiness(data: SurveyFormData): CirsAssessment {
  const isComplete = hasCompleteCirsResponses(data);
  const hasAcuteLesion = data.cirsAcuteLesion === 'yes';
  const hasCurrentSensitivity = data.cirsCurrentSensitivity === 'yes';
  const hasPersistentMarks = data.cirsPersistentMarks === 'yes';
  const hasRecentIrritation = data.cirsRecentIrritation === 'yes';

  const redFlags = hasAcuteLesion
    ? ['진물, 고름, 물집, 상처 또는 통증성 피부염']
    : [];
  const cautionSignals = [
    hasCurrentSensitivity ? '최근 지속되는 따가움, 붉음, 가려움 또는 각질' : '',
    hasPersistentMarks ? '붉거나 갈색인 자국이 오래 남는 경향' : '',
    hasRecentIrritation ? '최근 7일 이내 피부 자극' : '',
  ].filter(Boolean);
  const reasons = [...redFlags, ...cautionSignals];

  if (!isComplete) {
    return {
      grade: 'Yellow',
      label: '피부 회복력 확인 필요',
      isComplete,
      redFlags,
      cautionSignals,
      reasons: reasons.length > 0 ? reasons : ['피부 회복력 문진 미작성'],
      patientMessage:
        '피부 회복력 문진이 충분하지 않아 자극 시술 가능 여부를 바로 판단하기 어렵습니다.',
      strategy:
        '현재 급성 병변, 피부 민감 반응, 색소침착 경향과 최근 피부 자극을 확인한 뒤 시술 여부를 정합니다.',
      shouldBlockAddOns: true,
    };
  }

  if (hasAcuteLesion) {
    return {
      grade: 'Red',
      label: '진료와 피부 안정화 우선',
      isComplete,
      redFlags,
      cautionSignals,
      reasons,
      patientMessage:
        '현재는 선택적인 자극 시술보다 피부 상태를 먼저 확인하고 안정시키는 단계입니다.',
      strategy:
        '감염이나 급성 피부염 여부를 확인하고 진정, 염증 조절과 피부 회복 후 시술을 재평가합니다.',
      shouldBlockAddOns: true,
    };
  }

  if (hasCurrentSensitivity || (hasPersistentMarks && hasRecentIrritation)) {
    return {
      grade: 'Yellow',
      label: '피부 안정화 후 시술 결정',
      isComplete,
      redFlags,
      cautionSignals,
      reasons,
      patientMessage:
        '현재 피부가 자극에 예민하거나 회복 부담이 겹쳐 있어 시술 전 피부 상태 확인이 필요합니다.',
      strategy:
        '강한 레이저, 박피, 니들링, RF와 같은 복합 자극은 바로 진행하지 않고 피부 안정화 후 강도와 범위를 결정합니다.',
      shouldBlockAddOns: true,
    };
  }

  if (hasPersistentMarks || hasRecentIrritation) {
    return {
      grade: 'Green',
      label: '보수적으로 시작',
      isComplete,
      redFlags,
      cautionSignals,
      reasons,
      patientMessage:
        '현재 급성 위험 신호는 없지만 색소침착이나 최근 자극 이력을 고려한 시술 계획이 필요합니다.',
      strategy:
        '첫 시술은 검증된 보수적 설정과 제한된 자극으로 시작하고, 같은 날 여러 자극을 겹칠지는 의료진이 판단합니다.',
      shouldBlockAddOns: false,
    };
  }

  return {
    grade: 'Green',
    label: '일반적인 시술 평가 가능',
    isComplete,
    redFlags,
    cautionSignals,
    reasons,
    patientMessage:
      '현재 문진에서 피부 회복을 방해할 뚜렷한 위험 신호는 확인되지 않았습니다.',
    strategy:
      '시술별 금기사항과 의료진 진찰을 확인한 뒤 피부 상태와 목표에 맞춰 시술 계획을 정합니다.',
    shouldBlockAddOns: false,
  };
}
