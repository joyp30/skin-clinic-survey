import { SurveyFormData } from '@/types/types';

export type CirsGrade = 'Green' | 'Yellow' | 'Red';

type CirsField =
  | 'cirsErythemaHeat'
  | 'cirsStingingItching'
  | 'cirsDrynessFlaking'
  | 'cirsPihTendency'
  | 'cirsRecoveryDelay'
  | 'cirsInflammatoryLesions'
  | 'cirsSystemicBurden';

interface CirsScoreItem {
  id: CirsField;
  label: string;
  score: number;
}

export interface CirsAssessment {
  totalScore: number;
  grade: CirsGrade;
  label: string;
  isComplete: boolean;
  scoreItems: CirsScoreItem[];
  redFlags: string[];
  sensitiveSignals: string[];
  reasons: string[];
  patientMessage: string;
  strategy: string;
  shouldBlockAddOns: boolean;
}

const SCORE_FIELDS: Array<{ id: CirsField; label: string }> = [
  { id: 'cirsErythemaHeat', label: '홍반/열감' },
  { id: 'cirsStingingItching', label: '따가움/가려움' },
  { id: 'cirsDrynessFlaking', label: '건조/각질' },
  { id: 'cirsPihTendency', label: 'PIH 경향' },
  { id: 'cirsRecoveryDelay', label: '시술 후 회복' },
  { id: 'cirsInflammatoryLesions', label: '염증성 병변' },
  { id: 'cirsSystemicBurden', label: '전신 회복력 부담' },
];

const CIRS_APPLICABLE_PROCEDURES = new Set([
  'pigment',
  'lifting',
  'acne',
  'scar',
  'pore',
]);

const CONTRA_LABELS: Record<string, string> = {
  infection: '감염 의심/농포/진물/crust',
  acuteDermatitis: '급성 피부염/통증성 병변',
  sunburnPeeling: '선번 또는 박피 직후',
  rosaceaFlare: '주사 flare/뚜렷한 열감',
  activeAcne: '활동성 여드름 과다',
  strongHomecare: '최근 강한 홈케어 자극',
};

const splitValues = (value?: string) =>
  (value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const parseScore = (value?: string) => {
  const score = Number.parseInt(value || '0', 10);
  return Number.isFinite(score) ? score : 0;
};

const includesAny = (value: string | undefined, needles: string[]) =>
  needles.some((needle) => (value || '').includes(needle));

export function isCirsApplicableProcedure(procedure?: string) {
  return (procedure || '')
    .split(',')
    .map((item) => item.trim())
    .some((item) => CIRS_APPLICABLE_PROCEDURES.has(item));
}

export function hasCompleteCirsResponses(data: Record<string, string | undefined>) {
  return Boolean(data.cirsContraindications) && SCORE_FIELDS.every(({ id }) => data[id] !== undefined && data[id] !== '');
}

export function assessCollagenReadiness(data: SurveyFormData): CirsAssessment {
  const scoreItems = SCORE_FIELDS.map(({ id, label }) => ({
    id,
    label,
    score: parseScore(data[id]),
  }));
  const isComplete = hasCompleteCirsResponses(data);

  const totalScore = scoreItems.reduce((sum, item) => sum + item.score, 0);
  const redFlags = splitValues(data.cirsContraindications)
    .filter((value) => value !== 'none')
    .map((value) => CONTRA_LABELS[value] || value);

  let grade: CirsGrade = 'Green';
  if (redFlags.length > 0 || totalScore >= 8) {
    grade = 'Red';
  } else if (totalScore >= 4) {
    grade = 'Yellow';
  }

  const sensitiveSignals: string[] = [];
  if (includesAny(data.skinType, ['얇고 예민한 피부', '건성 피부'])) {
    sensitiveSignals.push('얇고 예민하거나 건조한 피부');
  }
  if (includesAny(data.painSensitivity, ['높음', '매우 높음'])) {
    sensitiveSignals.push('통증/자극 민감도 높음');
  }
  scoreItems
    .filter((item) => item.score >= 2)
    .forEach((item) => sensitiveSignals.push(`${item.label} 뚜렷`));

  const reasons = [
    ...redFlags,
    ...scoreItems
      .filter((item) => item.score > 0)
      .map((item) => `${item.label} ${item.score}점`),
    ...sensitiveSignals,
  ];

  if (!isComplete) {
    return {
      totalScore,
      grade: 'Yellow',
      label: 'CIRS 미작성 - 피부 회복력 확인 필요',
      isComplete,
      scoreItems,
      redFlags,
      sensitiveSignals,
      reasons: reasons.length > 0 ? reasons : ['CIRS 문진 미작성'],
      patientMessage:
        '피부 회복력 문진이 아직 충분하지 않아 자극 시술 가능 여부를 바로 판단하기 어렵습니다.',
      strategy:
        '홍반, 따가움, 건조, PIH, 회복 지연, 염증성 병변, 전신 회복력 부담을 확인한 뒤 시술 강도와 순서를 정합니다.',
      shouldBlockAddOns: true,
    };
  }

  if (grade === 'Red') {
    return {
      totalScore,
      grade,
      label: 'Red - 안정화 우선',
      isComplete,
      scoreItems,
      redFlags,
      sensitiveSignals,
      reasons,
      patientMessage:
        '지금은 콜라겐을 만들도록 세게 자극하기보다, 먼저 피부가 자극을 견딜 수 있는 상태로 회복시키는 단계입니다.',
      strategy:
        '진정, 보습, 광보호, 염증 조절 후 재평가합니다. 강한 RF, 박피, 고출력 레이저, 공격적 니들링, 같은 날 다중 자극은 보류합니다.',
      shouldBlockAddOns: true,
    };
  }

  if (grade === 'Yellow') {
    return {
      totalScore,
      grade,
      label: 'Yellow - 전처치 후 저강도',
      isComplete,
      scoreItems,
      redFlags,
      sensitiveSignals,
      reasons,
      patientMessage:
        '피부가 완전히 나쁜 상태는 아니지만 불안정 요소가 있어 강도를 낮추고 간격을 길게 잡는 것이 안전합니다.',
      strategy:
        '2-4주 장벽 안정화와 pre-conditioning 후 낮은 강도, 작은 면적, 긴 간격, test spot 중심으로 접근합니다.',
      shouldBlockAddOns: true,
    };
  }

  return {
    totalScore,
    grade,
    label: 'Green - 단계적 collagen induction 가능',
    isComplete,
    scoreItems,
    redFlags,
    sensitiveSignals,
    reasons,
    patientMessage:
      '장벽과 염증이 비교적 안정되어 있어 탄력과 피부결 개선을 위한 collagen induction 시술을 단계적으로 진행할 수 있습니다.',
    strategy:
      '목표에 맞춰 RF microneedling, fractional, HIFU/RF, collagen booster, PN/HA를 단계적으로 계획합니다.',
    shouldBlockAddOns: sensitiveSignals.length >= 2,
  };
}
