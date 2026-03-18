'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Copy,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  ClipboardCheck,
  Sparkles,
} from 'lucide-react';
import { SurveyFormData, ProcedureType } from '@/types/types';
import { generateCrmText, copyToClipboard } from '@/utils/crmFormatter';
import { procedures } from '@/data/questionData';

const procedureLabels: Record<ProcedureType, string> = {
  botox: '보톡스',
  filler: '필러',
  pigment: '색소',
  lifting: '리프팅',
  acne: '여드름',
};

export default function ResultPage() {
  const router = useRouter();
  const [data, setData] = useState<SurveyFormData | null>(null);
  const [crmText, setCrmText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('surveyData');
    if (stored) {
      const parsed = JSON.parse(stored) as SurveyFormData;
      setData(parsed);
      setCrmText(generateCrmText(parsed));
    } else {
      router.push('/');
    }
  }, [router]);

  const handleCopy = async () => {
    const success = await copyToClipboard(crmText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

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

  const proc = procedures.find((p) => p.id === data.procedure);
  const bddqScore =
    (parseInt(data.bddq1 || '0') || 0) +
    (parseInt(data.bddq2 || '0') || 0) +
    (parseInt(data.bddq3 || '0') || 0) +
    (parseInt(data.bddq4 || '0') || 0);

  // Collect all warnings
  const warnings: string[] = [];
  if (data.pregnancy === 'yes') warnings.push('임신/수유 중');
  if (data.medications === 'yes') warnings.push('약물 복용 중');
  if (data.allergyLidocaine === 'yes') warnings.push('리도카인 알레르기');
  if (data.allergyMetal === 'yes') warnings.push('금속 알레르기');
  if (data.botoxResistance === 'yes') warnings.push('보톡스 내성 의심');
  if (data.fillerNodule === 'yes') warnings.push('필러 결절 경험');
  if (data.fillerInflammation === 'yes') warnings.push('필러 염증 경험');
  if (data.metalImplant === 'yes') warnings.push('체내 금속 임플란트');
  if (data.keloid === 'yes') warnings.push('켈로이드 체질');
  if (data.recentSunExposure === 'yes') warnings.push('최근 자외선 노출');

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

      {/* Actions */}
      <div className="result-actions" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
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
