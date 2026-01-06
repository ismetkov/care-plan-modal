/**
 * Form Validation Types
 * Type-safe form validation system
 */

export type ValidationRule = 'required' | 'email';

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export interface FormField {
  name: string;
  value: string;
  validationRule?: ValidationRule;
  label?: string;
}

export interface FormData {
  [key: string]: string;
}

export type ValidatorFunction = (value: string, fieldLabel: string) => ValidationResult;

export interface ValidationRules {
  [key: string]: ValidatorFunction;
}
