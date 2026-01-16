/**
 * FormInput Component
 * Reusable text input field with label
 */

import React from 'react';

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'tel' | 'email';
  required?: boolean;
  optional?: boolean;
  maxLength?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  optional = false,
  maxLength,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}{' '}
        {required && <span className="text-red-500">*</span>}
        {optional && <span className="text-gray-400 font-normal">Optional</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-primary"
        required={required}
        maxLength={maxLength}
      />
    </div>
  );
};

export default FormInput;
