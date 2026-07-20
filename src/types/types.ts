export type ProcedureType =
  | 'botox'
  | 'filler'
  | 'pigment'
  | 'lifting'
  | 'acne'
  | 'scar'
  | 'pore'
  | 'androgeneticAlopecia';

export interface ProcedureInfo {
  id: ProcedureType;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  color: string;
}

export interface QuestionOption {
  label: string;
  value: string;
  warning?: boolean;
  exclusive?: boolean;
}

export interface QuestionVisibilityRule {
  field: string;
  equals?: string;
  notEquals?: string;
  includesAny?: string[];
}

export interface QuestionInfoItem {
  title: string;
  description: string;
  badge?: string;
}

export interface Question {
  id: string;
  category: string;
  text: string;
  subtext?: string;
  type: 'yesno' | 'radio' | 'checkbox' | 'text' | 'scale' | 'info';
  options?: QuestionOption[];
  infoItems?: QuestionInfoItem[];
  visibleWhen?: QuestionVisibilityRule | QuestionVisibilityRule[];
  warningOn?: string; // value that triggers a warning
  warningMessage?: string;
  popupMessage?: string; // real-time alert message shown directly in UI
  required?: boolean;
}

export interface SurveyStep {
  title: string;
  subtitle: string;
  questions: Question[];
}

export interface SurveyFormData {
  // Metadata
  patientName: string;
  patientGender: string;
  patientPhoneLast: string;
  createdAt?: string;

  // Procedure
  procedure: string;
  procedureDetail: string;

  // Common
  pregnancy: string;
  medications: string;
  medicationDetail: string;
  allergyLidocaine: string;
  allergyMetal: string;
  allergyOther: string;
  allergyDetail: string;

  // Botox specific
  botoxRecent: string;
  botoxResistance: string;
  botoxResistanceProduct: string;
  botoxArea: string;
  botoxRecentPlace: string;
  botoxRecentArea: string;

  // Filler specific
  fillerPrevious: string;
  fillerPreviousPlace: string;
  fillerLastDate: string;
  fillerLastArea: string;
  fillerNodule: string;
  fillerInflammation: string;
  fillerArea: string;

  // Lifting specific
  liftingSleepHabit: string;
  liftingConcernArea: string;
  collagenBoosterArea: string;

  // Acne specific
  acneIsotretinoin: string;
  acneType: string;
  acneLifestyle: string;
  acneHormone: string;
  acneTreatmentPreference: string;

  // Androgenetic alopecia specific
  hairOnset: string;
  hairCourse: string;
  hairMainChange: string;
  hairPattern: string;
  hairShedding: string;
  hairFamilyHistory: string;
  hairScalpSymptoms: string;
  hairRecentTriggers: string;
  hairNutritionRisk: string;
  hairMedicalHistory: string;
  hairPreviousTreatment: string;
  hairPreviousTreatmentDetail: string;
  hairFemaleCycle: string;
  hairFemaleHormoneUse: string;
  hairFemaleAndrogenSigns: string;
  hairFemalePregnancyPlan: string;
  hairFemaleHeavyMenses: string;
  hairMaleAndrogenUse: string;
  hairMale45Plus: string;
  hairMaleProstateStatus: string;
  hairTreatmentSafety: string;
  hairTreatmentGoal: string;
  hairBloodTestPreference: string;
  hairBloodTestItems: string;
  hairFemaleHormoneTestPreference: string;
  hairMalePsaTestPreference: string;
  hairAdditionalNotes: string;

  // Scar specific
  scarCause: string;
  scarDuration: string;
  scarPosasPain: string;
  scarPosasItch: string;
  scarKeloid: string;
  scarAcneShape: string;
  scarAcneCurrent: string;
  scarAcnePie: string;
  scarTraumaOrigin: string;
  scarTraumaStatus: string;
  scarSurgicalType: string;
  scarSurgicalCare: string;
  scarExpectation: string;
  scarSmoking: string;
  scarMedication: string;

  // Pore specific
  poreCause: string;
  poreOilyHabit: string;
  poreAgingArea: string;
  poreCloggedHabit: string;
  poreIsotretinoin: string;
  poreLaserPeeling: string;

  // Pigment specific
  pigmentStart: string;
  pigmentUv: string;
  pigmentSunscreenCount: string;
  pigmentMakeup: string;
  pigmentType: string;
  pigmentHormone: string;
  pigmentPregnancy: string;
  pigmentMenopause: string;

  // Laser/Lifting specific
  liftingArea: string;
  metalImplant: string;
  metalImplantDetail: string;
  keloid: string;
  recentSunExposure: string;

  // BDDQ-AS
  bddq1: string;
  bddq2: string;
  bddq3: string;
  bddq4: string;

  // Skin status
  skinType: string;
  painSensitivity: string;
  skinConcerns: string;
  cirsAcuteLesion: string;
  cirsCurrentSensitivity: string;
  cirsPersistentMarks: string;
  cirsRecentIrritation: string;

  // Additional
  additionalNotes: string;

  [key: string]: string | undefined;
}

export interface CrmOutput {
  warnings: string[];
  procedure: string;
  history: string[];
  skinStatus: string[];
  bddqScore: number;
  notes: string;
}
