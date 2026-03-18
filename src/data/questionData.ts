import { ProcedureInfo, Question, SurveyStep } from '@/types/types';

export const procedures: ProcedureInfo[] = [
  {
    id: 'botox',
    name: '보톡스',
    nameEn: 'Botox',
    icon: '💉',
    description: '주름 개선 및 근육 이완',
    color: '#6366f1',
  },
  {
    id: 'filler',
    name: '필러',
    nameEn: 'Filler',
    icon: '✨',
    description: '볼륨 개선 및 윤곽 보정',
    color: '#ec4899',
  },
  {
    id: 'laser',
    name: '레이저',
    nameEn: 'Laser',
    icon: '🔬',
    description: '피부 재생 및 색소 치료',
    color: '#f59e0b',
  },
  {
    id: 'lifting',
    name: '리프팅',
    nameEn: 'Lifting',
    icon: '🌟',
    description: '피부 탄력 및 처짐 개선',
    color: '#10b981',
  },
];

export const commonQuestions: Question[] = [
  {
    id: 'patientName',
    category: '기본 정보',
    text: '이름을 입력해 주세요.',
    type: 'text',
    required: true,
  },
  {
    id: 'pregnancy',
    category: '공통',
    text: '현재 임신 중이거나 수유 중이신가요?',
    subtext: '임신/수유 중에는 일부 시술이 제한될 수 있습니다.',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '임신/수유 중',
    required: true,
  },
  {
    id: 'medications',
    category: '공통',
    text: '현재 복용 중인 약물이 있으신가요?',
    subtext: '아스피린, 항응고제, 혈액순환제 등',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '약물 복용 중',
    required: true,
  },
  {
    id: 'medicationDetail',
    category: '공통',
    text: '복용 중인 약물명을 입력해 주세요.',
    type: 'text',
    required: false,
  },
  {
    id: 'allergyLidocaine',
    category: '공통',
    text: '리도카인(마취제) 알레르기가 있으신가요?',
    subtext: '마취 시 사용되는 성분입니다.',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '리도카인 알레르기 있음!!',
    required: true,
  },
  {
    id: 'allergyMetal',
    category: '공통',
    text: '금속 알레르기가 있으신가요?',
    subtext: '니켈, 크롬 등 금속 성분에 대한 알레르기',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '금속 알레르기 있음',
    required: true,
  },
  {
    id: 'allergyOther',
    category: '공통',
    text: '그 외 알레르기가 있으신가요?',
    type: 'yesno',
    required: false,
  },
  {
    id: 'allergyDetail',
    category: '공통',
    text: '알레르기 상세 내용을 입력해 주세요.',
    type: 'text',
    required: false,
  },
];

export const botoxQuestions: Question[] = [
  {
    id: 'botoxRecent',
    category: '보톡스',
    text: '최근 6개월 이내 보톡스 시술을 받으신 적이 있나요?',
    subtext: '시술 간격에 따라 효과와 안전성이 달라질 수 있습니다.',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '최근 6개월 내 보톡스 시술 이력',
    required: true,
  },
  {
    id: 'botoxResistance',
    category: '보톡스',
    text: '이전 보톡스 시술 후 효과가 빨리 사라지거나 내성이 생긴 경험이 있나요?',
    subtext: '보톡스 내성이 의심되는 경우 제품 변경이 필요할 수 있습니다.',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '보톡스 내성 의심',
    required: true,
  },
  {
    id: 'botoxArea',
    category: '보톡스',
    text: '시술 희망 부위를 선택해 주세요.',
    type: 'radio',
    options: [
      { label: '이마/미간', value: '이마/미간' },
      { label: '눈가(까마귀발)', value: '눈가' },
      { label: '턱(사각턱)', value: '사각턱' },
      { label: '승모근(어깨)', value: '승모근' },
      { label: '종아리', value: '종아리' },
      { label: '기타', value: '기타' },
    ],
    required: true,
  },
  {
    id: 'botoxPreviousClinic',
    category: '보톡스',
    text: '이전 시술받으신 병원명이 있다면 입력해 주세요.',
    type: 'text',
    required: false,
  },
];

