'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Clock, Search, ChevronRight, FileText, Trash2, Home } from 'lucide-react';
import { SurveyFormData } from '@/types/types';
import { generateCrmText, copyToClipboard } from '@/utils/crmFormatter';
import { procedures } from '@/data/questionData';

// A group of surveys submitted by the same patient on the same day
interface SurveyGroup {
  key: string; // patientName + date
  patientName: string;
  date: string; // YYYY-MM-DD
  surveys: SurveyFormData[];
  latestAt: string; // ISO string of most-recent submission
}

function groupSurveys(history: SurveyFormData[]): SurveyGroup[] {
  const map = new Map<string, SurveyGroup>();

  for (const survey of history) {
    const dateStr = survey.createdAt
      ? format(parseISO(survey.createdAt), 'yyyy-MM-dd')
      : 'unknown';
    const key = `${survey.patientName}__${dateStr}`;

    if (!map.has(key)) {
      map.set(key, {
        key,
        patientName: survey.patientName || '',
        date: dateStr,
        surveys: [],
        latestAt: survey.createdAt || '',
      });
    }

    const group = map.get(key)!;
    group.surveys.push(survey);
    // track the most recent submission time
    if (survey.createdAt && survey.createdAt > group.latestAt) {
      group.latestAt = survey.createdAt;
    }
  }

  // Sort groups newest-first
  return Array.from(map.values()).sort((a, b) =>
    b.latestAt.localeCompare(a.latestAt)
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [history, setHistory] = useState<SurveyFormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<SurveyGroup | null>(null);
  const [activeSurveyIndex, setActiveSurveyIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await fetch('/api/surveys', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();

          if (Array.isArray(data)) {
            const sorted = data.sort((a: SurveyFormData, b: SurveyFormData) => {
              const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
              const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
              return dateB - dateA;
            });
            setHistory(sorted);
          } else {
            loadLocalHistory();
          }
        } else {
          loadLocalHistory();
        }
      } catch (e) {
        console.error('Failed to fetch from DB', e);
        loadLocalHistory();
      } finally {
        setIsLoading(false);
      }
    };

    const loadLocalHistory = () => {
      const storedHistory = localStorage.getItem('surveyHistory');
      if (storedHistory) {
        try {
          const parsed = JSON.parse(storedHistory) as SurveyFormData[];
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
    };

    fetchSurveys();
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

  const getProcedureName = (idStr: string) => {
    if (!idStr) return '';
    return idStr
      .split(',')
      .map(id => procedures.find(p => p.id === id.trim())?.name || id)
      .join(', ');
  };

  const groups = groupSurveys(history);

  const filteredGroups = groups.filter(group =>
    group.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.surveys.some(s =>
      getProcedureName(s.procedure).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSelectGroup = (group: SurveyGroup) => {
    setSelectedGroup(group);
    setActiveSurveyIndex(0);
    setCopied(false);
  };

  const handleDeleteGroup = async (e: React.MouseEvent, group: SurveyGroup) => {
    e.stopPropagation();
    if (!confirm(`${group.patientName}님의 문진 기록을 모두 삭제하시겠습니까?`)) return;

    const createdAts = group.surveys.map(s => s.createdAt).filter(Boolean);

    try {
      const res = await fetch('/api/surveys', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ createdAts }),
      });

      if (res.ok) {
        setHistory(prev => prev.filter(s => !createdAts.includes(s.createdAt)));
        
        const stored = localStorage.getItem('surveyHistory');
        if (stored) {
          const parsed = JSON.parse(stored) as SurveyFormData[];
          const filtered = parsed.filter(s => !createdAts.includes(s.createdAt || ''));
          localStorage.setItem('surveyHistory', JSON.stringify(filtered));
        }

        if (selectedGroup?.key === group.key) {
          setSelectedGroup(null);
        }
      } else {
        alert('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

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

  const activeSurvey = selectedGroup?.surveys[activeSurveyIndex] ?? null;

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
        style={{ display: selectedGroup ? 'none' : 'block' }}
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
          className="survey-list"
          style={{ display: selectedGroup ? 'none' : 'flex' }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.4 },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {isLoading ? (
            <div className="empty-state">
              <p>서버에서 환자 목록을 불러오는 중입니다...</p>
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} />
              <p>제출된 문진이 없습니다.</p>
            </div>
          ) : (
            filteredGroups.map((group) => {
              // Collect unique procedures across all surveys in this group
              const allProcedures = group.surveys
                .map(s => getProcedureName(s.procedure))
                .filter(Boolean)
                .join(', ');

              const hasWarning = group.surveys.some(s => calculateBddq(s) >= 6);
              const multiSurvey = group.surveys.length > 1;

              return (
                <motion.div
                  key={group.key}
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    show: { x: 0, opacity: 1 },
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`survey-list-item ${selectedGroup?.key === group.key ? 'active' : ''}`}
                  onClick={() => handleSelectGroup(group)}
                >
                  <div className="item-main">
                    <span className="patient-name">{group.patientName}</span>
                    <span className="procedure-tag">{allProcedures}</span>
                    {multiSurvey && (
                      <span
                        style={{
                          fontSize: '0.7rem',
                          background: 'var(--primary)',
                          color: '#fff',
                          borderRadius: '10px',
                          padding: '1px 7px',
                          marginLeft: '4px',
                          fontWeight: 600,
                        }}
                      >
                        {group.surveys.length}건
                      </span>
                    )}
                    {hasWarning && <span className="warning-dot" title="BDDQ 주의" />}
                  </div>
                  <div className="item-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} />
                      <span>
                        {group.latestAt
                          ? format(parseISO(group.latestAt), 'M월 d일 (EEE) a h:mm', { locale: ko })
                          : '시간 정보 없음'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={(e) => handleDeleteGroup(e, group)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#fca5a5',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        title="이 환자의 기록 삭제"
                      >
                        <Trash2 size={14} /> 삭제
                      </button>
                      <ChevronRight size={16} className="arrow" />
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Detail View */}
        <AnimatePresence>
          {selectedGroup && activeSurvey && (
            <motion.div
              className="survey-detail"
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="detail-header" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                  <button
                    onClick={() => setSelectedGroup(null)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Home size={18} /> 목록 (뒤로가기)
                  </button>
                  <button
                    onClick={(e) => handleDeleteGroup(e, selectedGroup)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#fca5a5',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={18} /> 기록 삭제
                  </button>
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', margin: '0 0 8px 0' }}>{selectedGroup.patientName}님 문진 상세</h2>
                  <span className="time-badge">
                    {selectedGroup.latestAt
                      ? format(parseISO(selectedGroup.latestAt), 'yyyy년 MM월 dd일', { locale: ko })
                      : ''}
                  </span>
                </div>
              </div>

              {/* Tabs for multiple surveys in same group */}
              {selectedGroup.surveys.length > 1 && (
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                  }}
                >
                  {selectedGroup.surveys.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setActiveSurveyIndex(idx); setCopied(false); }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: activeSurveyIndex === idx ? 700 : 400,
                        background:
                          activeSurveyIndex === idx
                            ? 'var(--primary)'
                            : 'var(--surface-secondary, rgba(255,255,255,0.08))',
                        color: activeSurveyIndex === idx ? '#fff' : 'var(--text-secondary)',
                        fontSize: '0.82rem',
                        transition: 'all 0.2s',
                      }}
                    >
                      {getProcedureName(s.procedure) || `시술 ${idx + 1}`}
                      {s.createdAt && (
                        <span style={{ marginLeft: '6px', opacity: 0.7, fontSize: '0.75rem' }}>
                          {format(parseISO(s.createdAt), 'H:mm')}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="crm-preview-box">
                <div className="crm-preview-header">
                  <h3>베가스 CRM 연동용 텍스트</h3>
                  <button
                    className={`copy-btn-small ${copied ? 'copied' : ''}`}
                    onClick={() => handleCopy(activeSurvey)}
                  >
                    {copied ? '복사 완료!' : '복사하기'}
                  </button>
                </div>
                <pre>{generateCrmText(activeSurvey)}</pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
