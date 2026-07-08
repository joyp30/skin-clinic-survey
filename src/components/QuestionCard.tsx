import { useState } from 'react';
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
  const [customText, setCustomText] = useState(() => {
    if (!value) return '';
    const values = value.split(', ');
    const otherVal = values.find(v => v.startsWith('기타('));
    if (otherVal) {
      const match = otherVal.match(/기타\((.*)\)/);
      if (match && match[1]) {
        return match[1];
      }
    }
    return '';
  });

  const handleCustomTextChange = (newText: string, isCheckbox: boolean) => {
    setCustomText(newText);
    
    if (isCheckbox) {
      let currentValues = value ? value.split(', ') : [];
      // Remove any existing "기타" entries
      currentValues = currentValues.filter((v) => !v.startsWith('기타'));
      
      if (newText.trim() !== '') {
        currentValues.push(`기타(${newText})`);
      } else {
        currentValues.push('기타'); // Just "기타" if empty
      }
      onChange(currentValues.join(', '));
    } else {
      // Radio
      if (newText.trim() !== '') {
        onChange(`기타(${newText})`);
      } else {
        onChange('기타');
      }
    }
  };
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
          <div className="radio-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {question.options.map((option) => {
              const isOther = option.value === '기타';
              const isSelected = isOther ? value.startsWith('기타') : value === option.value;
              
              return (
                <div key={option.value} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    type="button"
                    className={`radio-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (isOther) {
                        onChange(customText ? `기타(${customText})` : '기타');
                      } else {
                        onChange(option.value);
                      }
                    }}
                  >
                    <span className="radio-indicator">
                      {isSelected ? '●' : '○'}
                    </span>
                    {option.label}
                  </button>
                  
                  {isOther && isSelected && (
                    <input
                      type="text"
                      className="text-input"
                      placeholder="기타 사항을 입력해 주세요"
                      value={customText}
                      onChange={(e) => handleCustomTextChange(e.target.value, false)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ 
                        marginLeft: '32px', 
                        width: 'calc(100% - 32px)', 
                        marginTop: '-4px',
                        padding: '12px',
                        fontSize: '0.95rem'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {question.type === 'checkbox' && question.options && (
          <div className="checkbox-group radio-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {question.options.map((option) => {
              const selectedValues = value ? value.split(', ') : [];
              const isOther = option.value === '기타';
              
              const isSelected = isOther 
                ? selectedValues.some(v => v.startsWith('기타')) 
                : selectedValues.includes(option.value);

              return (
                <div key={option.value} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    type="button"
                    className={`radio-btn checkbox-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      let newValues = [...selectedValues];
                      
                      if (isOther) {
                        if (isSelected) {
                          newValues = newValues.filter((v) => !v.startsWith('기타'));
                        } else {
                          newValues.push(customText ? `기타(${customText})` : '기타');
                        }
                      } else {
                        if (isSelected) {
                          newValues = newValues.filter((v) => v !== option.value);
                        } else {
                          newValues.push(option.value);
                        }
                      }
                      onChange(newValues.join(', '));
                    }}
                  >
                    <span className="radio-indicator checkbox-indicator">
                      {isSelected ? '☑' : '☐'}
                    </span>
                    {option.label}
                  </button>

                  {isOther && isSelected && (
                    <input
                      type="text"
                      className="text-input"
                      placeholder="기타 부위를 입력해 주세요"
                      value={customText}
                      onChange={(e) => handleCustomTextChange(e.target.value, true)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ 
                        marginLeft: '32px', 
                        width: 'calc(100% - 32px)', 
                        marginTop: '-4px',
                        padding: '12px',
                        fontSize: '0.95rem'
                      }}
                    />
                  )}
                </div>
              );
            })}
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
