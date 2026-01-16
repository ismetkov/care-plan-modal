/**
 * InHomeForm Component
 * Complete form for in-home visit including header, address fields, and contact info
 */

import React from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import ContactInfoSection from './ContactInfoSection';
import StepHeader from './StepHeader';
import { US_STATES } from './constants';
import { LocationFormProps } from './types';

const InHomeForm: React.FC<LocationFormProps> = ({ formData, onChange, recipientName }) => {
  const addressLabel = recipientName ? `${recipientName}'s address` : 'Address';

  return (
    <>
      <StepHeader
        title="Let's get the details for your in-home visit"
        description="We recommend that the evaluation is done in the care recipient's normal environment."
      />

      <div className="space-y-6">
        <FormInput
          id="address"
          name="address"
          label={addressLabel}
          value={formData.address}
          onChange={onChange}
          placeholder="Address"
          required
        />

        <FormInput
          id="apartment"
          name="apartment"
          label="Apartment / Unit / Suite"
          value={formData.apartment}
          onChange={onChange}
          placeholder="Apartment / Unit / Suite"
          optional
        />

        <FormInput
          id="city"
          name="city"
          label="City"
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

export default InHomeForm;
