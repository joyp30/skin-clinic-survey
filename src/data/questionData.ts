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
  {
    id: 'scar',
    name: '흉터',
    nameEn: 'Scar',
    icon: '🩹',
    description: '흉터 정밀 진단 빛 맞춤 치료',
    color: '#ef4444',
  },
  {
    id: 'pore',
    name: '모공 집중 케어',
    nameEn: 'Pores',
    icon: '🔍',
    description: '모공 원인 분석 및 피부결 개선',
    color: '#0ea5e9',
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
      { label: '잘 모르겠음', value: '잘 모르겠음' },
    ],
    required: true,
  },
  {
    id: 'botoxRecentPlace',
    category: '보톡스',
    text: '이전 보톡스 시술은 어디에서 받으셨나요?',
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
    options: [
      { label: '본원 (CS피부과)', value: '본원' },
      { label: '타 병원', value: '타병원' },
    ],
    required: false,
  },
  {
    id: 'botoxRecentArea',
    category: '보톡스',
    text: '최근 6개월 이내 보톡스 시술 받으신 부위를 입력해 주세요.',
    subtext: '예: 이마, 미간, 사각턱 등',
    type: 'text',
    required: false,
  },
  {
    id: 'botoxResistanceProduct',
    category: '보톡스',
    text: '내성이 생긴(또는 의심되는) 보톡스 제품명을 알고 계시다면 적어주세요.',
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
    id: 'fillerPreviousPlace',
    category: '필러',
    text: '이전 필러 시술은 어디에서 받으셨나요?',
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
    options: [
      { label: '본원 (CS피부과)', value: '본원' },
      { label: '타 병원', value: '타병원' },
    ],
    required: false,
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
      { label: '잘 모르겠음', value: '잘 모르겠음' },
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
      { label: '잘 모르겠음', value: '잘 모르겠음' },
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
    id: 'pigmentSunscreenCount',
    category: '색소',
    text: '선크림을 사용하시는 경우, 하루에 대략 몇 번 정도 덧바르시나요?',
    subtext: '자외선 차단제의 지속 시간은 한정적이므로 덧바르는 습관이 중요합니다.',
    type: 'radio',
    options: [
      { label: '사용하지 않음', value: '0번' },
      { label: '외출 전 1번 바름', value: '1번' },
      { label: '하루 2~3번 덧바름', value: '2~3번' },
      { label: '수시로 덧바름', value: '수시로 자주' },
    ],
    required: true,
  },
  {
    id: 'pigmentMakeup',
    category: '색소',
    text: '평소 외출 시 화장(베이스)은 어느 정도로 하시나요?',
    subtext: '화장 두께에 따른 자외선 차단 정도를 파악하기 위함입니다.',
    type: 'radio',
    options: [
      { label: '스킨케어만 (선크림/화장 안함)', value: '스킨케어만' },
      { label: '선크림(또는 무색 선쿠션)까지만', value: '선크림만' },
      { label: '선크림 + BB크림/톤업 가볍게', value: '선크림+BB' },
      { label: '파운데이션/쿠션으로 커버', value: '파운데이션' },
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
      { label: '잘 모르겠음', value: '잘 모르겠음' },
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
      { label: '잘 모르겠음', value: '잘 모르겠음' },
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
      { label: '잘 모르겠음', value: '잘 모르겠음' },
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
      { label: '잘 모르겠음', value: '잘 모르겠음' },
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
      { label: '잘 모르겠음', value: '잘 모르겠음' },
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

export function getStepsForProcedure(procedure: string, skipCommon: boolean = false, formValues?: Record<string, any>): SurveyStep[] {
  const steps: SurveyStep[] = [];

  if (!skipCommon) {
    steps.push({
      title: '기본 건강 정보',
      subtitle: '안전한 시술을 위한 기본 확인사항입니다',
      questions: commonQuestions,
    });
  }

  const proceduresArray = procedure.split(',').map(p => p.trim());

  let hasScar = false;
  let hasPore = false;

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
      case 'scar':
        hasScar = true;
        break;
      case 'pore':
        hasPore = true;
        break;
    }
  });

  // Handle pore dynamic logic separately
  if (hasPore) {
    steps.push({
      title: '모공 집중 정보 (1/3)',
      subtitle: '환자분께서 느끼는 모공의 가장 큰 특징을 선택해 주세요',
      questions: [{
        id: 'poreCause',
        category: '모공',
        text: '현재 가장 신경 쓰이는 모공의 상태는 어떤가요?',
        subtext: '(중복 선택 가능)',
        type: 'checkbox',
        options: [
          { label: '💧 T존이 번들거리고 모공이 동그랗게 도드라짐 (유분 과다형)', value: '유분과다' },
          { label: '🍐 모공이 타원형이나 물방울 모양으로 아래로 처져 보임 (탄력 저하형)', value: '탄력저하' },
          { label: '🌑 모공 속에 블랙헤드/화이트헤드가 껴있고 요철이 느껴짐 (노폐물 적체형)', value: '노폐물적체' },
          { label: '잘 모르겠음 / 복합적임', value: '복합' },
        ],
        required: true,
      }]
    });

    if (formValues?.poreCause) {
      if (formValues.poreCause.includes('유분과다')) {
        steps.push({
          title: '유분 과다형 상세 분석',
          subtitle: '평소 관리 습관을 파악합니다',
          questions: [{
            id: 'poreOilyHabit',
            category: '모공',
            text: '평소 기름종이를 자주 사용하시거나, 뽀득뽀득하게 닦이는 세정력이 강한 클렌저를 주로 쓰시나요?',
            type: 'yesno',
            required: true,
          }]
        });
      }
      
      if (formValues.poreCause.includes('탄력저하')) {
         steps.push({
          title: '탄력 저하형 상세 분석',
          subtitle: '모공 늘어짐이 가장 심한 부위는 어디인가요?',
          questions: [{
            id: 'poreAgingArea',
            category: '모공',
            text: '어느 부위의 모공이 가장 길게 늘어져 보이나요?',
            subtext: '(중복 선택 가능)',
            type: 'checkbox',
            options: [
              { label: '코 옆 나비존', value: '나비존' },
              { label: '앞볼 전체', value: '앞볼' },
              { label: '턱 라인 주변', value: '턱주변' },
              { label: '이마', value: '이마' },
            ],
            required: true,
          }]
        });
      }
      
      if (formValues.poreCause.includes('노폐물적체') || formValues.poreCause.includes('복합')) {
        steps.push({
          title: '노폐물 적체형 상세 분석',
          subtitle: '모공 관리 습관을 확인합니다',
          questions: [{
            id: 'poreCloggedHabit',
            category: '모공',
            text: '블랙헤드나 피지를 손으로 직접 짜거나, 코팩 등 물리적으로 뽑아내는 방식을 자주 사용하시나요?',
            subtext: '무리한 자극 여부를 파악하기 위함입니다.',
            type: 'yesno',
            warningOn: 'yes',
            warningMessage: '피지 손으로 짜는 습관 (모공 영구 확장 위험)',
            popupMessage: '손으로 피지를 짜거나 자극적인 코팩을 사용하면, 표피에 미세한 상처가 생기고 모공 주변 콜라겐 섬유가 끊어져 모공이 영구적으로 넓어질 위험이 매우 높습니다! 오늘부터 절대 손대지 마시고 병원 관리를 받아주세요.',
            required: true,
          }]
        });
      }

      // Check leaf condition to show final common pore step
      const isPoreLeafReached = (
        (!formValues.poreCause.includes('유분과다') || formValues.poreOilyHabit) &&
        (!formValues.poreCause.includes('탄력저하') || formValues.poreAgingArea) &&
        (!(formValues.poreCause.includes('노폐물적체') || formValues.poreCause.includes('복합')) || formValues.poreCloggedHabit)
      );

      if (isPoreLeafReached) {
        steps.push({
          title: '공통 위험요인 확인 (3/3)',
          subtitle: '모공 시술에 영향을 줄 수 있는 요인입니다',
          questions: [
            {
              id: 'poreIsotretinoin',
              category: '모공',
              text: '최근 6개월 이내에 피지 조절제(이소트레티노인, 에이콘알, 로아큐탄 등)를 복용하신 적이 있나요?',
              subtext: '피부 건조 및 재생 속도 확인을 위한 필수 질문입니다.',
              type: 'yesno',
              warningOn: 'yes',
              warningMessage: '이소트레티노인 최근 6개월 내 복용',
              required: true,
            },
            {
              id: 'poreLaserPeeling',
              category: '모공',
              text: '최근 4주 내에 얼굴에 강한 레이저, 박피술(필링), 제모 시술을 받았거나 강한 자외선(태닝)에 노출된 적이 있나요?',
              type: 'yesno',
              warningOn: 'yes',
              warningMessage: '최근 4주 내 레이저/필링/태닝 이력',
              required: true,
            }
          ]
        });
      }
    }
  }

  // Handle scar dynamic logic separately to allow break checks
  if (hasScar) {
    steps.push({
      title: '흉터 기본 정보 (1/5)',
      subtitle: '흉터의 종류를 파악합니다',
      questions: [{
        id: 'scarCause',
        category: '흉터',
        text: '어떤 원인으로 생긴 흉터인가요?',
        subtext: '(중복 선택 가능)',
        type: 'checkbox',
        options: [
          { label: '여드름 흉터', value: '여드름' },
          { label: '상처 및 외상', value: '상처' },
          { label: '수술 흉터', value: '수술' },
          { label: '기타/잘 모르겠음', value: '기타' },
        ],
        required: true,
      }]
    });

    if (formValues?.scarCause) {
      steps.push({
        title: '흉터 기본 정보 (2/5)',
        subtitle: '발생 시기를 파악합니다',
        questions: [{
          id: 'scarDuration',
          category: '흉터',
          text: '해당 흉터가 생긴 지 얼마나 되었나요?',
          subtext: '(중복 선택 가능)',
          type: 'checkbox',
          options: [
            { label: '6개월 미만', value: '6개월 미만' },
            { label: '6개월 ~ 1년', value: '6개월~1년' },
            { label: '1년 이상', value: '1년 이상' },
          ],
          required: true,
        }]
      });

      if (formValues?.scarDuration) {
        if (formValues.scarCause === '여드름') {
          steps.push({
            title: '여드름 흉터 상세진단',
            subtitle: '가장 고민되는 흉터 1가지를 파악합니다',
            questions: [{
              id: 'scarAcneShape',
              category: '흉터',
              text: '환자분이 느끼시기에 어떤 형태의 흉터가 고민이신가요?',
              subtext: '아래 가이드를 참고하여 골라주세요. (중복 선택 가능)',
              type: 'checkbox',
              options: [
                { label: '🧊 송곳 모양(Icepick) - 좁고 깊게 패임', value: 'Icepick' },
                { label: '📦 박스 모양(Boxcar) - 경계 뚜렷, 넓게 패임', value: 'Boxcar' },
                { label: '🌊 완만한 굴곡(Rolling) - 피부가 울퉁불퉁', value: 'Rolling' },
                { label: '잘 모르겠음', value: '잘 모르겠음' },
              ],
              required: true,
            }]
          });

          if (formValues.scarAcneShape) {
            steps.push({
              title: '여드름 흉터 상세진단',
              subtitle: '현재 동반 증상 여부',
              questions: [{
                id: 'scarAcnePie',
                category: '흉터',
                text: '현재 흉터 부위에 붉은 자국이나 색소 침착 등이 동반되나요?',
                subtext: '(중복 선택 가능)',
                type: 'checkbox',
                options: [
                  { label: '현재 여드름이 계속 나고 있음', value: '여드름 진행중' },
                  { label: '붉은 자국이 심하게 있음', value: '붉은 자국' },
                  { label: '거뭇거뭇한 색소 침착 위주', value: '색소 침착' },
                  { label: '해당 없고 흉터만 파여 있음', value: '해당 없음' },
                ],
                required: true,
              }]
            });
          }
        }
        if (formValues.scarCause.includes('상처')) {
          steps.push({
            title: '상처/외상 흉터 상세진단',
            subtitle: '흉터 생성 원인 파악',
            questions: [{
              id: 'scarTraumaOrigin',
              category: '흉터',
              text: '상처가 난 과정을 선택해 주세요.',
              subtext: '(중복 선택 가능)',
              type: 'checkbox',
              options: [
                { label: '보통의 긁힘/찰과상', value: '찰과상' },
                { label: '화상으로 인한 상처', value: '화상' },
                { label: '날카로운 도구/물체에 베임', value: '베임' },
                { label: '기타/잘 모르겠음', value: '기타' },
              ],
              required: true,
            }]
          });

          if (formValues.scarTraumaOrigin) {
            steps.push({
              title: '상처/외상 흉터 표면',
              subtitle: '흉터 상태 파악',
              questions: [{
                id: 'scarTraumaStatus',
                category: '흉터',
                text: '현재 흉터 표면의 양상이 어떤가요?',
                subtext: '(중복 선택 가능)',
                type: 'checkbox',
                options: [
                  { label: '피부가 패이고 함몰됨', value: '함몰' },
                  { label: '살이 위로 튀어나오고 부풀어오름', value: '돌출' },
                  { label: '표면은 매끄럽지만 색만 다름', value: '색상 변화' },
                  { label: '복합적임', value: '복합' },
                ],
                required: true,
              }]
            });
          }
        }
        if (formValues.scarCause.includes('수술')) {
          steps.push({
            title: '수술 흉터 상세진단',
            subtitle: '수술의 종류 파악',
            questions: [{
              id: 'scarSurgicalType',
              category: '흉터',
              text: '어떤 수술로 인해 생긴 흉터인가요?',
              subtext: '(중복 선택 가능)',
              type: 'checkbox',
              options: [
                { label: '제왕절개', value: '제왕절개' },
                { label: '쌍꺼풀 등 소형 미용성형 수술', value: '미용성형' },
                { label: '일반 외과 수술 등 (큰 흉터)', value: '외과수술' },
                { label: '기타/잘 모르겠음', value: '기타' },
              ],
              required: true,
            }]
          });

          if (formValues.scarSurgicalType) {
            steps.push({
              title: '수술 흉터 관리 유무',
              subtitle: '현재 처치 상태 파악',
              questions: [{
                id: 'scarSurgicalCare',
                category: '흉터',
                text: '현재 흉터 연고나 테이프(스테리스트립) 등을 사용 중이신가요?',
                subtext: '(중복 선택 가능)',
                type: 'checkbox',
                options: [
                  { label: '네, 현재 지속적으로 관리 중입니다', value: '관리 중' },
                  { label: '아니오, 따로 관리하지 않습니다', value: '관리 안함' },
                ],
                required: true,
              }]
            });
          }
        }

        // Only show common POSAS and expectation if they have answered the leaf node
        const isLeafReached = (
          (!formValues.scarCause.includes('여드름') || formValues.scarAcnePie) &&
          (!formValues.scarCause.includes('상처') || formValues.scarTraumaStatus) &&
          (!formValues.scarCause.includes('수술') || formValues.scarSurgicalCare)
        );

        if (isLeafReached && formValues.scarCause.length > 0) {
          steps.push({
            title: '임상 평가 척도: 통증 (3/5)',
            subtitle: 'POSAS 기준 통증 (1~5점)',
            questions: [{
              id: 'scarPosasPain',
              category: '흉터',
              text: '현재 흉터 부위에 통증이 있나요?',
              subtext: '(중복 선택 가능)',
              type: 'checkbox',
              options: [
                { label: '1단계 - 전혀 아프지 않음', value: '1' },
                { label: '2단계 - 아주 약간 아픔', value: '2' },
                { label: '3단계 - 보통 수준의 통증', value: '3' },
                { label: '4단계 - 자주 아프고 꽤 불편함', value: '4' },
                { label: '5단계 - 심각한 통증 때문에 괴로움', value: '5' },
              ],
              required: true,
            }]
          });

          if (formValues.scarPosasPain) {
            steps.push({
              title: '임상 평가 척도: 가려움 (4/5)',
              subtitle: 'POSAS 기준 가려움 (1~5점)',
              questions: [{
                id: 'scarPosasItch',
                category: '흉터',
                text: '현재 흉터 부위가 가려우신가요?',
                subtext: '(중복 선택 가능)',
                type: 'checkbox',
                options: [
                  { label: '1단계 - 전혀 가렵지 않음', value: '1' },
                  { label: '2단계 - 아주 약간 간지러움', value: '2' },
                  { label: '3단계 - 보통 수준의 가려움', value: '3' },
                  { label: '4단계 - 많이 가려워 긁게 됨', value: '4' },
                  { label: '5단계 - 미칠 듯이 가려움', value: '5' },
                ],
                required: true,
              }]
            });

            if (formValues.scarPosasItch) {
              steps.push({
                title: '치료 기대치 및 위험요인 (5/5)',
                subtitle: '안전하고 만족스러운 시술을 위한 질문입니다.',
                questions: [
                  {
                    id: 'scarKeloid',
                    category: '흉터',
                    text: '과거에 상처가 났을 때 원래 크기보다 월등히 크게 튀어오른 적이 있나요?',
                    subtext: '(켈로이드 체질 여부)',
                    type: 'yesno',
                    warningOn: 'yes',
                    warningMessage: '켈로이드 체질 가능성',
                    required: true,
                  },
                  {
                    id: 'scarExpectation',
                    category: '흉터',
                    text: '어느 정도의 개선 효과를 원하시나요?',
                    subtext: '흉터의 종류에 따라 완벽한 제거가 불가능할 수도 있습니다. (중복 선택 가능)',
                    type: 'checkbox',
                    options: [
                      { label: '지금 내 상태에서 조금만 눈에 덜 띄어도 좋음', value: '조금 완화' },
                      { label: '적어도 50% 이상 뚜렷한 개선 희망', value: '50% 이상' },
                      { label: '눈에 보이지 않을 만큼 완벽하게 지워지길 희망', value: '완벽 제거' },
                      { label: '원장님 설명과 진단에 따르겠음', value: '진단에 따름' },
                    ],
                    required: true,
                  },
                  {
                    id: 'scarSmoking',
                    category: '흉터',
                    text: '현재 담배를 피우고 계신가요?',
                    subtext: '흡연은 조직의 재생과 회복을 크게 지연시킬 수 있습니다.',
                    type: 'yesno',
                    warningOn: 'yes',
                    warningMessage: '흡연 (조직 회복 지연 위험)',
                    required: true,
                  }
                ]
              });
            }
          }
        }
      }
    }
  }

  if (!skipCommon) {
    steps.push({
      title: '피부 상태 확인 및 사진 가이드',
      subtitle: '정확한 진단을 위한 피부 정보와 촬영 전 체크리스트입니다',
      questions: [...skinStatusQuestions, ...photoGuideQuestions],
    });
  }

  return steps;
}
