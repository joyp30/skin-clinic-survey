import { SurveyFormData, ProcedureType } from '@/types/types';
import {
  commonQuestions,
  botoxQuestions,
  fillerQuestions,
  pigmentQuestions,
  liftingQuestions,
  acneQuestions,
  photoGuideQuestions,
} from '@/data/questionData';

const procedureNames: Record<string, string> = {
  botox: '보톡스',
  filler: '필러',
  pigment: '색소',
  lifting: '리프팅 및 콜라겐부스터',
  acne: '여드름',
  scar: '흉터',
  pore: '모공 집중 케어',
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
  const procedureArray = data.procedure ? data.procedure.split(',').map(p => p.trim()) : [];
  const procQuestions: any[] = [];
  procedureArray.forEach(p => {
    if (p === 'botox') procQuestions.push(...botoxQuestions);
    else if (p === 'filler') procQuestions.push(...fillerQuestions);
    else if (p === 'pigment') procQuestions.push(...pigmentQuestions);
    else if (p === 'lifting') procQuestions.push(...liftingQuestions);
    else if (p === 'acne') procQuestions.push(...acneQuestions);
  });

  procQuestions.forEach((q) => {
    if (q.warningOn && data[q.id] === q.warningOn && q.warningMessage) {
      warnings.push(q.warningMessage);
    }
  });

  warnings.forEach((w) => {
    lines.push(`[주의] ${w}`);
  });

  // --- [이름] Patient Name with gender & phone last ---
  if (data.patientName) {
    const genderStr = data.patientGender ? ` (${data.patientGender})` : '';
    const phoneStr = data.patientPhoneLast ? ` / 📞 끝 ${data.patientPhoneLast}` : '';
    lines.push(`[이름] ${data.patientName}${genderStr}${phoneStr}`);
  }

  // --- [시술] Procedure info ---
  const procNames = data.procedure
    ? data.procedure.split(',').map(p => procedureNames[p.trim()] || p).join(', ')
    : '';
  let procedureDetail = `${procNames}`;
  if (data.procedureDetail) {
    procedureDetail += ` - ${data.procedureDetail}`;
  }

  // Procedure area
  const areaParts: string[] = [];
  if (data.botoxArea) areaParts.push(`보톡스: ${data.botoxArea}`);
  if (data.fillerArea) areaParts.push(`필러: ${data.fillerArea}`);
  if (data.liftingArea) areaParts.push(`리프팅 및 콜라겐부스터: ${data.liftingArea}`);
  
  if (areaParts.length > 0) {
    procedureDetail += ` (${areaParts.join(' / ')})`;
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
    const place = data.botoxRecentPlace || '미기재';
    const area = data.botoxRecentArea ? `, 부위: ${data.botoxRecentArea}` : '';
    history.push(`최근 6개월 내 보톡스 시술 (${place}${area})`);
  }
  if (data.botoxResistance === 'yes') {
    const product = data.botoxResistanceProduct ? ` (${data.botoxResistanceProduct})` : '';
    history.push(`보톡스 내성 의심${product}`);
  }
  if (data.fillerPrevious === 'yes') {
    const place = data.fillerPreviousPlace || '미기재';
    const lastDate = data.fillerLastDate ? `마지막: ${data.fillerLastDate}` : '';
    const lastArea = data.fillerLastArea ? `부위: ${data.fillerLastArea}` : '';
    const detail = [place, lastDate, lastArea].filter(Boolean).join(', ');
    history.push(`기존 필러 시술 이력${detail ? ` (${detail})` : ''}`);
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

  // --- [여드름 분석] Acne specific ---
  if (data.procedure.includes('acne')) {
    const acneLines: string[] = [];
    
    if (data.acneType) {
      let typeStr = data.acneType.replace(/기타(, )?/g, '').trim();
      if (typeStr.endsWith(',')) typeStr = typeStr.slice(0, -1);
      if (typeStr) acneLines.push(`- 타입: ${typeStr.split(', ').join(' / ')}`);
    }

    if (data.acneIsotretinoin === 'yes') {
      acneLines.push('- 약물: 이소트레티노인 복용 중 (주의 필요)');
    }
    
    if (data.acneLifestyle && data.acneLifestyle !== '해당 없음') {
      const lifestyleFactors = data.acneLifestyle.replace(/기타(, )?/g, '').replace('해당 없음', '').trim();
      const hormoneFactor = data.acneHormone === 'yes' ? ', 생리 주기 악화/호르몬 요인' : '';
      if (lifestyleFactors || hormoneFactor) {
        // clean up leading comma formatting if lifestyle was empty but hormone was true
        const factorStr = lifestyleFactors ? `${lifestyleFactors}${hormoneFactor}` : hormoneFactor.replace(/^, /, '');
        acneLines.push(`- 요인: ${factorStr}`);
      }
    } else if (data.acneHormone === 'yes') {
      acneLines.push(`- 요인: 생리 주기 악화/호르몬 요인`);
    }

    if (data.acneTreatmentPreference) {
      acneLines.push(`- 희망 방향: ${data.acneTreatmentPreference}`);
    }

    if (acneLines.length > 0) {
      lines.push('\n[여드름 분석]');
      lines.push(...acneLines);
      lines.push(''); // add empty line to separate visually
    }
  }

  // --- [흉터 정보] Scar specific ---
  if (data.procedure.includes('scar')) {
    const scarLines: string[] = [];
    scarLines.push(`■ 원인: ${data.scarCause || '미기재'}`);
    scarLines.push(`■ 시기: ${data.scarDuration || '미기재'} / 켈로이드: ${data.scarKeloid || '미기재'}`);
    
    let patternParts = [];
    if (data.scarCause && data.scarCause.includes('여드름')) {
      const parts = [];
      if (data.scarAcneShape) parts.push(`형태(${data.scarAcneShape})`);
      if (data.scarAcneCurrent) parts.push(`현재진행 여부(${data.scarAcneCurrent})`);
      if (data.scarAcnePie) parts.push(`색소/동반증상(${data.scarAcnePie})`);
      if (parts.length > 0) patternParts.push(`[여드름] ${parts.join(', ')}`);
    }
    if (data.scarCause && data.scarCause.includes('상처')) {
      patternParts.push(`[상처] 상태(${data.scarTraumaStatus || '미기재'}) / 상세원인(${data.scarTraumaOrigin || '미기재'})`);
    }
    if (data.scarCause && data.scarCause.includes('수술')) {
      patternParts.push(`[수술] 수술기원(${data.scarSurgicalType || '미기재'}) / 처치상태(${data.scarSurgicalCare || '미기재'})`);
    }
    
    let pattern = patternParts.length > 0 ? patternParts.join(' | ') : '미기재';
    
    scarLines.push(`■ 양상: ${pattern}`);
    
    const pain = parseInt(data.scarPosasPain) || 0;
    const itch = parseInt(data.scarPosasItch) || 0;
    scarLines.push(`■ POSAS 점수: 통증 ${data.scarPosasPain || '미기재'}, 가려움 ${data.scarPosasItch || '미기재'}`);
    
    scarLines.push(`■ 기대치: ${data.scarExpectation || '미기재'}`);
    
    const specialVars = [];
    if (data.scarSmoking === 'yes') specialVars.push('흡연(유)');
    if (data.scarSmoking === 'no') specialVars.push('흡연(무)');
    if (data.scarMedication && data.scarMedication !== '없음') specialVars.push(`약물(${data.scarMedication})`);
    if (specialVars.length > 0) scarLines.push(`■ 특이사항: ${specialVars.join(', ')}`);

    if (pain >= 4 || itch >= 4) {
      scarLines.push('\n[🚨 긴급 상담 필요: 통증/가려움 심함]');
    }

    if (scarLines.length > 0) {
      lines.push('\n[흉터 정보]');
      lines.push(...scarLines);
      lines.push(''); // add empty line to separate visually
    }
  }

  // --- [모공 집중 분석] Pore specific ---
  if (data.procedure.includes('pore')) {
    const poreLines: string[] = [];
    
    // Type classification
    let typeDisplay = data.poreCause || '미기재';
    if (data.poreCause) {
      const types = [];
      if (data.poreCause.includes('유분과다')) types.push('유분 과다형 (가로 모공)');
      if (data.poreCause.includes('탄력저하')) types.push('탄력 저하형 (세로 모공)');
      if (data.poreCause.includes('노폐물적체')) types.push('노폐물 정체형 (요철, 화이트헤드)');
      if (data.poreCause.includes('복합')) types.push('복합적임');
      if (types.length > 0) typeDisplay = types.join(', ');
    }

    poreLines.push(`■ 진단유형: ${typeDisplay}`);
    
    // Sensitivities and type (from common skin section if available)
    const skinType = data.skinType || '미기재';
    const sensitivity = data.painSensitivity || '미기재';
    poreLines.push(`■ 피부타입/민감도: ${skinType} / ${sensitivity}`);

    // Habits & Area
    const habits: string[] = [];
    if (data.poreAgingArea) habits.push(`주요 부위(${data.poreAgingArea})`);
    if (data.poreOilyHabit === 'yes') habits.push('기름종이/강한클렌저 잦음');
    if (data.poreCloggedHabit === 'yes') habits.push('손으로 피지 짜거나 코팩 자주함');
    
    if (habits.length > 0) {
      poreLines.push(`■ 원인/습관: ${habits.join(' / ')}`);
    }

    // Medication & Conditions
    const meds: string[] = [];
    meds.push(data.poreIsotretinoin === 'yes' ? '이소트레티노인 복용(유)' : '이소트레티노인 복용(무)');
    meds.push(data.pregnancy === 'yes' ? '임신/수유(유)' : '임신/수유(무)');
    if (data.allergyLidocaine === 'yes') meds.push('리도카인 알레르기(유)');
    else meds.push('리도카인 알레르기(무)');
    
    poreLines.push(`■ 약물/금기: ${meds.join(' / ')}`);

    // Special items
    if (data.poreLaserPeeling === 'yes') {
      poreLines.push('■ 특이사항: 최근 4주내 레이저/필링/태닝 이력 있음 (주의)');
    }

    if (poreLines.length > 0) {
      lines.push('\n[모공 집중 분석]');
      lines.push(...poreLines);
      lines.push(''); // add empty line
    }
  }

  // --- [색소 분석] Pigment specific ---
  if (data.procedure.includes('pigment')) {
    const pigmentParts: string[] = [];
    if (data.pigmentType) pigmentParts.push(`타입: ${data.pigmentType.replace(/기타(, )?/g, '')}`);
    if (data.pigmentStart) pigmentParts.push(`발생 시기: ${data.pigmentStart}`);
    if (data.pigmentUv) pigmentParts.push(`습관: ${data.pigmentUv}`);
    if (data.pigmentSunscreenCount) pigmentParts.push(`선크림 덧바름: ${data.pigmentSunscreenCount}`);
    if (data.pigmentMakeup) pigmentParts.push(`평소 화장: ${data.pigmentMakeup}`);

    if (pigmentParts.length > 0) {
      lines.push('\n[색소 분석]');
      pigmentParts.forEach(p => lines.push(`- ${p}`));
      lines.push(''); // spacing
    }
  }

  // --- [피부상태 및 사진가이드] Skin status & conditions ---
  const skinParts: string[] = [];
  if (data.skinType) skinParts.push(data.skinType);
  if (data.painSensitivity && data.painSensitivity !== '보통') {
    skinParts.push(`통증/민감도: ${data.painSensitivity}`);
  }
  if (data.skinConcerns) skinParts.push(`고민: ${data.skinConcerns}`);
  if (data.liftingSleepHabit) skinParts.push(`수면 자세: ${data.liftingSleepHabit}`);

  if (skinParts.length > 0) {
    lines.push(`[피부상태] ${skinParts.join(', ')}`);
  }
  
  // Photo guide check
  const guideFlags: string[] = [];
  if (data.photoGuide1 === 'no') guideFlags.push('조명 부적합');
  if (data.photoGuide2 === 'no') guideFlags.push('필터 사용 또는 화장 상태');
  
  if (guideFlags.length > 0) {
    lines.push(`⚠️ 사진 재촬영 필요 가능성 높음: ${guideFlags.join(', ')}`);
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
