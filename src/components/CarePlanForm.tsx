/**
 * Care Plan Form Component
 * Type-safe form component with validation
 */

import React from 'react';

const CarePlanForm: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1">
            <div
              className="h-1 bg-purple-primary rounded-full"
              style={{ width: '20%' }}
              role="progressbar"
              aria-valuenow={20}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-1">Step 1 / 5</p>
        <h2 id="care-plan-title" className="text-4xl font-serif mb-4">
          Who are we helping today?
        </h2>
        <p className="text-gray-600">We need a little information to get you started.</p>
        <p className="text-sm text-gray-500 mt-2">* Indicates a required field</p>
      </div>

      {/* Form */}
      <form id="care-plan-form" data-form="care-plan" className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your first name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Your first name"
              data-validate="required"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary"
              aria-required="true"
            />
            <p
              className="text-red-500 text-sm mt-1 hidden"
              data-error="firstName"
              role="alert"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your last name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your last name"
              data-validate="required"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary"
              aria-required="true"
            />
            <p
              className="text-red-500 text-sm mt-1 hidden"
              data-error="lastName"
              role="alert"
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email (for scheduling updates and your Care Plan){' '}
            <span className="text-red-500">*</span>
            <button
              type="button"
              className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
              title="Email information"
              aria-label="Email information"
            >
              <span className="text-xs" aria-hidden="true">
                i
              </span>
            </button>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            data-validate="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary"
            aria-required="true"
          />
          <p
            className="text-red-500 text-sm mt-1 hidden"
            data-error="email"
            role="alert"
          />
        </div>

        {/* Care Plan For Dropdown */}
        <div>
          <label
            htmlFor="carePlanFor"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Who is the Care Plan for? <span className="text-red-500">*</span>
          </label>
          <select
            id="carePlanFor"
            name="carePlanFor"
            data-validate="required"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary appearance-none bg-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem',
            }}
            aria-required="true"
          >
            <option value="">Choose one</option>
            <option value="myself">Myself</option>
            <option value="spouse">My spouse/partner</option>
            <option value="parent">My parent</option>
            <option value="other-family">Other family member</option>
            <option value="friend">A friend</option>
          </select>
          <p
            className="text-red-500 text-sm mt-1 hidden"
            data-error="carePlanFor"
            role="alert"
          />
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-purple-primary text-white py-4 px-6 rounded-lg hover:bg-purple-dark transition-colors font-medium text-lg"
          >
            Continue
          </button>
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
          . We plan to send your Care Plan via email. If you prefer to receive the Care
          Plan by encrypted email, please let us know by calling{' '}
          <a href="tel:8008708479" className="text-purple-primary hover:underline">
            (800) 870-8479
          </a>
          .
        </div>

        {/* Security Notice */}
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
      </form>
    </div>
  );
};

export default CarePlanForm;
