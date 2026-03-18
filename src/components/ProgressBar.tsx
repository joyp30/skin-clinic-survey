'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  stepLabels,
}: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="progress-step-label">
          {stepLabels[currentStep] || `Step ${currentStep + 1}`}
        </span>
        <span className="progress-count">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="progress-dots">
        {stepLabels.map((label, i) => (
          <div
            key={label}
            className={`progress-dot ${i <= currentStep ? 'active' : ''} ${i === currentStep ? 'current' : ''}`}
            title={label}
          />
        ))}
      </div>
    </div>
  );
}
