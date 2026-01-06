/**
 * Main App Component
 * Type-safe React application entry point
 */

import React from 'react';
import Modal from './components/Modal';
import CarePlanForm from './components/CarePlanForm';
import './App.css';
import './lib/modal-controller';
import './lib/form-validator';

const App: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        {/* Main Content */}
        <div className="mt-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Care Plan Modal Demo
          </h1>

          {/* Multiple Modal Triggers */}
          <div className="flex gap-4 justify-center">
            <button
              data-modal-open="care-plan"
              className="bg-purple-primary hover:bg-purple-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              type="button"
            >
              Open Care Plan Form
            </button>

            {/* Example: Second modal trigger */}
            <button
              data-modal-open="example"
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              type="button"
            >
              Open Example Modal
            </button>
          </div>
        </div>
      </div>

      {/* Care Plan Modal */}
      <Modal
        id="care-plan"
        requiresConfirmation={true}
        confirmationModalId="confirm-close"
        disclaimer={
          <>
            <strong>
              The Care Plan is not an assessment of eligibility for any long-term care
              insurance policy or government program.
            </strong>{' '}
            If you have long-term care insurance, please contact your insurance company
            for questions about eligibility.
          </>
        }
      >
        <CarePlanForm />
      </Modal>

      {/* Confirmation Modal - Shows when user tries to close care plan */}
      <Modal
        id="confirm-close"
        maxWidth="md"
        showCloseButton={false}
        backdropClass="bg-gray-900/75"
      >
        <div className="text-center">
          <h2 id="confirm-close-title" className="text-3xl font-bold mb-4">
            Cancel your Care Plan order?
          </h2>
          <p className="text-gray-600 mb-6">
            Exiting will discard the information you've entered.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            Do you need help or have any questions? Call{' '}
            <a href="tel:8008708479" className="text-purple-primary hover:underline">
              800-870-8479
            </a>
          </p>
          <div className="flex gap-4 justify-center">
            <button
              data-modal-close
              className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
              type="button"
            >
              Keep going
            </button>
            <button
              data-confirm-cancel
              className="flex-1 bg-purple-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-dark transition-colors"
              type="button"
            >
              Cancel order
            </button>
          </div>
        </div>
      </Modal>

      {/* Example Modal - Shows reusability */}
      <Modal id="example" maxWidth="lg" backdropClass="bg-gray-900/75">
        <div className="text-center">
          <h2 id="example-title" className="text-3xl font-bold mb-4">
            Example Modal
          </h2>
          <p className="text-gray-600 mb-6">
            This demonstrates how you can easily create multiple modals with different
            configurations.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            This modal has a smaller max-width (lg) and darker backdrop.
          </p>
          <button
            data-modal-close
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            type="button"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default App;
