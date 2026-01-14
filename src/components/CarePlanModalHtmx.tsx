/**
 * Care Plan Modal (HTMX Preview)
 * Preview modal for the HTMX/server-side version of visit type step
 */

import React from 'react';
import Modal from './Modal';
import { VisitTypeStepHtmx } from './care-plan-steps-htmx';
import { StepProgress, BackButton } from './care-plan-steps';

const MODAL_ID = 'care-plan-htmx-preview';

const CONTENT = {
  DISCLAIMER: {
    STRONG:
      'The Care Plan is not an assessment of eligibility for any long-term care insurance policy or government program.',
    TEXT: 'If you have long-term care insurance, please contact your insurance company for questions about eligibility.',
  },
} as const;

const CarePlanModalHtmx: React.FC = () => {
  return (
    <Modal
      id={MODAL_ID}
      fullScreenOnMobile={true}
      disclaimer={
        <>
          <strong>{CONTENT.DISCLAIMER.STRONG}</strong> {CONTENT.DISCLAIMER.TEXT}
        </>
      }
    >
      <div>
        {/* Back Button and Progress Bar */}
        <div className="flex items-center gap-4 mb-6">
          <BackButton onClick={() => {}} show={true} />
          <StepProgress currentStep={2} totalSteps={5} />
        </div>

        {/* Form wrapping the step */}
        <form
          action="#"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const visitType = formData.get('visitType');
            alert(`Selected: ${visitType}`);
          }}
        >
          <VisitTypeStepHtmx />
        </form>
      </div>
    </Modal>
  );
};

export default CarePlanModalHtmx;
