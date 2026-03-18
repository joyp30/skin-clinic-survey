'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Clock, Search, ChevronRight, FileText } from 'lucide-react';
import { SurveyFormData } from '@/types/types';
import { generateCrmText, copyToClipboard } from '@/utils/crmFormatter';
import { procedures } from '@/data/questionData';

export default function AdminDashboard() {
  const router = useRouter();
  const [history, setHistory] = useState<SurveyFormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyFormData | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call with authentication
    const storedHistory = localStorage.getItem('surveyHistory');
    if (storedHistory) {
      try {
        const parsed = JSON.parse(storedHistory) as SurveyFormData[];
        // Sort by newest first
        const sorted = parsed.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        setHistory(sorted);
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  const handleCopy = async (data: SurveyFormData) => {
    const text = generateCrmText(data);
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const calculateBddq = (data: SurveyFormData) => {
    return (
      (parseInt(data.bddq1 || '0') || 0) +
      (parseInt(data.bddq2 || '0') || 0) +
      (parseInt(data.bddq3 || '0') || 0) +
      (parseInt(data.bddq4 || '0') || 0)
    );
  };

  const getProcedureName = (id: string) => {
    return procedures.find(p => p.id === id)?.name || id;
  };

  const filteredHistory = history.filter(item => 
    item.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getProcedureName(item.procedure).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'csdermastaff') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="admin-page auth-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          className="result-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: 400, width: '100%', textAlign: 'center' }}
        >
          <Shield className="admin-icon" size={48} style={{ margin: '0 auto 20px' }} />
          <h2 style={{ marginBottom: '8px', fontSize: '1.4rem' }}>직원 인증</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
            관리자 대시보드에 접근하려면 비밀번호를 입력하세요.
          </p>
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="password"
              placeholder="비밀번호"
              className="text-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ textAlign: 'center', borderColor: authError ? 'var(--danger)' : '' }}
            />
            {authError && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>비밀번호가 일치하지 않습니다.</span>}
            <button type="submit" className="nav-btn next" style={{ marginTop: '8px' }}>
              확인
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <motion.main 
      className="admin-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="admin-header">
        <motion.div 
          className="admin-title-row"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Shield className="admin-icon" size={24} />
          <h1>직원용 문진 현황 대시보드</h1>
        </motion.div>
        <motion.p 
          className="admin-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          총 {history.length}건의 문진이 제출되었습니다.
        </motion.p>
      </div>

      <motion.div 
        className="admin-controls"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="환자 이름 또는 시술명 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="admin-content">
        {/* List View */}
        <motion.div 
          className={`survey-list ${selectedSurvey ? 'hidden-mobile' : ''}`}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.4 }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {filteredHistory.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} />
              <p>제출된 문진이 없습니다.</p>
            </div>
          ) : (
            filteredHistory.map((survey, index) => {
              const bddqScore = calculateBddq(survey);
              return (
                <motion.div 
                  key={index} 
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    show: { x: 0, opacity: 1 }
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`survey-list-item ${selectedSurvey === survey ? 'active' : ''}`}
                  onClick={() => setSelectedSurvey(survey)}
                >
                  <div className="item-main">
                    <span className="patient-name">{survey.patientName}</span>
                    <span className="procedure-tag">{getProcedureName(survey.procedure)}</span>
                    {bddqScore >= 6 && <span className="warning-dot" title="BDDQ 주의" />}
                  </div>
                  <div className="item-meta">
                    <Clock size={12} />
                    <span>
                      {survey.createdAt 
                        ? format(parseISO(survey.createdAt), 'MM/dd HH:mm', { locale: ko }) 
                        : '시간 정보 없음'}
                    </span>
                    <ChevronRight size={16} className="arrow" />
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Detail View */}
        <AnimatePresence>
          {selectedSurvey && (
            <motion.div 
              className="survey-detail"
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="detail-header">
              <button 
                className="back-btn mobile-only"
                onClick={() => setSelectedSurvey(null)}
              >
                ← 목록으로
              </button>
              <h2>{selectedSurvey.patientName}님 문진 상세</h2>
              <span className="time-badge">
                {selectedSurvey.createdAt 
                  ? format(parseISO(selectedSurvey.createdAt), 'yyyy년 MM월 dd일 HH:mm', { locale: ko }) 
                  : ''}
              </span>
            </div>

            <div className="crm-preview-box">
              <div className="crm-preview-header">
                <h3>베가스 CRM 연동용 텍스트</h3>
                <button 
                  className={`copy-btn-small ${copied ? 'copied' : ''}`}
                  onClick={() => handleCopy(selectedSurvey)}
                >
                  {copied ? '복사 완료!' : '복사하기'}
                </button>
              </div>
              <pre>{generateCrmText(selectedSurvey)}</pre>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