export const fillerQuestions: Question[] = [
  {
    id: 'fillerPrevious',
    category: '필러',
    text: '이전에 필러 시술을 받으신 적이 있나요?',
    subtext: '기존 필러가 남아있는 경우 시술 계획이 달라질 수 있습니다.',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '기존 필러 시술 이력 있음',
    required: true,
  },
  {
    id: 'fillerNodule',
    category: '필러',
    text: '필러 시술 후 결절(덩어리)이 만져진 경험이 있나요?',
    subtext: '결절이 있는 경우 녹이는 시술이 선행될 수 있습니다.',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '필러 후 결절 경험',
    required: true,
  },
  {
    id: 'fillerInflammation',
    category: '필러',
    text: '필러 시술 후 염증이나 부종이 오래 지속된 경험이 있나요?',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '필러 후 염증/부종 경험',
    required: true,
  },
  {
    id: 'fillerArea',
    category: '필러',
    text: '시술 희망 부위를 선택해 주세요.',
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
    options: [
      { label: '이마/관자놀이', value: '이마/관자놀이' },
      { label: '코', value: '코' },
      { label: '팔자주름', value: '팔자주름' },
      { label: '입술', value: '입술' },
      { label: '턱/턱끝', value: '턱/턱끝' },
      { label: '볼', value: '볼' },
      { label: '기타', value: '기타' },
    ],
    required: true,
  },
];

export const laserLiftingQuestions: Question[] = [
  {
    id: 'metalImplant',
    category: '레이저/리프팅',
    text: '체내에 금속 임플란트가 있으신가요?',
    subtext: '치아 임플란트, 인공관절, 금속 보형물 등',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '체내 금속 임플란트 있음',
    required: true,
  },
  {
    id: 'metalImplantDetail',
    category: '레이저/리프팅',
    text: '임플란트 위치를 입력해 주세요.',
    subtext: '예: 오른쪽 어깨 인공관절, 치아 임플란트 2개 등',
    type: 'text',
    required: false,
  },
  {
    id: 'keloid',
    category: '레이저/리프팅',
    text: '켈로이드 체질이신가요?',
    subtext: '상처가 아문 후 흉터가 과도하게 자라는 체질',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '켈로이드 체질',
    required: true,
  },
  {
    id: 'recentSunExposure',
    category: '레이저/리프팅',
    text: '최근 2주 이내 강한 자외선에 노출되었나요?',
    subtext: '선번이나 과도한 일광욕 포함',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '최근 자외선 과다 노출',
    required: true,
  },
];

export const bddqQuestions: Question[] = [
  {
    id: 'bddq1',
    category: '외모 고민 확인',
    text: '외모의 특정 부분이 마음에 들지 않아 자주 고민하시나요?',
    subtext: '솔직한 고객님의 생각을 알려주시면 맞춤 상담에 큰 도움이 됩니다.',
    type: 'radio',
    options: [
      { label: '전혀 그렇지 않다', value: '0' },
      { label: '가끔 그렇다', value: '1' },
      { label: '자주 그렇다', value: '2' },
      { label: '매우 자주 그렇다', value: '3' },
    ],
    required: true,
  },
  {
    id: 'bddq2',
    category: '외모 고민 확인',
    text: '외모에 대한 걱정으로 일상생활(직장, 학교, 사회활동)에 지장을 받으시나요?',
    type: 'radio',
    options: [
      { label: '전혀 그렇지 않다', value: '0' },
      { label: '약간 그렇다', value: '1' },
      { label: '상당히 그렇다', value: '2' },
      { label: '매우 심하다', value: '3' },
    ],
    required: true,
  },
  {
    id: 'bddq3',
    category: '외모 고민 확인',
    text: '하루에 거울을 확인하거나 외모를 점검하는 데 얼마나 시간을 쓰시나요?',
    type: 'radio',
    options: [
      { label: '거의 안 본다', value: '0' },
      { label: '30분 미만', value: '1' },
      { label: '1~3시간', value: '2' },
      { label: '3시간 이상', value: '3' },
    ],
    required: true,
  },
  {
    id: 'bddq4',
    category: '외모 고민 확인',
    text: '외모 때문에 사람들을 만나는 것을 피하거나 외출을 꺼리시나요?',
    type: 'radio',
    options: [
      { label: '전혀 그렇지 않다', value: '0' },
      { label: '가끔 그렇다', value: '1' },
      { label: '자주 그렇다', value: '2' },
      { label: '거의 항상 그렇다', value: '3' },
    ],
    required: true,
  },
];

