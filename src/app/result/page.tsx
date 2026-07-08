'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { SurveyFormData, ProcedureType } from '@/types/types';
import { assessCollagenReadiness, isCirsApplicableProcedure } from '@/utils/cirs';

const procedureLabels: Record<ProcedureType, string> = {
  botox: '보톡스',
  filler: '필러',
  pigment: '색소',
  lifting: '리프팅 및 콜라겐부스터',
  acne: '여드름',
  scar: '흉터',
  pore: '모공 집중 케어',
};

export default function ResultPage() {
  const router = useRouter();
  const [data] = useState<SurveyFormData | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = sessionStorage.getItem('surveyData');
    return stored ? (JSON.parse(stored) as SurveyFormData) : null;
  });

  useEffect(() => {
    if (!data) {
      router.push('/');
    }
  }, [data, router]);

  const handleReset = () => {
    sessionStorage.removeItem('surveyData');
    router.push('/');
  };

  if (!data) {
    return (
      <main className="result-page">
        <div className="loading-spinner">
          <Sparkles size={32} className="spin" />
          <p>결과를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  const readinessApplies = isCirsApplicableProcedure(data.procedure);
  const readiness = readinessApplies ? assessCollagenReadiness(data) : null;
  const canAddProcedures = !readiness || (readiness.grade === 'Green' && !readiness.shouldBlockAddOns);
  const readinessScore = !readiness
    ? ''
    : !readiness.isComplete
    ? 'CIRS 미작성'
    : readiness.redFlags.length > 0
    ? `CIRS ${readiness.totalScore}점 + 보류 기준`
    : `CIRS ${readiness.totalScore}점`;

  return (
    <main className="result-page" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100dvh',
      paddingBottom: '20vh'
    }}>
      {/* Header */}
      <div className="result-header">
        <div className="result-check-icon" style={{ marginBottom: '32px' }}>
          <CheckCircle size={64} />
        </div>
        <h1 className="result-title" style={{ fontSize: '2rem', marginBottom: '16px' }}>문진이 완료되었습니다.</h1>
        <p className="result-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          수고하셨습니다.
        </p>
      </div>

      {readiness && (
        <section className={`readiness-panel ${readiness.grade.toLowerCase()}`}>
          <div className="readiness-heading">
            <AlertTriangle size={20} />
            <div>
              <p className="readiness-kicker">{readinessScore}</p>
              <h2>{readiness.label}</h2>
            </div>
          </div>
          <p className="readiness-message">{readiness.patientMessage}</p>
          <p className="readiness-strategy">{readiness.strategy}</p>
          {readiness.reasons.length > 0 && (
            <div className="readiness-reasons">
              {readiness.reasons.slice(0, 6).map((reason) => (
                <span key={reason}>{reason}</span>
              ))}
            </div>
          )}
        </section>
      )}

      {canAddProcedures ? (
        <section className="add-on-panel">
          <h3>다른 시술도 같이 문진하시겠어요?</h3>
          <p>공통 건강 정보는 유지하고 선택한 시술 문진으로 이어집니다.</p>
          <div className="add-on-buttons">
            {(['botox', 'filler', 'pigment', 'lifting', 'acne'] as ProcedureType[])
              .filter((p) => !data.procedure.includes(p))
              .map((p) => (
                <button
                  key={p}
                  onClick={() => router.push(`/survey?procedure=${p}&skipCommon=true`)}
                >
                  {procedureLabels[p]} 추가하기
                </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="stabilization-panel">
          <h3>오늘은 추가 시술보다 피부 안정화가 우선입니다.</h3>
          <p>
            현재 판정에서는 다른 시술을 이어서 선택하기보다 진정, 보습, 광보호,
            염증 조절 후 재평가하는 흐름이 안전합니다.
          </p>
        </section>
      )}

      {/* Actions */}
      <div className="result-actions" style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
        <button 
          className="action-btn secondary" 
          onClick={handleReset}
          style={{ 
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            padding: '16px 32px',
            borderRadius: '100px',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          처음 화면으로 돌아가기
        </button>
      </div>
    </main>
  );
}
