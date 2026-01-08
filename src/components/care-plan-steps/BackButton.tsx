/**
 * Back Button Component
 * Circular back button for step navigation
 */

import React from 'react';

interface BackButtonProps {
  onClick: () => void;
  show?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, show = true }) => {
  if (!show) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors shrink-0"
      aria-label="Go back to previous step"
    >
      <svg
        className="w-6 h-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

export default BackButton;
