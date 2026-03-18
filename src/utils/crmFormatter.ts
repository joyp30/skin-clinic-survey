import { SurveyFormData, ProcedureType } from '@/types/types';
import {
  commonQuestions,
  botoxQuestions,
  fillerQuestions,
  laserLiftingQuestions,
} from '@/data/questionData';

const procedureNames: Record<ProcedureType, string> = {
  botox: '보톡스',
  filler: '필러',
  laser: '레이저',
  lifting: '리프팅',
};

export function generateCrmText(data: SurveyFormData): string {
  const lines: string[] = [];

  // --- [주의] Warnings ---
  const warnings: string[] = [];

  // Common warnings
  commonQuestions.forEach((q) => {
    if (q.warningOn && data[q.id] === q.warningOn && q.warningMessage) {
      warnings.push(q.warningMessage);
    }
  });

  // Procedure-specific warnings
  const procQuestions =
    data.procedure === 'botox'
      ? botoxQuestions
      : data.procedure === 'filler'
        ? fillerQuestions
        : laserLiftingQuestions;

  procQuestions.forEach((q) => {
    if (q.warningOn && data[q.id] === q.warningOn && q.warningMessage) {
      warnings.push(q.warningMessage);
    }
  });

  warnings.forEach((w) => {
    lines.push(`[주의] ${w}`);
  });

  // --- [이름] Patient Name ---
  if (data.patientName) {
    lines.push(`[이름] ${data.patientName}`);
  }

  // --- [시술] Procedure info ---
  const procedureName = procedureNames[data.procedure] || data.procedure;
  let procedureDetail = `${procedureName}`;
  if (data.procedureDetail) {
    procedureDetail += ` - ${data.procedureDetail}`;
  }

  // Procedure area
  const areaField =
    data.procedure === 'botox'
      ? data.botoxArea
      : data.procedure === 'filler'
        ? data.fillerArea
        : '';
  if (areaField) {
    procedureDetail += ` (${areaField})`;
  }

  lines.push(`[시술] ${procedureDetail} 희망`);

  // --- [기왕력] Medical history ---
  const history: string[] = [];

  if (data.pregnancy === 'yes') {
    history.push('임신/수유 중');
  }
  if (data.medications === 'yes') {
    const medDetail = data.medicationDetail
      ? ` (${data.medicationDetail})`
      : '';
    history.push(`약물 복용 중${medDetail}`);
  }
  if (data.botoxRecent === 'yes') {
    const clinic = data.botoxPreviousClinic
      ? ` (${data.botoxPreviousClinic})`
      : ' (타원)';
    history.push(`최근 6개월 내 보톡스 시술${clinic}`);
  }
  if (data.botoxResistance === 'yes') {
    history.push('보톡스 내성 의심');
  }
  if (data.fillerPrevious === 'yes') {
    history.push('기존 필러 시술 이력');
  }
  if (data.fillerNodule === 'yes') {
    history.push('필러 후 결절 경험');
  }
  if (data.fillerInflammation === 'yes') {
    history.push('필러 후 염증/부종 경험');
  }
  if (data.metalImplant === 'yes') {
    const detail = data.metalImplantDetail
      ? ` (${data.metalImplantDetail})`
      : '';
    history.push(`체내 금속 임플란트${detail}`);
  }
  if (data.keloid === 'yes') {
    history.push('켈로이드 체질');
  }
  if (data.recentSunExposure === 'yes') {
    history.push('최근 자외선 과다 노출');
  }

  if (history.length > 0) {
    lines.push(`[기왕력] ${history.join(', ')}`);
  }

  // --- [피부상태] Skin status ---
  const skinParts: string[] = [];
  if (data.skinType) skinParts.push(data.skinType);
  if (data.painSensitivity && data.painSensitivity !== '보통') {
    skinParts.push(`통증 민감도 ${data.painSensitivity}`);
  }
  if (data.skinConcerns) skinParts.push(`주요고민: ${data.skinConcerns}`);

  if (skinParts.length > 0) {
    lines.push(`[피부상태] ${skinParts.join(', ')}`);
  }

  // --- [BDDQ] Score ---
  const bddqScore =
    (parseInt(data.bddq1 || '0') || 0) +
    (parseInt(data.bddq2 || '0') || 0) +
    (parseInt(data.bddq3 || '0') || 0) +
    (parseInt(data.bddq4 || '0') || 0);

  if (bddqScore >= 6) {
    lines.push(`[심리] BDDQ-AS 점수 ${bddqScore}/12 - 전문 상담 권장`);
  } else if (bddqScore >= 3) {
    lines.push(`[심리] BDDQ-AS 점수 ${bddqScore}/12 - 주의 관찰`);
  }

  // --- Additional notes ---
  if (data.additionalNotes) {
    lines.push(`[메모] ${data.additionalNotes}`);
  }

  return lines.join('\n');
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
}
