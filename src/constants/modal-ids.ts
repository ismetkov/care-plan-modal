/**
 * Modal ID Constants
 * Centralized modal identifiers used throughout the application
 */

export const MODAL_IDS = {
  CARE_PLAN: 'care-plan',
  CONFIRM_CLOSE: 'confirm-close',
  EXAMPLE: 'example',
} as const;

export type ModalId = (typeof MODAL_IDS)[keyof typeof MODAL_IDS];
