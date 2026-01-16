/**
 * ContactInfoSection Component
 * Primary contact info section with phone number field
 */

import React from 'react';
import FormInput from './FormInput';

interface ContactInfoSectionProps {
  phone: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ phone, onChange }) => {
  return (
    <div className="mt-8 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Primary contact info</h3>
        <p className="text-sm text-gray-600">
          We'll only use this to confirm the appointment and for important communication.
        </p>
      </div>

      <FormInput
        id="phone"
        name="phone"
        label="Best phone number for reminders"
        value={phone}
        onChange={onChange}
        placeholder="Phone number"
        type="tel"
        required
      />
    </div>
  );
};

export default ContactInfoSection;
