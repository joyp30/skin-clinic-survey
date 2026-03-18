'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { getStepsForProcedure } from '@/data/questionData';
import { SurveyFormData, ProcedureType } from '@/types/types';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import NavButtons from '@/components/NavButtons';

function SurveyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const procedure = (searchParams.get('procedure') || 'botox') as ProcedureType;

  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { setValue, getValues, watch } = useForm<SurveyFormData>({
    defaultValues: {
      patientName: '',
      createdAt: '',
      procedure,
      procedureDetail: '',
      pregnancy: '',
      medications: '',
      medicationDetail: '',
      allergyLidocaine: '',
      allergyMetal: '',
      allergyOther: '',
      allergyDetail: '',
      botoxRecent: '',
      botoxResistance: '',
      botoxResistanceProduct: '',
      botoxArea: '',
      botoxPreviousClinic: '',
      fillerPrevious: '',
      fillerNodule: '',
      fillerInflammation: '',
      fillerArea: '',
      acneIsotretinoin: '',
      acneType: '',
      acneLifestyle: '',
      acneHormone: '',
      liftingArea: '',
      metalImplant: '',
      metalImplantDetail: '',
      keloid: '',
      recentSunExposure: '',
      bddq1: '',
      bddq2: '',
      bddq3: '',
      bddq4: '',
      skinType: '',
      painSensitivity: '',
      skinConcerns: '',
      additionalNotes: '',
    },
  });

  const steps = getStepsForProcedure(procedure);
  const currentQuestions = steps[currentStep]?.questions || [];

  // Watch all form values for re-renders
  const formValues = watch();

  const handleFieldChange = useCallback(
    (fieldId: string, value: string) => {
      setValue(fieldId as Extract<keyof SurveyFormData, string>, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue]
  );

  const transitionTo = useCallback((step: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 250);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      transitionTo(currentStep + 1);
    } else {
      // Survey complete — set timestamp, store data and navigate to result
      const data = getValues();
      data.createdAt = new Date().toISOString();
      
      // Save for current session (Result page)
      sessionStorage.setItem('surveyData', JSON.stringify(data));
      
      // Save local backup just in case
      try {
        const existingHistory = JSON.parse(localStorage.getItem('surveyHistory') || '[]');
        existingHistory.push(data);
        localStorage.setItem('surveyHistory', JSON.stringify(existingHistory));
      } catch (e) { }

      // Save to Vercel KV DB
      fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(err => console.error('DB Save error', err));

      router.push('/result');
    }
  }, [currentStep, steps.length, transitionTo, getValues, router]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      transitionTo(currentStep - 1);
    } else {
      router.push('/');
    }
  }, [currentStep, transitionTo, router]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext]);

  const isLastStep = currentStep === steps.length - 1;

  return (
    <motion.main 
      className="survey-page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <ProgressBar
        currentStep={currentStep}
        totalSteps={steps.length}
        stepLabels={steps.map((s) => s.title)}
      />

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentStep}
          className="survey-step"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >
          <div className="step-header">
            <motion.h2 
              className="step-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {steps[currentStep]?.title}
            </motion.h2>
            <motion.p 
              className="step-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {steps[currentStep]?.subtitle}
            </motion.p>
          </div>

          <motion.div 
            className="questions-list"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {currentQuestions.map((question, index) => {
              if (question.id === 'medicationDetail' && formValues.medications !== 'yes') return null;
              if (question.id === 'allergyDetail' && formValues.allergyOther !== 'yes') return null;
              if (question.id === 'metalImplantDetail' && formValues.metalImplant !== 'yes') return null;
              if (question.id === 'botoxPreviousClinic' && formValues.botoxRecent !== 'yes') return null;
              if (question.id === 'botoxResistanceProduct' && formValues.botoxResistance !== 'yes') return null;

              return (
                <motion.div
                  key={question.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                  }}
                >
                  <QuestionCard
                    question={question}
                    value={formValues[question.id] || ''}
                    onChange={(val) => handleFieldChange(question.id, val)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <NavButtons
        onPrev={handlePrev}
        onNext={handleNext}
        prevLabel={currentStep === 0 ? '처음으로' : '이전'}
        nextLabel={isLastStep ? '제출하기' : '다음'}
        showPrev={true}
      />
    </motion.main>
  );
}

export default function SurveyPage() {
  return (
    <Suspense
      fallback={
        <main className="survey-page">
          <div className="step-header">
            <h2 className="step-title">로딩 중...</h2>
          </div>
        </main>
      }
    >
      <SurveyContent />
    </Suspense>
  );
}
