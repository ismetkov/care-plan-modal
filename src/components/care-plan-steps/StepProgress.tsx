/**
 * Step Progress Component
 * Visual progress bar with step indicators
 */

import React from 'react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      {/* Step Text */}
      <div className="shrink-0">
        <p className="text-sm font-medium text-gray-700">
          Step {currentStep} / {totalSteps}
        </p>
      </div>

      {/* Progress Bars */}
      <div className="flex-1 flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={stepNumber}
              className="flex-1 h-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: isCompleted || isCurrent ? '#7c3aed' : '#e5e7eb',
              }}
              role="progressbar"
              aria-valuenow={isCompleted ? 100 : isCurrent ? 50 : 0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Step ${stepNumber}${
                isCompleted ? ' completed' : isCurrent ? ' in progress' : ''
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
