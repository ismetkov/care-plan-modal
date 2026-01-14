/**
 * Pricing Section Component
 * Displays price, description, and CTA button
 */

import React from 'react';
import { ArrowRightIcon } from './Icons';

interface PricingSectionProps {
  price: string;
  priceDescription: string;
  buttonText: string;
  isSelected?: boolean;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  price,
  priceDescription,
  buttonText,
  isSelected = false,
}) => {
  return (
    <div>
      <p className="mb-4">
        <span className="text-2xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-700 ml-1">one-time payment</span>
      </p>
      <p className="text-gray-600 text-sm mb-6">{priceDescription}</p>

      <button
        type="button"
        className={`
          w-full py-3 px-6 rounded-full font-medium transition-all duration-200
          flex items-center justify-center gap-2
          ${
            isSelected
              ? 'bg-purple-primary text-white hover:bg-purple-dark'
              : 'bg-white text-gray-900 border-2 border-gray-900 group-hover:bg-purple-primary group-hover:text-white group-hover:border-purple-primary'
          }
        `}
      >
        {buttonText}
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PricingSection;