export const skinStatusQuestions: Question[] = [
  {
    id: 'skinType',
    category: '피부상태',
    text: '본인의 피부 타입을 선택해 주세요.',
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
    options: [
      { label: '얇고 예민한 피부', value: '얇고 예민한 피부' },
      { label: '보통 피부', value: '보통 피부' },
      { label: '두꺼운 피부', value: '두꺼운 피부' },
      { label: '지성/여드름성 피부', value: '지성/여드름성 피부' },
      { label: '건성 피부', value: '건성 피부' },
    ],
    required: true,
  },
  {
    id: 'painSensitivity',
    category: '피부상태',
    text: '통증에 대한 민감도는 어느 정도인가요?',
    type: 'radio',
    options: [
      { label: '민감하지 않음', value: '민감하지 않음' },
      { label: '보통', value: '보통' },
      { label: '민감함', value: '높음' },
      { label: '매우 민감함', value: '매우 높음' },
    ],
    required: true,
  },
  {
    id: 'skinConcerns',
    category: '피부상태',
    text: '현재 가장 고민되는 피부 문제를 선택해 주세요.',
    type: 'radio',
    options: [
      { label: '주름/탄력 저하', value: '주름/탄력' },
      { label: '색소침착/기미', value: '색소/기미' },
      { label: '모공/피부결', value: '모공/피부결' },
      { label: '처짐/볼륨 감소', value: '처짐/볼륨' },
      { label: '흉터/여드름 자국', value: '흉터/여드름' },
    ],
    required: true,
  },
  {
    id: 'additionalNotes',
    category: '추가사항',
    text: '상담 시 전달하고 싶은 추가사항이 있으시면 자유롭게 작성해 주세요.',
    type: 'text',
    required: false,
  },
];

export function getStepsForProcedure(procedure: string): SurveyStep[] {
  const steps: SurveyStep[] = [
    {
      title: '기본 건강 정보',
      subtitle: '안전한 시술을 위한 기본 확인사항입니다',
      questions: commonQuestions,
    },
  ];

  switch (procedure) {
    case 'botox':
      steps.push({
        title: '보톡스 시술 관련',
        subtitle: '보톡스 시술에 필요한 추가 정보입니다',
        questions: botoxQuestions,
      });
      break;
    case 'filler':
      steps.push({
        title: '필러 시술 관련',
        subtitle: '필러 시술에 필요한 추가 정보입니다',
        questions: fillerQuestions,
      });
      break;
    case 'laser':
    case 'lifting':
      steps.push({
        title: '레이저/리프팅 시술 관련',
        subtitle: '레이저/리프팅 시술에 필요한 추가 정보입니다',
        questions: laserLiftingQuestions,
      });
      break;
  }

  steps.push({
    title: '외모 고민 설문',
    subtitle: '시술 만족도를 높이기 위해 고객님의 평소 생각을 여쭤봅니다',
    questions: bddqQuestions,
  });

  steps.push({
    title: '피부 상태 확인',
    subtitle: '맞춤 상담을 위한 피부 정보입니다',
    questions: skinStatusQuestions,
  });

  return steps;
}
