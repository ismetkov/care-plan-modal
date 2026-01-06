/**
 * Form Validation Controller
 * Type-safe form validation with clean architecture
 */

import type {
  ValidationResult,
  ValidationRule,
  ValidationRules,
  FormData,
} from '../types/form.types';

/**
 * DOM Utilities for Form Elements
 */
const FormDOMUtils = {
  findForm: (formId: string): HTMLFormElement | null =>
    document.querySelector(`[data-form="${formId}"]`),

  findErrorElement: (fieldName: string): HTMLElement | null =>
    document.querySelector(`[data-error="${fieldName}"]`),

  getFieldLabel: (input: HTMLInputElement): string => {
    const label = document.querySelector<HTMLLabelElement>(`label[for="${input.id}"]`);
    return label ? label.textContent?.replace('*', '').trim() || input.name : input.name;
  },

  addErrorStyling: (input: HTMLInputElement): void => {
    input.classList.remove('border-gray-300');
    input.classList.add('border-red-500');
  },

  removeErrorStyling: (input: HTMLInputElement): void => {
    input.classList.remove('border-red-500');
    input.classList.add('border-gray-300');
  },

  showErrorMessage: (errorElement: HTMLElement, message: string): void => {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  },

  hideErrorMessage: (errorElement: HTMLElement): void => {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  },
};

/**
 * Validation Rules
 * Pure validation functions
 */
const isEmpty = (value: string): boolean => !value.trim();
const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

export const validationRules: ValidationRules = {
  required: (value: string, fieldLabel: string): ValidationResult => {
    if (isEmpty(value)) {
      return {
        isValid: false,
        errorMessage: `${fieldLabel} is required`,
      };
    }
    return { isValid: true };
  },

  email: (value: string): ValidationResult => {
    if (isEmpty(value)) {
      return {
        isValid: false,
        errorMessage: 'Email is required',
      };
    }
    if (!isValidEmail(value)) {
      return {
        isValid: false,
        errorMessage: 'Please enter a valid email',
      };
    }
    return { isValid: true };
  },
};

/**
 * Field Error Manager
 * Handles showing/hiding field errors
 */
class FieldErrorManager {
  showError(input: HTMLInputElement, message: string): void {
    const errorElement = FormDOMUtils.findErrorElement(input.name);
    if (errorElement) {
      FormDOMUtils.showErrorMessage(errorElement, message);
    }
    FormDOMUtils.addErrorStyling(input);
  }

  clearError(input: HTMLInputElement): void {
    const errorElement = FormDOMUtils.findErrorElement(input.name);
    if (errorElement) {
      FormDOMUtils.hideErrorMessage(errorElement);
    }
    FormDOMUtils.removeErrorStyling(input);
  }
}

/**
 * Field Validator
 * Validates individual form fields
 */
class FieldValidator {
  constructor(private errorManager: FieldErrorManager) {}

  validate(input: HTMLInputElement): boolean {
    const value = input.value.trim();
    const validationRule = input.getAttribute('data-validate') as ValidationRule;
    const fieldLabel = FormDOMUtils.getFieldLabel(input);

    const validator = validationRules[validationRule];

    if (!validator) return true;

    const result = validator(value, fieldLabel);

    if (!result.isValid && result.errorMessage) {
      this.errorManager.showError(input, result.errorMessage);
      return false;
    }

    return true;
  }
}

/**
 * Form Validator
 * Validates entire forms
 */
class FormValidator {
  constructor(private fieldValidator: FieldValidator) {}

  validate(form: HTMLFormElement): boolean {
    const inputs = Array.from(
      form.querySelectorAll<HTMLInputElement>('[data-validate]')
    );
    const results = inputs.map((input) => this.fieldValidator.validate(input));
    return results.every((result) => result === true);
  }

  collectFormData(form: HTMLFormElement): FormData {
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries()) as FormData;
  }
}

/**
 * Form Submit Handler
 * Handles form submission
 */
class FormSubmitHandler {
  constructor(private formValidator: FormValidator) {}

  handle(form: HTMLFormElement): void {
    if (!this.formValidator.validate(form)) return;

    const data = this.formValidator.collectFormData(form);
    console.log('Form submitted:', data);
    alert('Form submitted successfully!');

    // Additional logic can be added here:
    // - Send data to API
    // - Close modal
    // - Show success message
    // - Navigate to next step
  }
}

/**
 * Form Event Handler
 * Manages form events
 */
class FormEventHandler {
  constructor(
    private submitHandler: FormSubmitHandler,
    private errorManager: FieldErrorManager
  ) {}

  handleFormSubmit = (e: Event): void => {
    const form = (e.target as HTMLElement).closest<HTMLFormElement>(
      '[data-form="care-plan"]'
    );

    if (form) {
      e.preventDefault();
      this.submitHandler.handle(form);
    }
  };

  handleInputChange = (e: Event): void => {
    const input = e.target as HTMLInputElement;

    if (input.hasAttribute('data-validate')) {
      this.errorManager.clearError(input);
    }
  };

  setupEventListeners(): void {
    document.addEventListener('submit', this.handleFormSubmit);
    document.addEventListener('input', this.handleInputChange);
    document.addEventListener('change', this.handleInputChange);
  }
}

/**
 * Form Controller Factory
 * Creates and initializes the form validation system
 */
export function createFormController(): void {
  const errorManager = new FieldErrorManager();
  const fieldValidator = new FieldValidator(errorManager);
  const formValidator = new FormValidator(fieldValidator);
  const submitHandler = new FormSubmitHandler(formValidator);
  const eventHandler = new FormEventHandler(submitHandler, errorManager);

  // Setup event listeners
  eventHandler.setupEventListeners();
}

/**
 * Initialize form controller when DOM is ready
 */
function initWhenReady(callback: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

// Initialize
initWhenReady(() => {
  createFormController();
});
