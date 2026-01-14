/**
 * Benefits List Component
 * Displays a list of benefits with check icons
 */

import React from 'react';
import { CheckIcon } from './Icons';

export interface Benefit {
  text: string;
}

interface BenefitsListProps {
  benefits: Benefit[];
  title: string;
}

const BenefitsList: React.FC<BenefitsListProps> = ({ benefits, title }) => {
  return (
    <ul
      className="space-y-3"
      role="list"
      aria-label={`Benefits of ${title}`}
    >
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-3 text-left">
          <CheckIcon className="w-5 h-5 text-purple-primary flex-shrink-0 mt-0.5" />
          <span className="text-gray-700">{benefit.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default BenefitsList;
