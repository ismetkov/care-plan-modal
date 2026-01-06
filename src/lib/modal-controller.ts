/**
 * Modal Controller
 * Clean, type-safe modal management system using functional programming
 */

import type { ModalId, ModalController, ModalCloseEvent } from '../types/modal.types';

/**
 * Modal State
 * Pure state management functions
 */
type ModalState = Set<ModalId>;

const createState = (): ModalState => new Set<ModalId>();

const addModal = (state: ModalState, id: ModalId): ModalState => {
  state.add(id);
  return state;
};

const removeModal = (state: ModalState, id: ModalId): ModalState => {
  state.delete(id);
  return state;
};

const hasModal = (state: ModalState, id: ModalId): boolean => state.has(id);

const getModalCount = (state: ModalState): number => state.size;

const getAllModals = (state: ModalState): ModalId[] => Array.from(state);

/**
 * DOM Utilities
 * Pure functions for DOM operations
 */
const findModal = (modalId: ModalId): HTMLElement | null =>
  document.querySelector(`[data-modal="${modalId}"]`);

const findOpenModal = (): HTMLElement | null =>
  document.querySelector('[data-modal].block');

const findAllOpenModals = (): HTMLElement[] =>
  Array.from(document.querySelectorAll('[data-modal].block'));

const findDisclaimer = (modalId: ModalId): HTMLElement | null =>
  document.querySelector(`[data-modal-disclaimer="${modalId}"]`);

const lockBodyScroll = (): void => {
  document.body.style.overflow = 'hidden';
};

const unlockBodyScroll = (): void => {
  document.body.style.overflow = 'unset';
};

const addClass = (element: HTMLElement, ...classes: string[]): void => {
  element.classList.add(...classes);
};

const removeClass = (element: HTMLElement, ...classes: string[]): void => {
  element.classList.remove(...classes);
};

/**
 * Modal Animation
 * Pure functions for modal animations
 */
const ANIMATION_DURATION = 300;

const showModal = (modal: HTMLElement): void => {
  removeClass(modal, 'hidden');
  addClass(modal, 'block');

  requestAnimationFrame(() => {
    removeClass(modal, 'opacity-0');
    addClass(modal, 'opacity-100');
  });
};

const hideModal = (modal: HTMLElement, onComplete: () => void): void => {
  removeClass(modal, 'opacity-100');
  addClass(modal, 'opacity-0');

  setTimeout(() => {
    removeClass(modal, 'block');
    addClass(modal, 'hidden');
    onComplete();
  }, ANIMATION_DURATION);
};

/**
 * Event Emission
 * Pure functions for event dispatching
 */
const emitOpenEvent = (modalId: ModalId): void => {
  window.dispatchEvent(
    new CustomEvent('modal:open', {
      detail: { modalId, timestamp: Date.now() },
    })
  );
};

const emitCloseEvent = (modalId: ModalId, reason: ModalCloseEvent['reason']): void => {
  window.dispatchEvent(
    new CustomEvent('modal:close', {
      detail: { modalId, timestamp: Date.now(), reason },
    })
  );
};

/**
 * Modal Operations
 * Core modal functions with state management
 */
const createOpenModal = (state: ModalState) => (modalId: ModalId): void => {
  const modal = findModal(modalId);

  if (!modal) {
    console.warn(`Modal with id "${modalId}" not found`);
    return;
  }

  // Track open modal
  addModal(state, modalId);

  // Lock body scroll
  lockBodyScroll();

  // Update z-index for layering
  const zIndex = 50 + getModalCount(state);
  modal.style.zIndex = zIndex.toString();

  // Show disclaimer if exists
  const disclaimer = findDisclaimer(modalId);
  if (disclaimer) {
    removeClass(disclaimer, 'hidden');
    addClass(disclaimer, 'block');
  }

  // Show modal with animation
  showModal(modal);

  // Emit event
  emitOpenEvent(modalId);
};

const createCloseModal = (state: ModalState) => (
  modalId?: ModalId,
  reason: ModalCloseEvent['reason'] = 'programmatic'
): void => {
  const modalToClose = modalId ? findModal(modalId) : findOpenModal();

  if (!modalToClose) return;

  const modalIdValue = modalToClose.getAttribute('data-modal');
  if (!modalIdValue) return;

  // Remove from tracking
  removeModal(state, modalIdValue);

  // Hide disclaimer if exists
  const disclaimer = findDisclaimer(modalIdValue);
  if (disclaimer) {
    removeClass(disclaimer, 'block');
    addClass(disclaimer, 'hidden');
  }

  // Hide modal with animation
  hideModal(modalToClose, () => {
    // Unlock body scroll only if no modals are open
    if (getModalCount(state) === 0) {
      unlockBodyScroll();
    }
  });

  // Emit event
  emitCloseEvent(modalIdValue, reason);
};

const createCloseAllModals = (closeModal: ReturnType<typeof createCloseModal>) => (): void => {
  const openModals = findAllOpenModals();
  openModals.forEach((modal) => {
    const modalId = modal.getAttribute('data-modal');
    if (modalId) {
      closeModal(modalId);
    }
  });
};

