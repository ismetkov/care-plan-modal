/**
 * Main App Component
 * Type-safe React application entry point
 */

import React from 'react';
import CarePlanModal from './components/CarePlanModal';
import ConfirmationModal from './components/ConfirmationModal';
import ExampleModal from './components/ExampleModal';
import { MODAL_IDS } from './constants/modal-ids';
import './App.css';
import './lib/modal-controller';
import './lib/form-validator';

// Page content constants
const CONTENT = {
  PAGE_TITLE: 'Care Plan Modal Demo',
  BUTTONS: {
    OPEN_CARE_PLAN: 'Open Care Plan Form',
    OPEN_EXAMPLE: 'Open Example Modal',
  },
} as const;

const App: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        {/* Main Content */}
        <div className="mt-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {CONTENT.PAGE_TITLE}
          </h1>

          {/* Multiple Modal Triggers */}
          <div className="flex gap-4 justify-center">
            <button
              data-modal-open={MODAL_IDS.CARE_PLAN}
              className="bg-purple-primary hover:bg-purple-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              type="button"
            >
              {CONTENT.BUTTONS.OPEN_CARE_PLAN}
            </button>

            <button
              data-modal-open={MODAL_IDS.EXAMPLE}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              type="button"
            >
              {CONTENT.BUTTONS.OPEN_EXAMPLE}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CarePlanModal />
      <ConfirmationModal />
      <ExampleModal />
    </>
  );
};

export default App;
