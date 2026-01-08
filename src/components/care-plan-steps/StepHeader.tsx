/**
 * Step Header Component
 * Displays step title and description
 */

import React from 'react';

interface StepHeaderProps {
  title: string;
  description: string;
  showRequiredLabel?: boolean;
}

const StepHeader: React.FC<StepHeaderProps> = ({
  title,
  description,
  showRequiredLabel = true,
}) => {
  return (
    <div className="mb-8">
      <h2 id="care-plan-title" className="text-4xl font-serif mb-4">
        {title}
      </h2>
      <p className="text-gray-600">{description}</p>
      {showRequiredLabel && <p className="text-sm text-gray-500 mt-2">* Indicates a required field</p>}
    </div>
  );
};

export default StepHeader;