/**
 * Event Handlers
 * Pure event handler functions
 */
const createHandleOpenClick = (openModal: ReturnType<typeof createOpenModal>) => (
  e: MouseEvent
): void => {
  const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-modal-open]');

  if (trigger) {
    e.preventDefault();
    const modalId = trigger.getAttribute('data-modal-open');
    if (modalId) {
      openModal(modalId);
    }
  }
};

const createHandleCloseClick = (
  openModal: ReturnType<typeof createOpenModal>,
  closeModal: ReturnType<typeof createCloseModal>
) => (e: MouseEvent): void => {
  const closeTrigger = (e.target as HTMLElement).closest<HTMLElement>('[data-modal-close]');

  if (closeTrigger) {
    e.preventDefault();
    e.stopPropagation();

    // Find the modal we're trying to close
    const modalContainer = (e.target as HTMLElement).closest<HTMLElement>('[data-modal]');
    if (!modalContainer) {
      closeModal(undefined, 'user');
      return;
    }

    const modalId = modalContainer.getAttribute('data-modal');
    const requiresConfirmation = modalContainer.getAttribute('data-requires-confirmation') === 'true';
    const confirmationModalId = modalContainer.getAttribute('data-confirmation-modal-id');

    // If this modal requires confirmation
    if (requiresConfirmation && confirmationModalId) {
      // Check if we're already IN the confirmation modal
      const isConfirmationModal = modalContainer.getAttribute('data-modal') === confirmationModalId;

      if (isConfirmationModal) {
        // "Keep going" button - only close the confirmation modal
        closeModal(confirmationModalId, 'user');
        return;
      }

      // Show confirmation modal on top WITHOUT closing the current modal
      openModal(confirmationModalId);
      return;
    }

    // Close normally for modals that don't require confirmation
    closeModal(modalId || undefined, 'user');
  }
};

const createHandleConfirmCancel = (closeModal: ReturnType<typeof createCloseModal>) => (
  e: MouseEvent
): void => {
  const confirmButton = (e.target as HTMLElement).closest<HTMLElement>('[data-confirm-cancel]');

  if (confirmButton) {
    e.preventDefault();

    // Find the confirmation modal we're in
    const confirmationModal = confirmButton.closest<HTMLElement>('[data-modal]');
    if (!confirmationModal) return;

    const confirmationModalId = confirmationModal.getAttribute('data-modal');
    if (!confirmationModalId) return;

    // Find the modal that required this confirmation by searching for a modal with this confirmation modal ID
    const parentModal = document.querySelector<HTMLElement>(
      `[data-confirmation-modal-id="${confirmationModalId}"]`
    );

    if (parentModal) {
      const parentModalId = parentModal.getAttribute('data-modal');
      // Close both the confirmation modal and the parent modal
      closeModal(confirmationModalId, 'user');
      if (parentModalId) {
        closeModal(parentModalId, 'user');
      }
    } else {
      // Fallback: just close the confirmation modal
      closeModal(confirmationModalId, 'user');
    }
  }
};

const createHandleEscapeKey = (
  state: ModalState,
  closeModal: ReturnType<typeof createCloseModal>
) => (e: KeyboardEvent): void => {
  if (e.key === 'Escape' && getModalCount(state) > 0) {
    closeModal(undefined, 'escape');
  }
};

/**
 * Event Listener Setup
 */
const setupEventListeners = (
  handleOpenClick: (e: MouseEvent) => void,
  handleCloseClick: (e: MouseEvent) => void,
  handleConfirmCancel: (e: MouseEvent) => void,
  handleEscapeKey: (e: KeyboardEvent) => void
): void => {
  document.addEventListener('click', handleOpenClick);
  document.addEventListener('click', handleCloseClick);
  document.addEventListener('click', handleConfirmCancel);
  document.addEventListener('keydown', handleEscapeKey);
};

/**
 * Main Modal Controller Factory
 * Creates and initializes the modal system using closures
 */
export function createModalController(): ModalController {
  // Create shared state
  const state = createState();

  // Create core functions with state access
  const openModal = createOpenModal(state);
  const closeModal = createCloseModal(state);
  const closeAllModals = createCloseAllModals(closeModal);

  // Create event handlers with access to modal operations
  const handleOpenClick = createHandleOpenClick(openModal);
  const handleCloseClick = createHandleCloseClick(openModal, closeModal);
  const handleConfirmCancel = createHandleConfirmCancel(closeModal);
  const handleEscapeKey = createHandleEscapeKey(state, closeModal);

  // Setup event listeners
  setupEventListeners(handleOpenClick, handleCloseClick, handleConfirmCancel, handleEscapeKey);

  // Return public API
  return {
    open: openModal,
    close: closeModal,
    closeAll: closeAllModals,
    isOpen: (modalId: ModalId) => hasModal(state, modalId),
  };
}

/**
 * Initialize modal controller when DOM is ready
 */
const initWhenReady = (callback: () => void): void => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

// Initialize and expose globally
let modalController: ModalController;

initWhenReady(() => {
  modalController = createModalController();

  // Expose globally for backward compatibility
  (window as any).Modal = modalController;
});

export { modalController };
