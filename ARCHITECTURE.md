# Care Plan Modal - TypeScript Architecture

## Overview

This project has been refactored to TypeScript with clean architecture principles, following SOLID design patterns and best practices.

## Project Structure

```
src/
├── types/              # TypeScript type definitions
│   ├── modal.types.ts  # Modal system types
│   └── form.types.ts   # Form validation types
├── lib/                # Core business logic
│   ├── modal-controller.ts  # Modal state management
│   └── form-validator.ts    # Form validation logic
├── components/         # React components
│   ├── Modal.tsx       # Reusable modal component
│   └── CarePlanForm.tsx # Care plan form
├── App.tsx             # Main application
└── main.tsx            # Application entry point
```

## Architecture Principles

### 1. **Separation of Concerns**
- **Types**: Centralized type definitions in `/types`
- **Business Logic**: Core logic in `/lib` (modal controller, form validator)
- **UI Components**: Presentational components in `/components`
- **Configuration**: TypeScript config, Vite config

### 2. **Class-Based Architecture**

#### Modal System
The modal controller uses a clean class-based architecture:

- `ModalStateManager`: Manages modal open/close state
- `ModalAnimationController`: Handles show/hide animations
- `ModalOpener`: Responsible for opening modals with proper state
- `ModalCloser`: Handles closing with cleanup
- `ModalEventHandler`: Manages DOM events and user interactions

#### Form Validation System
- `FieldErrorManager`: Manages showing/hiding field errors
- `FieldValidator`: Validates individual fields
- `FormValidator`: Validates entire forms
- `FormSubmitHandler`: Handles form submission logic
- `FormEventHandler`: Manages form events

### 3. **Type Safety**
All code is fully typed with TypeScript:
- Interface definitions for all public APIs
- Type guards for DOM operations
- Generic types where appropriate
- No `any` types (strict mode enabled)

### 4. **SOLID Principles**

- **Single Responsibility**: Each class has one clear purpose
- **Open/Closed**: Extensible through composition
- **Liskov Substitution**: Proper inheritance where used
- **Interface Segregation**: Focused interfaces
- **Dependency Inversion**: Classes depend on abstractions

### 5. **Pure Functions**
DOM utilities and validation rules are implemented as pure functions where possible.

## Key Features

### Modal System
- ✅ Multiple modal support with z-index management
- ✅ Confirmation dialogs before closing
- ✅ Backdrop click to close
- ✅ ESC key to close
- ✅ Body scroll locking
- ✅ Smooth CSS animations
- ✅ Fully accessible (ARIA attributes)
- ✅ Responsive (mobile-first design)

### Form Validation
- ✅ Real-time validation
- ✅ Custom validation rules
- ✅ Error message display
- ✅ Type-safe form data collection
- ✅ Accessible error announcements

## Usage

### Opening a Modal
```typescript
// Via data attribute
<button data-modal-open="modal-id">Open Modal</button>

// Programmatically
window.Modal.open('modal-id');
```

### Creating a Modal
```tsx
<Modal
  id="my-modal"
  maxWidth="md"
  backdropClass="bg-gray-900/75"
  showCloseButton={true}
  disclaimer={<>Optional disclaimer</>}
>
  <YourContent />
</Modal>
```

### Form Validation
```tsx
<input
  data-validate="email"
  name="email"
  // ...
/>
<p data-error="email" className="hidden" />
```

## Type Exports

### Modal Types
```typescript
import type { ModalProps, ModalController, ModalId } from './types/modal.types';
```

### Form Types
```typescript
import type { ValidationRule, FormData, ValidationResult } from './types/form.types';
```

## Development

### Run Development Server
```bash
npm run dev
```

### Type Check
```bash
npx tsc --noEmit
```

### Build for Production
```bash
npm run build
```

## Best Practices Implemented

1. **Immutability**: State changes are explicit and controlled
2. **Event Delegation**: Single event listeners for all modals/forms
3. **Memory Management**: Proper cleanup and event removal
4. **Accessibility**: ARIA attributes, keyboard navigation
5. **Performance**: RequestAnimationFrame for animations
6. **Error Handling**: Graceful degradation and console warnings
7. **Documentation**: JSDoc comments throughout
8. **Naming**: Clear, descriptive names following conventions

## Future Enhancements

- [ ] Add unit tests (Jest + Testing Library)
- [ ] Add Storybook for component documentation
- [ ] Add custom hooks for React integration
- [ ] Add animation customization options
- [ ] Add modal focus trap
- [ ] Add modal history stack
