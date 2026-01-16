/**
 * VideoForm Component
 * Complete form for video visit including header, location fields, and contact info
 */

import React from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import ContactInfoSection from './ContactInfoSection';
import StepHeader from './StepHeader';
import { US_STATES } from './constants';
import { LocationFormProps } from './types';

const VideoForm: React.FC<LocationFormProps> = ({ formData, onChange, recipientName }) => {
  const cityLabel = recipientName ? `${recipientName}'s City` : 'City';

  return (
    <>
      <StepHeader
        title="Let's get the details for your video visit"
        description="This lets us locate a nurse licensed in your area."
      />

      <div className="space-y-6">
        <FormInput
          id="city"
          name="city"
          label={cityLabel}
          value={formData.city}
          onChange={onChange}
          placeholder="City"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            id="state"
            name="state"
            label="State"
            value={formData.state}
            onChange={onChange}
            options={US_STATES}
            required
          />

          <FormInput
            id="zip"
            name="zip"
            label="ZIP"
            value={formData.zip}
            onChange={onChange}
            placeholder="ZIP"
            required
            maxLength={10}
          />
        </div>
      </div>

      <ContactInfoSection phone={formData.phone} onChange={onChange} />
    </>
  );
};

export default VideoForm;
