/**
 * Review Step Component
 * Final step of the care plan form - PLACEHOLDER
 */

import React from 'react';

const ReviewStep: React.FC = () => {
  return (
    <>
      {/* Title and Description */}
      <div className="mb-8">
        <h2 className="text-4xl font-serif mb-4">Review your care plan</h2>
        <p className="text-gray-600">Please review your information before submitting.</p>
      </div>

      {/* Placeholder Content */}
      <div className="py-8 text-center">
        <div className="bg-gray-100 rounded-lg p-12 border-2 border-dashed border-gray-300">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Review & Submit</h3>
          <p className="text-gray-500">This step will be implemented next</p>
        </div>
      </div>
    </>
  );
};

export default ReviewStep;
