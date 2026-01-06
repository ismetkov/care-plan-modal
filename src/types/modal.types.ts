/**
 * Modal System Types
 * Provides type safety for the modal controller and components
 */

export type ModalId = string;

export interface ModalState {
  openModals: Set<ModalId>;
}

export interface ModalController {
  open: (modalId: ModalId) => void;
  close: (modalId?: ModalId) => void;
  closeAll: () => void;
  isOpen: (modalId: ModalId) => boolean;
}

export interface ModalProps {
  id: ModalId;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
  showCloseButton?: boolean;
  backdropClass?: string;
  disclaimer?: React.ReactNode;
  requiresConfirmation?: boolean;
  confirmationModalId?: ModalId;
}

export interface ModalConfig {
  id: ModalId;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  requiresConfirmation?: boolean;
  confirmationModalId?: ModalId;
}

// Data attributes for modal triggers
export type ModalTriggerAttribute = 'data-modal-open' | 'data-modal-close' | 'data-confirm-cancel';

// Modal event types
export interface ModalOpenEvent {
  modalId: ModalId;
  timestamp: number;
}

export interface ModalCloseEvent {
  modalId: ModalId;
  timestamp: number;
  reason: 'user' | 'backdrop' | 'escape' | 'programmatic';
}
