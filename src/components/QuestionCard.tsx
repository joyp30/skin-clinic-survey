'use client';

import { Question } from '@/types/types';

interface QuestionCardProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  animationDelay?: number;
}

export default function QuestionCard({
  question,
  value,
  onChange,
  animationDelay = 0,
}: QuestionCardProps) {
  return (
    <div
      className="question-card"
      style={{ animationDelay: `${animationDelay * 80}ms` }}
    >
      <div className="question-header">
        <h3 className="question-text">{question.text}</h3>
        {question.subtext && (
          <p className="question-subtext">{question.subtext}</p>
        )}
      </div>

      <div className="question-body">
        {question.type === 'yesno' && (
          <div className="yesno-buttons">
            <button
              type="button"
              className={`yesno-btn yes ${value === 'yes' ? 'selected' : ''}`}
              onClick={() => onChange('yes')}
            >
              <span className="yesno-icon">✓</span>
              예
            </button>
            <button
              type="button"
              className={`yesno-btn no ${value === 'no' ? 'selected' : ''}`}
              onClick={() => onChange('no')}
            >
              <span className="yesno-icon">✕</span>
              아니오
            </button>
          </div>
        )}

        {question.type === 'radio' && question.options && (
          <div className="radio-group">
            {question.options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`radio-btn ${value === option.value ? 'selected' : ''}`}
                onClick={() => onChange(option.value)}
              >
                <span className="radio-indicator">
                  {value === option.value ? '●' : '○'}
                </span>
                {option.label}
              </button>
            ))}
          </div>
        )}

        {question.type === 'text' && (
          <textarea
            className="text-input"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="입력해 주세요..."
            rows={3}
          />
        )}

        {question.type === 'scale' && (
          <div className="scale-group">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`scale-btn ${value === String(n) ? 'selected' : ''}`}
                onClick={() => onChange(String(n))}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
