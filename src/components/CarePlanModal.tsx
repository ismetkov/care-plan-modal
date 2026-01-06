/**
 * Care Plan Modal Component
 * Main modal for the care plan form with disclaimer
 */

import React from 'react';
import Modal from './Modal';
import CarePlanForm from './CarePlanForm';
import { MODAL_IDS } from '../constants/modal-ids';

const CONTENT = {
  DISCLAIMER: {
    STRONG:
      'The Care Plan is not an assessment of eligibility for any long-term care insurance policy or government program.',
    TEXT: 'If you have long-term care insurance, please contact your insurance company for questions about eligibility.',
  },
} as const;

const CarePlanModal: React.FC = () => {
  return (
    <Modal
      id={MODAL_IDS.CARE_PLAN}
      requiresConfirmation={true}
      confirmationModalId={MODAL_IDS.CONFIRM_CLOSE}
      fullScreenOnMobile={true}
      disclaimer={
        <>
          <strong>{CONTENT.DISCLAIMER.STRONG}</strong> {CONTENT.DISCLAIMER.TEXT}
        </>
      }
    >
      <CarePlanForm />
    </Modal>
  );
};

export default CarePlanModal;
