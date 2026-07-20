import { ProcedureInfo, Question, SurveyStep } from '@/types/types';
import { isCirsApplicableProcedure } from '@/utils/cirs';

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
  {
    id: 'androgeneticAlopecia',
    name: '안드로겐탈모(남성형탈모, 여성형탈모)',
    nameEn: 'Pattern Hair Loss',
    icon: '🧬',
    description: '남성형·여성형 패턴탈모 초진 평가',
    color: '#14b8a6',
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
    visibleWhen: { field: 'patientGender', equals: '여성' },
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
      { label: '본원 (서울엔피부과의원)', value: '본원' },
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
      { label: '본원 (서울엔피부과의원)', value: '본원' },
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
  {
    id: 'pigmentHormone',
    category: '색소',
    text: '[여성 전용] 현재 또는 최근 6개월 내에 여성호르몬제(피임약, 호르몬 대체요법 등)를 복용하고 계신가요?',
    subtext: '여성호르몬은 기미 및 색소침착을 악화시키는 주요 원인 중 하나입니다. 남성 고객님은 "아니오"를 선택해 주세요.',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '여성호르몬제 복용 중 (색소 악화 위험)',
    required: true,
  },
  {
    id: 'pigmentPregnancy',
    category: '색소',
    text: '[여성 전용] 임신 또는 출산 경험이 있으신가요? (기미가 임신 중 또는 출산 후 생기거나 악화된 경우 포함)',
    subtext: '임신/출산 시 호르몬 변화로 기미가 생기거나 짙어질 수 있습니다. 남성 고객님은 "아니오"를 선택해 주세요.',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '임신/출산 관련 기미 이력',
    required: true,
  },
  {
    id: 'pigmentMenopause',
    category: '색소',
    text: '[여성 전용] 완경(폐경) 이후 색소 변화(기미 악화 등)를 느끼신 적이 있나요?',
    subtext: '완경 후 호르몬 변화는 색소 분포에 영향을 줄 수 있습니다. 남성 또는 완경 전인 고객님은 "아니오"를 선택해 주세요.',
    type: 'yesno',
    warningOn: 'yes',
    warningMessage: '완경 후 색소 변화 이력',
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
    id: 'liftingConcernArea',
    category: '리프팅',
    text: '가장 고민되는 부위를 선택해 주세요.',
    subtext: '(중복 선택 가능) 처짐, 볼륨 감소, 윤곽 변화 등 가장 신경 쓰이는 부위를 모두 골라주세요.',
    type: 'checkbox',
    options: [
      { label: '턱라인 (윤곽 흐릿해짐)', value: '턱라인' },
      { label: '이중턱', value: '이중턱' },
      { label: '앞광대 (볼륨 꺼짐)', value: '앞광대' },
      { label: '옆볼 (살이 처지고 내려옴)', value: '옆볼' },
      { label: '입가 (마리오네트 라인)', value: '입가' },
      { label: '눈가 (눈꺼풀/눈 밑 처짐)', value: '눈가' },
      { label: '팔자주름', value: '팔자주름' },
      { label: '목주름', value: '목주름' },
      { label: '이마 주름', value: '이마 주름' },
      { label: '얼굴 전체적인 처짐', value: '얼굴 전체 처짐' },
      { label: '잘 모르겠음', value: '잘 모르겠음' },
    ],
    required: true,
  },
  {
    id: 'liftingArea',
    category: '리프팅',
    text: '집중적으로 리프팅 시술을 원하는 부위를 선택해 주세요.',
    subtext: '(중복 선택 가능)',
    type: 'checkbox',
    options: [
      { label: '얼굴 전체', value: '얼굴 전체' },
      { label: '심부볼(불독살)', value: '심부볼' },
      { label: '이중턱/턱라인', value: '이중턱/턱라인' },
      { label: '팔자주름/입가', value: '팔자주름/입가' },
      { label: '앞광대/옆볼', value: '앞광대/옆볼' },
      { label: '눈가/이마', value: '눈가/이마' },
      { label: '목주름', value: '목주름' },
      { label: '기타', value: '기타' },
      { label: '잘 모르겠음', value: '잘 모르겠음' },
    ],
    required: true,
  },
  {
    id: 'collagenBoosterArea',
    category: '리프팅',
    text: '콜라겐부스터 시술 희망 부위를 선택해 주세요.',
    subtext: '(중복 선택 가능) 피부 탄력 개선 및 콜라겐 생성이 필요한 부위를 선택해 주세요.',
    type: 'checkbox',
    options: [
      { label: '턱라인 (윤곽 정리)', value: '턱라인' },
      { label: '이중턱', value: '이중턱' },
      { label: '앞광대 (볼륨 보충)', value: '앞광대' },
      { label: '옆볼 (탄력 회복)', value: '옆볼' },
      { label: '입가/팔자주름', value: '입가/팔자주름' },
      { label: '눈가 (잔주름 개선)', value: '눈가' },
      { label: '이마', value: '이마' },
      { label: '목/데콜테', value: '목/데콜테' },
      { label: '얼굴 전체', value: '얼굴 전체' },
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

export const androgeneticAlopeciaPatternQuestions: Question[] = [
  {
    id: 'hairOnset',
    category: '안드로겐탈모',
    text: '탈모 또는 모발 감소를 처음 느낀 시기는 언제인가요?',
    type: 'radio',
    options: [
      { label: '3개월 이내', value: '3개월 이내' },
      { label: '3~6개월 전', value: '3~6개월 전' },
      { label: '6개월~1년 전', value: '6개월~1년 전' },
      { label: '1~3년 전', value: '1~3년 전' },
      { label: '3년 이상 전', value: '3년 이상 전' },
      { label: '잘 모르겠음', value: '잘 모르겠음' },
    ],
    required: true,
  },
  {
    id: 'hairCourse',
    category: '안드로겐탈모',
    text: '지금까지의 진행 양상과 가장 가까운 것을 선택해 주세요.',
    type: 'radio',
    options: [
      { label: '수개월~수년에 걸쳐 서서히 진행', value: '서서히 지속 진행' },
      { label: '좋아졌다 나빠졌다를 반복', value: '간헐적 악화' },
      { label: '최근 1~3개월 사이 갑자기 심해짐', value: '최근 급격히 악화' },
      { label: '과거보다 큰 변화 없이 유지', value: '안정적' },
      { label: '잘 모르겠음', value: '잘 모르겠음' },
    ],
    required: true,
  },
  {
    id: 'hairMainChange',
    category: '안드로겐탈모',
    text: '현재 가장 크게 느끼는 변화는 무엇인가요?',
    subtext: '중복 선택할 수 있습니다.',
    type: 'checkbox',
    options: [
      { label: '모발이 가늘어짐', value: '모발 가늘어짐' },
      { label: '전체적인 숱 감소', value: '숱 감소' },
      { label: '머리를 감거나 말릴 때 빠지는 양 증가', value: '빠지는 양 증가' },
      { label: '두피가 더 많이 비쳐 보임', value: '두피 노출 증가' },
      { label: '헤어라인이 뒤로 밀림', value: '헤어라인 후퇴' },
      { label: '잘 모르겠음', value: '잘 모르겠음', exclusive: true },
    ],
    required: true,
  },
  {
    id: 'hairPattern',
    category: '안드로겐탈모',
    text: '어느 부위의 변화가 가장 두드러지나요?',
    subtext: '중복 선택할 수 있습니다. 동전 모양 탈모나 통증·딱지가 있으면 다른 탈모가 함께 있는지 확인합니다.',
    type: 'checkbox',
    options: [
      { label: '이마 양쪽 M자·관자 부위', value: 'M자/관자' },
      { label: '앞머리선 전체', value: '앞머리선' },
      { label: '정수리·가마 부위', value: '정수리/가마' },
      { label: '가르마가 넓어지고 중앙 두피가 비침', value: '중앙 가르마' },
      { label: '머리 전체가 고르게 얇아짐', value: '전체 확산성' },
      { label: '동전 모양 또는 군데군데 비는 부위', value: '국소 반점형', warning: true },
      { label: '잘 모르겠음', value: '잘 모르겠음', exclusive: true },
    ],
    required: true,
  },
  {
    id: 'hairShedding',
    category: '안드로겐탈모',
    text: '최근 빠지는 머리카락의 양은 어떻습니까?',
    type: 'radio',
    options: [
      { label: '평소와 비슷함', value: '증가 없음' },
      { label: '조금 늘었지만 일상에서 크게 느껴지지는 않음', value: '중등도 증가' },
      { label: '샴푸·배수구·베개에서 확연히 많이 보임', value: '심한 증가' },
      { label: '잘 모르겠음', value: '잘 모르겠음' },
    ],
    required: true,
  },
  {
    id: 'hairFamilyHistory',
    category: '안드로겐탈모',
    text: '가족 중 남성형 또는 여성형 탈모가 있나요?',
    subtext: '가족력이 없어도 안드로겐탈모는 생길 수 있습니다.',
    type: 'checkbox',
    options: [
      { label: '아버지 또는 친가 쪽', value: '부계' },
      { label: '어머니 또는 외가 쪽', value: '모계' },
      { label: '형제·자매', value: '형제자매' },
      { label: '가족력 없음', value: '가족력 없음', exclusive: true },
      { label: '잘 모르겠음', value: '잘 모르겠음', exclusive: true },
    ],
    required: true,
  },
  {
    id: 'hairScalpSymptoms',
    category: '두피 증상',
    text: '두피에 함께 나타나는 증상을 모두 선택해 주세요.',
    type: 'checkbox',
    options: [
      { label: '가려움', value: '가려움' },
      { label: '비듬·각질', value: '비듬/각질' },
      { label: '붉음·염증·뾰루지', value: '붉음/염증/뾰루지', warning: true },
      { label: '통증·화끈거림·머리카락이 당기는 느낌', value: '통증/화끈거림', warning: true },
      { label: '딱지·진물·상처', value: '딱지/진물/상처', warning: true },
      { label: '특별한 증상 없음', value: '증상 없음', exclusive: true },
    ],
    required: true,
  },
];

export const androgeneticAlopeciaDifferentialQuestions: Question[] = [
  {
    id: 'hairRecentTriggers',
    category: '악화 요인',
    text: '탈모가 심해지기 전 2~6개월 사이에 해당한 일을 모두 선택해 주세요.',
    subtext: '이런 변화 뒤에는 안드로겐탈모와 별도로 휴지기탈모가 겹칠 수 있습니다.',
    type: 'checkbox',
    options: [
      { label: '고열·코로나19 등 심한 감염', value: '고열/감염' },
      { label: '수술·입원·큰 사고', value: '수술/입원/사고' },
      { label: '출산·유산', value: '출산/유산' },
      { label: '체중 5kg 이상 감소·강한 다이어트', value: '급격한 체중감소' },
      { label: '위고비·마운자로 등 체중감량 치료 중 빠른 감량', value: 'GLP-1 치료/빠른 감량' },
      { label: '심한 스트레스·수면 부족', value: '스트레스/수면부족' },
      { label: '새로 시작하거나 중단한 약·호르몬제', value: '약물/호르몬 변화' },
      { label: '해당 사항 없음', value: '해당 없음', exclusive: true },
    ],
    required: true,
  },
  {
    id: 'hairNutritionRisk',
    category: '영양·철결핍 위험',
    text: '식사 또는 영양 상태와 관련해 해당하는 내용을 선택해 주세요.',
    type: 'checkbox',
    options: [
      { label: '엄격한 채식 또는 육류를 거의 먹지 않음', value: '엄격한 채식/저육식' },
      { label: '하루 섭취량을 크게 줄이는 식단', value: '제한 식이' },
      { label: '섭식장애 또는 반복적인 극단 다이어트', value: '섭식장애/극단 다이어트' },
      { label: '위·장 수술 또는 만성 흡수장애', value: '흡수장애 위험' },
      { label: '쉽게 피곤함·숨참·창백함', value: '빈혈 의심 증상' },
      { label: '해당 사항 없음', value: '해당 없음', exclusive: true },
    ],
    required: true,
  },
  {
    id: 'hairMedicalHistory',
    category: '동반 질환',
    text: '진단받았거나 치료 중인 질환을 모두 선택해 주세요.',
    type: 'checkbox',
    options: [
      { label: '빈혈 또는 철결핍', value: '빈혈/철결핍' },
      { label: '갑상선질환', value: '갑상선질환' },
      { label: '다낭성난소증후군(PCOS)', value: 'PCOS' },
      { label: '자가면역질환', value: '자가면역질환' },
      { label: '만성 간·신장질환', value: '만성 간/신장질환' },
      { label: '암 치료 또는 항암치료 이력', value: '암/항암치료' },
      { label: '해당 사항 없음', value: '해당 없음', exclusive: true },
      { label: '기타', value: '기타' },
    ],
    required: true,
  },
  {
    id: 'hairPreviousTreatment',
    category: '이전 치료',
    text: '이전에 받아본 탈모 치료를 모두 선택해 주세요.',
    type: 'checkbox',
    options: [
      { label: '바르는 미녹시딜', value: '바르는 미녹시딜' },
      { label: '먹는 미녹시딜', value: '먹는 미녹시딜' },
      { label: '피나스테리드·두타스테리드', value: '피나스테리드/두타스테리드' },
      { label: '스피로노락톤 등 항안드로겐 치료', value: '항안드로겐 치료' },
      { label: 'PRP·주사·레이저·두피 시술', value: '주사/레이저/두피시술' },
      { label: '모발이식', value: '모발이식' },
      { label: '치료한 적 없음', value: '치료 없음', exclusive: true },
      { label: '기타', value: '기타' },
    ],
    required: true,
  },
  {
    id: 'hairPreviousTreatmentDetail',
    category: '이전 치료',
    text: '치료 기간, 효과, 중단 이유 또는 부작용을 적어 주세요.',
    subtext: '예: 피나스테리드 1년 복용, 효과 있었으나 성욕 저하로 중단',
    type: 'text',
    visibleWhen: {
      field: 'hairPreviousTreatment',
      includesAny: [
        '바르는 미녹시딜',
        '먹는 미녹시딜',
        '피나스테리드/두타스테리드',
        '항안드로겐 치료',
        '주사/레이저/두피시술',
        '모발이식',
        '기타',
      ],
    },
    required: false,
  },
];

export const androgeneticAlopeciaSexAndTreatmentQuestions: Question[] = [
  {
    id: 'hairFemaleCycle',
    category: '여성 탈모',
    text: '현재 생리·완경 상태와 가장 가까운 것을 선택해 주세요.',
    type: 'radio',
    visibleWhen: { field: 'patientGender', equals: '여성' },
    options: [
      { label: '주기가 대체로 규칙적임', value: '규칙적' },
      { label: '주기가 불규칙하거나 35일보다 긴 경우가 많음', value: '불규칙/희발월경' },
      { label: '3개월 이상 생리가 없음(임신 제외)', value: '무월경' },
      { label: '완경함', value: '완경' },
      { label: '임신·수유 중', value: '임신/수유' },
      { label: '자궁 수술 등으로 판단하기 어려움', value: '판단 어려움' },
    ],
    required: true,
  },
  {
    id: 'hairFemaleHeavyMenses',
    category: '여성 탈모',
    text: '생리량이 매우 많거나 생리 기간이 7일 이상 지속되는 편인가요?',
    subtext: '과다월경은 철결핍 위험을 높일 수 있습니다. 완경·임신·무월경이면 "아니오"를 선택해 주세요.',
    type: 'yesno',
    visibleWhen: { field: 'patientGender', equals: '여성' },
    required: true,
  },
  {
    id: 'hairFemaleAndrogenSigns',
    category: '여성 탈모',
    text: '호르몬 이상 가능성을 확인하기 위해 해당 증상을 선택해 주세요.',
    subtext: '여성형탈모만으로 남성호르몬이 높다고 단정할 수는 없습니다.',
    type: 'checkbox',
    visibleWhen: { field: 'patientGender', equals: '여성' },
    options: [
      { label: '턱·인중·가슴·배 등에 굵은 털이 늘어남', value: '다모증' },
      { label: '성인 여드름이 심하거나 갑자기 악화', value: '중증/급격한 여드름' },
      { label: '임신이 잘 되지 않거나 PCOS 진단', value: '난임/PCOS' },
      { label: '탈모·다모증이 갑자기 빠르게 진행', value: '급격한 안드로겐 증상', warning: true },
      { label: '목소리가 굵어짐·근육 증가 등 남성화 변화', value: '남성화 변화', warning: true },
      { label: '해당 사항 없음', value: '해당 없음', exclusive: true },
    ],
    required: true,
  },
  {
    id: 'hairFemaleHormoneUse',
    category: '여성 탈모',
    text: '피임약·호르몬 치료제·난임 치료제를 사용 중이거나 최근 중단했나요?',
    subtext: '호르몬제는 검사 결과에 영향을 주므로 약 이름과 중단 시점을 의료진에게 알려주세요.',
    type: 'yesno',
    visibleWhen: { field: 'patientGender', equals: '여성' },
    warningOn: 'yes',
    warningMessage: '여성 호르몬제 사용/최근 중단 - 호르몬검사 시기 확인',
    required: true,
  },
  {
    id: 'hairFemalePregnancyPlan',
    category: '여성 탈모',
    text: '현재 임신 가능성 또는 1년 이내 임신 계획이 있나요?',
    subtext: '임신 가능성에 따라 사용할 수 없는 먹는 탈모약이 있습니다.',
    type: 'yesno',
    visibleWhen: { field: 'patientGender', equals: '여성' },
    warningOn: 'yes',
    warningMessage: '임신 가능성/1년 내 계획 있음 - 전신 탈모약 선택 주의',
    required: true,
  },
  {
    id: 'hairMaleAndrogenUse',
    category: '남성 탈모',
    text: '테스토스테론·남성호르몬·아나볼릭 스테로이드 또는 근육증가 약물을 사용하나요?',
    type: 'yesno',
    visibleWhen: { field: 'patientGender', equals: '남성' },
    warningOn: 'yes',
    warningMessage: '남성호르몬/아나볼릭 스테로이드 사용',
    required: true,
  },
  {
    id: 'hairMale45Plus',
    category: '남성 탈모',
    text: '현재 만 45세 이상인가요?',
    subtext: '45세 이상에서 피나스테리드 치료를 논의할 때 전립선 상태와 PSA 기준치를 함께 확인할 수 있습니다.',
    type: 'yesno',
    visibleWhen: { field: 'patientGender', equals: '남성' },
    required: true,
  },
  {
    id: 'hairMaleProstateStatus',
    category: '남성 탈모',
    text: '최근 전립선 진료 또는 PSA 혈액검사 상태를 선택해 주세요.',
    type: 'radio',
    visibleWhen: [
      { field: 'patientGender', equals: '남성' },
      { field: 'hairMale45Plus', equals: 'yes' },
    ],
    options: [
      { label: '최근 1년 이내 검사했고 이상 없었음', value: '1년 내 PSA 정상' },
      { label: '검사한 적 없음', value: 'PSA 검사 없음' },
      { label: '전립선 질환으로 진료 중', value: '전립선 진료 중' },
      { label: '잘 모르겠음', value: '잘 모르겠음' },
    ],
    required: true,
  },
  {
    id: 'hairTreatmentSafety',
    category: '치료 안전 확인',
    text: '먹는 미녹시딜 등 치료 선택에 영향을 줄 수 있는 항목을 모두 선택해 주세요.',
    type: 'checkbox',
    options: [
      { label: '저혈압·어지럼·실신', value: '저혈압/실신' },
      { label: '부정맥·심부전·심장질환', value: '심장질환' },
      { label: '다리·얼굴이 잘 붓는 편', value: '부종' },
      { label: '신장질환', value: '신장질환' },
      { label: '관련 질환 없음', value: '관련 질환 없음', exclusive: true },
    ],
    required: true,
  },
  {
    id: 'hairTreatmentGoal',
    category: '치료 목표',
    text: '이번 진료에서 가장 원하는 도움을 선택해 주세요.',
    subtext: '중복 선택할 수 있습니다.',
    type: 'checkbox',
    options: [
      { label: '정확한 진단과 원인 확인', value: '진단/원인 확인' },
      { label: '더 진행하지 않도록 유지', value: '진행 억제' },
      { label: '모발 굵기·밀도 개선', value: '굵기/밀도 개선' },
      { label: '먹는 약·바르는 약 상담', value: '약물 상담' },
      { label: '주사·레이저·시술 상담', value: '시술 상담' },
      { label: '부작용이 가장 걱정됨', value: '부작용 상담' },
    ],
    required: true,
  },
  {
    id: 'hairAdditionalNotes',
    category: '추가 내용',
    text: '탈모와 관련해 의료진에게 꼭 알리고 싶은 내용이 있으면 적어 주세요.',
    type: 'text',
    required: false,
  },
];

export const androgeneticAlopeciaBloodTestQuestions: Question[] = [
  {
    id: 'hairBloodTestInfo',
    category: '초진 혈액검사 안내',
    text: '혈액검사는 안드로겐탈모를 확진하는 검사가 아닙니다.',
    subtext: '탈모 진단은 문진·두피 진찰·확대경검사가 중심이며, 혈액검사는 함께 교정할 수 있는 원인이 의심될 때 선택합니다.',
    type: 'info',
    infoItems: [
      {
        title: '혈구검사(CBC)',
        description: '헤모글로빈과 적혈구 지표를 확인해 빈혈이 있는지 봅니다. 피로·숨참·창백함 또는 과다월경이 있을 때 도움이 됩니다.',
        badge: '선별',
      },
      {
        title: '페리틴 + 철/TIBC(또는 트랜스페린 포화도)',
        description: '몸에 저장된 철과 실제 철 이용 상태를 확인합니다. 빠지는 양이 갑자기 늘었거나 과다월경·제한식·빠른 체중감량이 있을 때 특히 고려합니다.',
        badge: '선별',
      },
      {
        title: 'TSH(필요시 free T4)',
        description: '갑상선 기능 저하나 항진은 머리 전체가 빠지는 원인이 될 수 있어, 확산성 탈모나 갑상선 증상이 있으면 확인합니다.',
        badge: '선별',
      },
      {
        title: '25-OH 비타민 D',
        description: '결핍 여부를 확인합니다. 패턴탈모와의 인과관계는 확실하지 않아 모든 환자에게 필수 검사는 아니며, 결핍 위험과 전신 건강을 함께 고려합니다.',
        badge: '선택',
      },
      {
        title: '아연',
        description: '엄격한 제한식, 흡수장애, 영양결핍 위험이 있을 때 선택합니다. 증상이 없는 모든 환자에게 일률적으로 검사할 근거는 제한적입니다.',
        badge: '선택',
      },
    ],
    required: false,
  },
  {
    id: 'hairFemaleBloodTestInfo',
    category: '여성 호르몬검사 안내',
    text: '여성 호르몬검사는 증상이 있을 때 선별적으로 시행합니다.',
    subtext: '생리불순·무월경·다모증·난임·심한 성인여드름·급격한 진행이 있으면 고안드로겐혈증이나 PCOS 등을 확인합니다.',
    type: 'info',
    visibleWhen: { field: 'patientGender', equals: '여성' },
    infoItems: [
      {
        title: '총 테스토스테론 + SHBG(계산 유리안드로겐지수/유리 테스토스테론)',
        description: '고안드로겐혈증을 선별하는 중심 검사입니다. 피임약 등 호르몬제는 결과에 영향을 주므로 검사 시기를 의료진이 조정합니다.',
        badge: '증상 있을 때',
      },
      {
        title: 'DHEA-S·프로락틴 및 추가 내분비검사',
        description: '첫 검사와 증상에 따라 부신 안드로겐·고프로락틴혈증을 확인하고, 필요하면 17-OH 프로게스테론·코르티솔 등을 추가합니다.',
        badge: '의사 판단',
      },
    ],
    required: false,
  },
  {
    id: 'hairMaleBloodTestInfo',
    category: '남성 검사 안내',
    text: '전형적인 남성형탈모는 보통 호르몬 혈액검사가 필요하지 않습니다.',
    subtext: '다른 질환이 의심될 때만 원인 검사를 선택합니다. PSA는 탈모 진단검사가 아니라 피나스테리드 치료 전 전립선 기준치 확인을 위해 상담할 수 있습니다.',
    type: 'info',
    visibleWhen: { field: 'patientGender', equals: '남성' },
    infoItems: [
      {
        title: 'PSA(전립선특이항원)',
        description: '특히 45세 이상에서 피나스테리드 치료를 고려할 때 최근 전립선 진료와 기준치를 확인할 수 있습니다. 피나스테리드는 PSA 수치를 낮추므로 향후 검사 시 복용 사실을 알려야 합니다.',
        badge: '치료 전 상담',
      },
    ],
    required: false,
  },
  {
    id: 'hairBloodTestPreference',
    category: '초진 혈액검사',
    text: '이번 초진에서 혈액검사를 원하시나요?',
    subtext: '최종 검사 항목은 답변과 진찰 결과를 보고 의료진과 함께 결정합니다.',
    type: 'radio',
    options: [
      { label: '검사를 원합니다', value: '검사 희망' },
      { label: '원장님 설명을 들은 뒤 결정하겠습니다', value: '설명 후 결정' },
      { label: '이번에는 원하지 않습니다', value: '검사 원치 않음' },
    ],
    required: true,
  },
  {
    id: 'hairBloodTestItems',
    category: '희망 검사 범위',
    text: '설명을 보고 관심 있는 검사 항목을 선택해 주세요.',
    subtext: '선택은 검사 주문이 아니라 상담 희망 표시입니다. 불필요한 검사를 줄이기 위해 의료진이 최종 조정합니다.',
    type: 'checkbox',
    visibleWhen: { field: 'hairBloodTestPreference', equals: '검사 희망' },
    options: [
      { label: '혈구검사(CBC) — 빈혈 확인', value: 'CBC' },
      { label: '페리틴 + 철/TIBC(또는 포화도) — 철결핍 확인', value: '페리틴/철대사' },
      { label: 'TSH(필요시 free T4) — 갑상선 확인', value: '갑상선' },
      { label: '25-OH 비타민 D — 결핍 확인', value: '비타민 D' },
      { label: '아연 — 영양결핍 위험 시', value: '아연' },
      { label: '진찰 후 원장님이 필요한 항목을 정해주세요', value: '의료진 선택', exclusive: true },
    ],
    required: true,
  },
  {
    id: 'hairFemaleHormoneTestPreference',
    category: '여성 호르몬검사',
    text: '여성 호르몬 선별검사도 상담받고 싶으신가요?',
    subtext: '총 테스토스테론·SHBG/유리안드로겐지수를 우선 고려하고, DHEA-S·프로락틴 등은 증상과 결과에 따라 결정합니다.',
    type: 'radio',
    visibleWhen: [
      { field: 'patientGender', equals: '여성' },
      { field: 'hairBloodTestPreference', equals: '검사 희망' },
      {
        field: 'hairFemaleAndrogenSigns',
        includesAny: ['다모증', '중증/급격한 여드름', '난임/PCOS', '급격한 안드로겐 증상', '남성화 변화'],
      },
    ],
    options: [
      { label: '호르몬검사 상담을 원합니다', value: '호르몬검사 상담 희망' },
      { label: '원장님 설명 후 결정하겠습니다', value: '설명 후 결정' },
      { label: '원하지 않습니다', value: '원치 않음' },
    ],
    required: true,
  },
  {
    id: 'hairMalePsaTestPreference',
    category: '남성 치료 전 검사',
    text: '피나스테리드 치료를 논의할 경우 PSA 검사도 상담받고 싶으신가요?',
    type: 'radio',
    visibleWhen: [
      { field: 'patientGender', equals: '남성' },
      { field: 'hairMale45Plus', equals: 'yes' },
      { field: 'hairBloodTestPreference', equals: '검사 희망' },
    ],
    options: [
      { label: 'PSA 검사 상담을 원합니다', value: 'PSA 상담 희망' },
      { label: '최근 검사 결과를 먼저 확인하겠습니다', value: '최근 결과 확인' },
      { label: '원장님 설명 후 결정하겠습니다', value: '설명 후 결정' },
    ],
    required: true,
  },
];

export const androgeneticAlopeciaQuestions: Question[] = [
  ...androgeneticAlopeciaPatternQuestions,
  ...androgeneticAlopeciaDifferentialQuestions,
  ...androgeneticAlopeciaSexAndTreatmentQuestions,
  ...androgeneticAlopeciaBloodTestQuestions,
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
    text: '레이저, 주사, 압출 등의 통증에 얼마나 민감한 편인가요?',
    subtext: '통증 관리 방법과 시술 진행 속도를 정하는 데 사용합니다.',
    type: 'radio',
    options: [
      { label: '낮음', value: '낮음' },
      { label: '보통', value: '보통' },
      { label: '높음', value: '높음' },
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

export const cirsReadinessQuestions: Question[] = [
  {
    id: 'cirsAcuteLesion',
    category: '피부회복력',
    text: '지금 얼굴에 진물, 고름, 물집, 상처 또는 만지면 아픈 피부염이 있나요?',
    subtext: '현재 급성 염증이나 감염 가능성을 확인합니다.',
    type: 'yesno',
    required: true,
  },
  {
    id: 'cirsCurrentSensitivity',
    category: '피부회복력',
    text: '최근 7일 동안 평소 세안이나 화장품에도 따갑거나 화끈거리고, 붉음, 가려움 또는 각질이 계속되었나요?',
    subtext: '현재 피부장벽과 민감 반응이 안정적인지 확인합니다.',
    type: 'yesno',
    required: true,
  },
  {
    id: 'cirsPersistentMarks',
    category: '피부회복력',
    text: '여드름, 상처 또는 피부관리 후 붉거나 갈색인 자국이 잘 생기고 오래 남는 편인가요?',
    subtext: '색소침착과 회복 지연 경향을 확인합니다.',
    type: 'yesno',
    required: true,
  },
  {
    id: 'cirsRecentIrritation',
    category: '피부회복력',
    text: '최근 7일 안에 강한 햇빛, 홈필링, 스크럽, 레티노이드, 각질제거제 또는 다른 피부 시술로 자극받았나요?',
    subtext: '최근 피부에 누적된 자극을 확인합니다.',
    type: 'yesno',
    required: true,
  },
];

export function getStepsForProcedure(
  procedure: string,
  skipCommon: boolean = false,
  formValues?: Record<string, string | undefined>,
  reuseCompletedCirs: boolean = false
): SurveyStep[] {
  const steps: SurveyStep[] = [];
  const proceduresArray = procedure.split(',').map(p => p.trim());
  const isHairOnly =
    proceduresArray.length === 1 && proceduresArray[0] === 'androgeneticAlopecia';
  const hasNonHairProcedure = proceduresArray.some(
    (item) => item !== 'androgeneticAlopecia'
  );
  const shouldAskCirs =
    isCirsApplicableProcedure(procedure) &&
    (!skipCommon || !reuseCompletedCirs);

  if (!skipCommon) {
    const hairCommonQuestionIds = new Set([
      'patientName',
      'patientGender',
      'patientPhoneLast',
      'pregnancy',
      'medications',
      'medicationDetail',
      'allergyOther',
      'allergyDetail',
    ]);

    steps.push({
      title: '기본 건강 정보',
      subtitle: isHairOnly
        ? '정확한 초진 평가와 치료 안전을 위한 기본 확인사항입니다'
        : '안전한 시술을 위한 기본 확인사항입니다',
      questions: isHairOnly
        ? commonQuestions.filter((question) => hairCommonQuestionIds.has(question.id))
        : commonQuestions,
    });
  }

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
      case 'androgeneticAlopecia':
        steps.push(
          {
            title: '안드로겐탈모 양상 확인',
            subtitle: '남성형·여성형 패턴과 다른 탈모가 함께 있는지 확인합니다',
            questions: androgeneticAlopeciaPatternQuestions,
          },
          {
            title: '동반 원인·악화 요인 확인',
            subtitle: '휴지기탈모, 철결핍, 갑상선질환 등 교정 가능한 요인을 확인합니다',
            questions: androgeneticAlopeciaDifferentialQuestions,
          },
          {
            title: '성별·치료 안전 확인',
            subtitle: '성별에 맞는 호르몬 신호와 안전한 치료 선택을 확인합니다',
            questions: androgeneticAlopeciaSexAndTreatmentQuestions,
          },
          {
            title: '초진 혈액검사 선택',
            subtitle: '검사별 목적과 근거를 읽고 검사 희망 여부를 선택해 주세요',
            questions: androgeneticAlopeciaBloodTestQuestions,
          }
        );
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

  if (shouldAskCirs) {
    steps.push({
      title: '피부 회복력 확인',
      subtitle: '지금 자극을 줄지, 먼저 진정할지 판단하기 위한 질문입니다',
      questions: cirsReadinessQuestions,
    });
  }

  if (!skipCommon && hasNonHairProcedure) {
    steps.push({
      title: '피부 상태 확인',
      subtitle: '정확한 진단을 위한 피부 정보 확인입니다',
      questions: skinStatusQuestions,
    });
  }

  return steps;
}
