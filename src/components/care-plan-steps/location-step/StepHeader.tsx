/**
 * StepHeader Component
 * Reusable header for form steps with title, description, and required field note
 */

import React from 'react';

interface StepHeaderProps {
  title: string;
  description: string;
}

const StepHeader: React.FC<StepHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h2 className="text-4xl font-serif mb-4">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm text-gray-500 mt-2">* indicates a required field</p>
    </div>
  );
};

export default StepHeader;
