'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavButtonsProps {
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  showPrev?: boolean;
}

export default function NavButtons({
  onPrev,
  onNext,
  prevLabel = '이전',
  nextLabel = '다음',
  prevDisabled = false,
  nextDisabled = false,
  showPrev = true,
}: NavButtonsProps) {
  return (
    <div className="nav-buttons">
      {showPrev ? (
        <button
          type="button"
          className="nav-btn prev"
          onClick={onPrev}
          disabled={prevDisabled}
        >
          <ChevronLeft size={20} />
          {prevLabel}
        </button>
      ) : (
        <div />
      )}
      <button
        type="button"
        className="nav-btn next"
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextLabel}
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
