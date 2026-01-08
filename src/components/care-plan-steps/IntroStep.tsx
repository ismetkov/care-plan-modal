/**
 * Intro Step Component
 * First step of the care plan form
 */

import React from 'react';

interface IntroStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    carePlanFor: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const IntroStep: React.FC<IntroStepProps> = ({ formData, onChange }) => {
  return (
    <>
      {/* Title and Description */}
      <div className="mb-8">
        <h2 className="text-4xl font-serif mb-4">Who are we helping today?</h2>
        <p className="text-gray-600">We need a little information to get you started.</p>
        <p className="text-sm text-gray-500 mt-2">* Indicates a required field</p>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            Your first name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder="Your first name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Your last name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            placeholder="Your last name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary"
            required
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary"
          required
        />
      </div>

      {/* Care Plan For Dropdown */}
      <div>
        <label htmlFor="carePlanFor" className="block text-sm font-medium text-gray-700 mb-2">
          Who is the Care Plan for? <span className="text-red-500">*</span>
        </label>
        <select
          id="carePlanFor"
          name="carePlanFor"
          value={formData.carePlanFor}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary appearance-none bg-white"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem',
          }}
          required
        >
          <option value="">Choose one</option>
          <option value="myself">Myself</option>
          <option value="spouse">My spouse/partner</option>
          <option value="parent">My parent</option>
          <option value="other-family">Other family member</option>
          <option value="friend">A friend</option>
        </select>
      </div>

      {/* Terms and Privacy */}
      <div className="text-sm text-gray-600 text-center">
        By submitting this form, you consent to our{' '}
        <a href="#" className="text-purple-primary hover:underline">
          Terms
        </a>{' '}
        &{' '}
        <a href="#" className="text-purple-primary hover:underline">
          Privacy Policy
        </a>
        .
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <svg
          className="w-5 h-5 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>Your information is secure and encrypted</span>
      </div>
    </>
  );
};

export default IntroStep;
