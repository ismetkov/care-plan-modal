/**
 * Reusable Modal Component
 * Type-safe modal component with full customization
 */

import React from 'react';
import type { ModalProps } from '../types/modal.types';

const Modal: React.FC<ModalProps> = ({
  id,
  children,
  maxWidth = '2xl',
  showCloseButton = true,
  backdropClass = 'bg-purple-primary/90',
  disclaimer = null,
}) => {
  const maxWidthClasses: Record<NonNullable<ModalProps['maxWidth']>, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-full',
  };

  return (
    <div
      id={`${id}-modal`}
      className="hidden fixed inset-0 opacity-0 transition-opacity duration-300 overflow-y-auto"
      data-modal={id}
      style={{ zIndex: 50 }}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 ${backdropClass}`}
        data-modal-close
        aria-hidden="true"
      />

      {/* Modal Content Container - Scrollable */}
      <div className="relative min-h-screen flex flex-col z-10">
        {/* Disclaimer - Scrolls with content */}
        {disclaimer && (
          <div
            id={`${id}-disclaimer`}
            data-modal-disclaimer={id}
            className="hidden bg-gray-100 border-b border-gray-200 p-4"
          >
            <p className="text-sm text-gray-700 max-w-6xl mx-auto">
              {disclaimer}
            </p>
          </div>
        )}

        {/* Modal Content - Centered */}
        <div
          className={`flex-1 flex items-center justify-center p-0 md:p-4 ${
            disclaimer ? 'md:pt-8 md:pb-8' : 'md:py-8'
          }`}
        >
          <div
            className={`relative bg-white rounded-none md:rounded-2xl shadow-xl ${maxWidthClasses[maxWidth]} w-full min-h-screen md:min-h-0`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
          >
            {/* Modal Body */}
            <div className="p-6 md:p-12">
              {/* Close Button */}
              {showCloseButton && (
                <button
                  data-modal-close
                  className="mb-6 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-300"
                  aria-label="Close modal"
                  type="button"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
