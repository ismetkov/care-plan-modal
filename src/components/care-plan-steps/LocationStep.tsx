/**
 * Location Step Component
 * Third step of the care plan form - Shows different content based on visit type
 */

import React from 'react';

type VisitType = 'in-home' | 'video' | null;

interface LocationStepProps {
  visitType: VisitType;
}

const LocationStep: React.FC<LocationStepProps> = ({ visitType }) => {
  return (
    <>
      {/* Title and Description */}
      <div className="mb-8">
        <h2 className="text-4xl font-serif mb-4">Where will the visit take place?</h2>
        <p className="text-gray-600">Let us know where care will be provided.</p>
        <p className="text-sm text-gray-500 mt-2">* Indicates a required field</p>
      </div>

      {/* Content based on visit type */}
      <div className="py-8 text-center">
        <div className="bg-gray-100 rounded-lg p-12 border-2 border-dashed border-gray-300">
          {visitType === 'in-home' && (
            <>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">In-Home Visit Inputs</h3>
              <p className="text-gray-500">Address fields for in-home visit will go here</p>
            </>
          )}
          {visitType === 'video' && (
            <>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">Video Visit Inputs</h3>
              <p className="text-gray-500">Video/Zoom setup fields will go here</p>
            </>
          )}
          {!visitType && (
            <>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Visit Type Selected</h3>
              <p className="text-gray-500">Please go back and select a visit type</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LocationStep;
