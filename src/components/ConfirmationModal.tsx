/**
 * Confirmation Modal Component
 * Displays a confirmation dialog when user tries to close the care plan
 */

import React from 'react';
import Modal from './Modal';
import { MODAL_IDS } from '../constants/modal-ids';

const CONTENT = {
  TITLE: 'Cancel your Care Plan order?',
  MESSAGE: "Exiting will discard the information you've entered.",
  HELP_TEXT: 'Do you need help or have any questions? Call ',
  PHONE: '800-870-8479',
  BUTTONS: {
    KEEP_GOING: 'Keep going',
    CANCEL_ORDER: 'Cancel order',
  },
} as const;

const PHONE_HREF = 'tel:8008708479';

const ConfirmationModal: React.FC = () => {
  return (
    <Modal
      id={MODAL_IDS.CONFIRM_CLOSE}
      maxWidth="md"
      showCloseButton={false}
      backdropClass="bg-gray-900/75"
    >
      <div className="text-center">
        <h2 id={`${MODAL_IDS.CONFIRM_CLOSE}-title`} className="text-3xl font-bold mb-4">
          {CONTENT.TITLE}
        </h2>
        <p className="text-gray-600 mb-6">{CONTENT.MESSAGE}</p>
        <p className="text-sm text-gray-600 mb-6">
          {CONTENT.HELP_TEXT}
          <a href={PHONE_HREF} className="text-purple-primary hover:underline">
            {CONTENT.PHONE}
          </a>
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            data-modal-close
            className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
            type="button"
          >
            {CONTENT.BUTTONS.KEEP_GOING}
          </button>
          <button
            data-confirm-cancel
            className="flex-1 bg-purple-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-dark transition-colors"
            type="button"
          >
            {CONTENT.BUTTONS.CANCEL_ORDER}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
