/**
 * Example Modal Component
 * Demonstrates modal reusability with different configurations
 */

import React from 'react';
import Modal from './Modal';
import { MODAL_IDS } from '../constants/modal-ids';

const CONTENT = {
  TITLE: 'Example Modal',
  DESCRIPTION:
    'This demonstrates how you can easily create multiple modals with different configurations.',
  NOTE: 'This modal has a smaller max-width (lg) and darker backdrop.',
  BUTTON: 'Close',
} as const;

const ExampleModal: React.FC = () => {
  return (
    <Modal id={MODAL_IDS.EXAMPLE} maxWidth="lg" backdropClass="bg-gray-900/75">
      <div className="text-center">
        <h2 id={`${MODAL_IDS.EXAMPLE}-title`} className="text-3xl font-bold mb-4">
          {CONTENT.TITLE}
        </h2>
        <p className="text-gray-600 mb-6">{CONTENT.DESCRIPTION}</p>
        <p className="text-sm text-gray-500 mb-4">{CONTENT.NOTE}</p>
        <button
          data-modal-close
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          type="button"
        >
          {CONTENT.BUTTON}
        </button>
      </div>
    </Modal>
  );
};

export default ExampleModal;
