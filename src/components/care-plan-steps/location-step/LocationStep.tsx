/**
 * Visit Details Step Component
 * Step 3: Renders the appropriate form based on visit type selected in step 2
 */

import React from "react";
import { InHomeForm, VideoForm, LocationFormData, VisitType } from ".";

interface VisitDetailsStepProps {
  visitType: VisitType;
  formData: LocationFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  recipientName: string;
}

const VisitDetailsStep: React.FC<VisitDetailsStepProps> = ({
  visitType,
  formData,
  onChange,
  recipientName,
}) => {
  if (visitType === "in-home") {
    return <InHomeForm formData={formData} onChange={onChange} recipientName={recipientName} />;
  }

  if (visitType === "video") {
    return <VideoForm formData={formData} onChange={onChange} recipientName={recipientName} />;
  }

  return null;
};

export default VisitDetailsStep;
