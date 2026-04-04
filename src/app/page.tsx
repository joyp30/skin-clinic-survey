'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Stethoscope, Shield, Clock, ArrowRight } from 'lucide-react';
import { procedures } from '@/data/questionData';
import { ProcedureType } from '@/types/types';

export default function Home() {
  const router = useRouter();
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);

  const handleStart = () => {
    if (selectedProcedures.length > 0) {
      router.push(`/survey?procedure=${selectedProcedures.join(',')}`);
    }
  };

  return (
    <motion.main 
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-glow" />
        <motion.div 
          className="hero-content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-logo-container">
            <img src="/seoul_logo.png" alt="서울피부과의원 로고" className="hero-logo" />
          </div>
          <div className="hero-badge">
            <Stethoscope size={16} />
            스마트 문진 시스템
          </div>
          <h1 className="hero-title">
            서울피부과의원
            <br />
            <span className="hero-title-accent">피부과 사전문진</span>
          </h1>
          <div className="hero-notice">
            <p className="hero-notice-main">
              💛 안전하고 효과적인 시술을 위해<br />
              사전 문진을 꼭 최대한 작성 부탁드려요~
            </p>
            <p className="hero-notice-sub">
              작성해 주신 내용은 더 좋은 상담과 시술을 위해서만 사용됩니다 🩺<br />
              솔직하고 꼼꼼하게 답변해 주실수록 원장님이 더욱 꼭 맞는 도움을 드릴 수 있어요 😊
            </p>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <motion.div 
        className="trust-badges"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="trust-badge">
          <Shield size={18} />
          <span>개인정보 보호</span>
        </div>
        <div className="trust-badge">
          <Clock size={18} />
          <span>약 3분 소요</span>
        </div>
      </motion.div>

      {/* Procedure Selection */}
      <section className="procedure-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          시술을 선택해 주세요
        </motion.h2>
        <motion.div 
          className="procedure-grid"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.4 }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {procedures.map((proc) => (
            <motion.button
              key={proc.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`procedure-card ${selectedProcedures.includes(proc.id) ? 'selected' : ''}`}
              onClick={() => {
                setSelectedProcedures(prev => 
                  prev.includes(proc.id) ? prev.filter(p => p !== proc.id) : [...prev, proc.id]
                );
              }}
              style={
                selectedProcedures.includes(proc.id)
                  ? { borderColor: proc.color, boxShadow: `0 0 24px ${proc.color}30` }
                  : {}
              }
            >
              <span className="procedure-icon">{proc.icon}</span>
              <span className="procedure-name">{proc.name}</span>
              <span className="procedure-desc">{proc.description}</span>
              {selectedProcedures.includes(proc.id) && (
                <span
                  className="procedure-check"
                  style={{ background: proc.color }}
                >
                  ✓
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Start Button */}
      <motion.div 
        className="start-section"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button
          className={`start-btn ${selectedProcedures.length > 0 ? 'active' : ''}`}
          onClick={handleStart}
          disabled={selectedProcedures.length === 0}
        >
          문진 시작하기
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </motion.main>
  );
}
