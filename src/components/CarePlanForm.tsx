/**
 * Care Plan Form Component
 * Multi-step form with clean structure for easy portability
 */

import React, { useState } from 'react';
import {
  IntroStep,
  VisitTypeStep,
  LocationStep,
  SchedulingStep,
  ReviewStep,
  StepProgress,
  StepHeader,
  BackButton,
} from './care-plan-steps';

type FormStep = 'intro' | 'visitType' | 'location' | 'scheduling' | 'review';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  carePlanFor: string;
}

const STEP_CONFIG = {
  intro: {
    title: 'Who are we helping today?',
    description: 'We need a little information to get you started.',
  },
  visitType: {
    title: 'What type of visit do you need?',
    description: 'Select the type of care visit you require.',
  },
  location: {
    title: 'Where will the visit take place?',
    description: 'Let us know where care will be provided.',
  },
  scheduling: {
    title: 'When would you like to schedule?',
    description: 'Choose your preferred date and time.',
  },
  review: {
    title: 'Review your care plan',
    description: 'Please review your information before submitting.',
  },
};

const CarePlanForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('intro');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    carePlanFor: '',
  });

  const steps: FormStep[] = ['intro', 'visitType', 'location', 'scheduling', 'review'];
  const currentStepIndex = steps.indexOf(currentStep);

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    } else {
      // Final submission
      console.log('Form submitted:', formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Back Button and Progress Bar */}
      <div className="flex items-center gap-4 mb-6">
        <BackButton onClick={handleBack} show={currentStepIndex > 0} />
        <StepProgress currentStep={currentStepIndex + 1} totalSteps={steps.length} />
      </div>

      {/* Step Title and Description */}
      <StepHeader
        title={STEP_CONFIG[currentStep].title}
        description={STEP_CONFIG[currentStep].description}
      />

      {/* Form */}
      <form id="care-plan-form" data-form="care-plan" className="space-y-6" onSubmit={handleNext}>
        {/* Render current step */}
        {currentStep === 'intro' && <IntroStep formData={formData} onChange={handleInputChange} />}
        {currentStep === 'visitType' && <VisitTypeStep />}
        {currentStep === 'location' && <LocationStep />}
        {currentStep === 'scheduling' && <SchedulingStep />}
        {currentStep === 'review' && <ReviewStep />}

        {/* Continue/Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-purple-primary text-white py-4 px-6 rounded-lg hover:bg-purple-dark transition-colors font-medium text-lg"
          >
            {currentStep === 'review' ? 'Submit' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarePlanForm;
