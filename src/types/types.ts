export type ProcedureType = 'botox' | 'filler' | 'pigment' | 'lifting' | 'acne';

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
}

export interface Question {
  id: string;
  category: string;
  text: string;
  subtext?: string;
  type: 'yesno' | 'radio' | 'checkbox' | 'text' | 'scale';
  options?: QuestionOption[];
  warningOn?: string; // value that triggers a warning
  warningMessage?: string;
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

  // Acne specific
  acneIsotretinoin: string;
  acneType: string;
  acneLifestyle: string;
  acneHormone: string;
  acneTreatmentPreference: string;

  // Pigment specific
  pigmentStart: string;
  pigmentUv: string;
  pigmentType: string;

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
