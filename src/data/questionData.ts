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
    id: 'pigment',
    name: '색소',
    nameEn: 'Pigmentation',
    icon: '✨',
    description: '기미/잡티 정밀 진단 및 치료',
    color: '#f59e0b',
  },
  {
    id: 'lifting',
    name: '리프팅 및 콜라겐부스터',
    nameEn: 'Lifting',
    icon: '🌟',
    description: '피부 탄력 및 처짐 개선',
    color: '#10b981',
  },
  {
    id: 'acne',
    name: '여드름',
    nameEn: 'Acne',
    icon: '🌿',
    description: '여드름 진단 및 맞춤 치료',
    color: '#8b5cf6',
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
    id: 'patientGender',
    category: '기본 정보',
    text: '성별을 선택해 주세요.',
    type: 'radio',
    options: [
      { label: '남성', value: '남성' },
      { label: '여성', value: '여성' },
    ],
    required: true,
  },
  {
    id: 'patientPhoneLast',
    category: '기본 정보',
    text: '전화번호 뒷자리 4자리를 입력해 주세요.',
    subtext: '동명이인 구분을 위해 사용됩니다.',
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
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
    options: [
      { label: '이마', value: '이마' },
      { label: '미간', value: '미간' },
      { label: '눈가', value: '눈가' },
      { label: '턱(사각턱)', value: '사각턱' },
      { label: '승모근(어깨)', value: '승모근' },
      { label: '종아리', value: '종아리' },
      { label: '기타', value: '기타' },
    ],
    required: true,
  },
  {
    id: 'botoxResistanceProduct',
    category: '보톡스',
    text: '내성이 생긴(또는 의심되는) 보톡스 제품명을 알고 계시다면 적어주세요.',
    type: 'text',
    required: false,
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
    id: 'fillerLastDate',
    category: '필러',
    text: '마지막 필러 시술을 받으신 날짜를 입력해 주세요.',
    subtext: '예: 2024년 3월 / 약 6개월 전 등',
    type: 'text',
    required: false,
  },
  {
    id: 'fillerLastArea',
    category: '필러',
    text: '마지막에 시술받으신 부위를 입력해 주세요.',
    subtext: '예: 코, 팔자주름, 입술 등',
    type: 'text',
    required: false,
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

export const commonLaserLiftingQuestions: Question[] = [
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

export const photoGuideQuestions: Question[] = [
  {
    id: 'photoGuide1',
    category: '촬영 안내',
    text: '현재 화장기 없는 생얼 상태인가요?',
    type: 'yesno',
    required: true,
  }
];

export const pigmentQuestions: Question[] = [
  {
    id: 'pigmentStart',
    category: '색소',
    text: '가장 고민되는 색소(기미/잡티)가 언제부터 눈에 띄기 시작했나요?',
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
    options: [
      { label: '최근 1달 이내', value: '1달 이내' },
      { label: '최근 6개월 이내', value: '6개월 이내' },
      { label: '1년 이상(만성)', value: '1년 이상' },
      { label: '어릴 때부터', value: '어릴 때부터' },
    ],
    required: true,
  },
  {
    id: 'pigmentUv',
    category: '색소',
    text: '평소 외부 활동 시간과 선크림 사용 습관은 어떠신가요?',
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
    options: [
      { label: '야외 활동 많음 / 선크림 잘 안 바름 (-)', value: '야외 활동 많음 / 선크림 미사용' },
      { label: '야외 활동 많음 / 선크림 매일 바름', value: '야외 활동 많음 / 선크림 사용' },
      { label: '실내 위주 생활 / 선크림 잘 안 바름', value: '실내 위주 생활 / 선크림 미사용' },
      { label: '실내 위주 생활 / 선크림 매일 바름 (+)', value: '실내 위주 생활 / 선크림 사용' },
    ],
    required: true,
  },
  {
    id: 'pigmentType',
    category: '색소',
    text: '현재 색소 병변의 특징을 가장 잘 설명하는 것을 모두 선택해 주세요.',
    subtext: '기미와 주근깨/잡티를 구분하는 참고 자료로 사용됩니다.',
    type: 'checkbox',
    options: [
      { label: '광대뼈 주위로 넓고 옅게 퍼져 있음 (기미 의심)', value: '대칭형 넓은 기미' },
      { label: '갈색 점처럼 작고 뚜렷하게 군데군데 있음', value: '뚜렷한 잡티/주근깨' },
      { label: '여드름이나 상처가 아문 후 남은 색소침착', value: '염증 후 색소침착(PIH)' },
      { label: '잘 모르겠음 (원장님 진단 필요)', value: '진단 필요' },
    ],
    required: true,
  },
  ...commonLaserLiftingQuestions
];

export const liftingQuestions: Question[] = [
  {
    id: 'liftingSleepHabit',
    category: '리프팅',
    text: '평소 가장 자주 취하는 수면 자세를 선택해 주세요.',
    subtext: '(중복 선택 가능) 수면 중 눌리는 방향은 안면 비대칭 및 처짐(Anti-Gravity 지수)에 영향을 줍니다.',
    type: 'checkbox',
    options: [
      { label: '천장을 보고 똑바로 누움', value: '똑바로 누움' },
      { label: '주로 오른쪽으로 돌아누움', value: '우측 누움' },
      { label: '주로 왼쪽으로 돌아누움', value: '좌측 누움' },
      { label: '엎드려 잠', value: '엎드려 잠' },
    ],
    required: true,
  },
  {
    id: 'liftingArea',
    category: '리프팅',
    text: '집중적으로 리프팅을 원하는 부위를 선택해 주세요.',
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
    options: [
      { label: '얼굴 전체', value: '얼굴 전체' },
      { label: '심부볼(불독살)', value: '심부볼' },
      { label: '이중턱/턱라인', value: '이중턱/턱라인' },
      { label: '팔자주름', value: '팔자주름' },
      { label: '눈가/이마', value: '눈가/이마' },
      { label: '목주름', value: '목주름' },
      { label: '기타', value: '기타' },
    ],
    required: true,
  },
  ...commonLaserLiftingQuestions
];

export const acneQuestions: Question[] = [
  {
    id: 'acneIsotretinoin',
    category: '여드름',
    text: '최근 6개월 이내 이소트레티노인(아큐테인, 로아큐탄 등)을 복용한 적이 있나요?',
    subtext: '피부 재생 속도와 레이저 치료 방식 결정에 필수적인 정보입니다.',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '건조함 주의 (최근 6개월 내 이소트레티노인 복용 이력)',
    required: true,
  },
  {
    id: 'acneType',
    category: '여드름',
    text: '현재 가장 고민되는 여드름/자국 형태를 모두 선택해 주세요.',
    subtext: '(중복 선택 가능) 본인의 피부 상태에 가장 가까운 것을 모두 골라주세요.',
    type: 'checkbox',
    options: [
      { label: '붉은 자국 (PIE: 염증 후 홍반)', value: '붉은 자국(PIE)' },
      { label: '검고 칙칙한 자국 (PIH: 염증 후 색소침착)', value: '검고 칙칙한 자국(PIH)' },
      { label: '패인 흉터 (송곳형, 박스형, 롤링형 등)', value: '패인 흉터' },
      { label: '화농성 여드름 (노란/하얀 고름)', value: '화농성 여드름' },
      { label: '좁쌀 여드름 (화이트헤드/블랙헤드)', value: '좁쌀 여드름' },
      { label: '기타', value: '기타' },
    ],
    required: true,
  },
  {
    id: 'acneLifestyle',
    category: '여드름',
    text: '현재 해당되는 생활 습관 요인이 있다면 모두 선택해 주세요.',
    subtext: '(중복 선택 가능) 여드름 발생 및 악화의 주요 원인이 될 수 있습니다.',
    type: 'checkbox',
    options: [
      { label: '유제품 또는 고당분 식품 자주 섭취', value: '유제품/고당분 섭취' },
      { label: '단백질 보충제(유청 등) 복용', value: '단백질 보충제 복용' },
      { label: '과도한 스트레스', value: '과도한 스트레스' },
      { label: '수면 부족 또는 불규칙한 수면', value: '수면 부족/불규칙' },
      { label: '해당 사항 없음', value: '해당 없음' },
    ],
    required: true,
  },
  {
    id: 'acneHormone',
    category: '여드름',
    text: '[여성 전용] 생리 주기에 따라 여드름이 심하게 악화되거나, 다낭성 난소 증후군(PCOS) 등 호르몬 질환을 진단받은 적이 있나요?',
    subtext: '남성 고객님은 "아니오"를 선택해 주세요.',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '호르몬 요인 의심 (생리 주기 악화 및 PCOS)',
    required: true,
  },
  {
    id: 'acneTreatmentPreference',
    category: '여드름',
    text: '주로 희망하시는 여드름 치료 방향을 선택해 주세요.',
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
    options: [
      { label: '먹는 약 / 바르는 약 처방 위주', value: '약 처방 위주' },
      { label: '여드름 압출 및 스킨케어 관리', value: '압출/스킨케어 관리' },
      { label: '레이저 등 적극적인 시술', value: '적극적인 시술(레이저 등)' },
      { label: '원장님 상담 후 결정', value: '상담 후 결정' },
    ],
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
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
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
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
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

export function getStepsForProcedure(procedure: string, skipCommon: boolean = false): SurveyStep[] {
  const steps: SurveyStep[] = [];

  if (!skipCommon) {
    steps.push({
      title: '기본 건강 정보',
      subtitle: '안전한 시술을 위한 기본 확인사항입니다',
      questions: commonQuestions,
    });
  }

  const proceduresArray = procedure.split(',').map(p => p.trim());

  proceduresArray.forEach(proc => {
    switch (proc) {
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
      case 'pigment':
        steps.push({
          title: '색소 시술 관련',
          subtitle: '색소(기미/잡티) 진단에 꼭 필요한 정보입니다',
          questions: pigmentQuestions,
        });
        break;
      case 'lifting':
        steps.push({
          title: '리프팅 및 콜라겐부스터 관련',
          subtitle: '리프팅 및 부스터 시술에 필요한 추가 정보입니다',
          questions: liftingQuestions,
        });
        break;
      case 'acne':
        steps.push({
          title: '여드름 집중 문진',
          subtitle: '여드름의 원인 분석 및 맞춤 치료를 위한 추가 정보입니다',
          questions: acneQuestions,
        });
        break;
    }
  });

  if (!skipCommon) {
    steps.push({
      title: '피부 상태 확인 및 사진 가이드',
      subtitle: '정확한 진단을 위한 피부 정보와 촬영 전 체크리스트입니다',
      questions: [...skinStatusQuestions, ...photoGuideQuestions],
    });
  }

  return steps;
}
