# Quick Reference - TypeScript Modal System

## 🚀 Commands

```bash
# Development
npm run dev              # Start dev server

# TypeScript
npx tsc --noEmit        # Type check without emitting files
npx tsc --watch         # Watch mode for type checking

# Build
npm run build           # Production build
npm run preview         # Preview production build
```

## 📁 File Locations

```
src/
├── types/
│   ├── modal.types.ts       # Import modal types here
│   └── form.types.ts        # Import form types here
├── lib/
│   ├── modal-controller.ts  # Modal logic
│   └── form-validator.ts    # Form validation logic
└── components/
    ├── Modal.tsx            # Modal component
    └── CarePlanForm.tsx     # Form component
```

## 🔧 Common Tasks

### Add a New Modal
```tsx
// In App.tsx
<Modal
  id="my-new-modal"
  maxWidth="md"
  backdropClass="bg-gray-900/75"
>
  <YourContent />
</Modal>

// Trigger it
<button data-modal-open="my-new-modal">Open</button>
```

### Add a New Validation Rule
```typescript
// In src/lib/form-validator.ts
export const validationRules: ValidationRules = {
  // ... existing rules
  phone: (value: string): ValidationResult => {
    if (!/^\d{10}$/.test(value)) {
      return {
        isValid: false,
        errorMessage: 'Please enter a valid 10-digit phone number',
      };
    }
    return { isValid: true };
  },
};
```

### Use Validation in Form
```tsx
<input
  data-validate="phone"
  name="phone"
/>
<p data-error="phone" className="hidden" />
```

### Control Modals Programmatically
```typescript
// Open
window.Modal.open('modal-id');

// Close specific modal
window.Modal.close('modal-id');

// Close all
window.Modal.closeAll();

// Check if open
const isOpen = window.Modal.isOpen('modal-id');
```

## 📝 Type Imports

```typescript
// Modal types
import type {
  ModalProps,
  ModalId,
  ModalController
} from './types/modal.types';

// Form types
import type {
  ValidationRule,
  FormData,
  ValidationResult
} from './types/form.types';
```

## 🎨 Styling

### Backdrop Colors
```tsx
backdropClass="bg-purple-primary/90"   // Purple 90% opacity
backdropClass="bg-gray-900/75"         // Dark gray 75% opacity
backdropClass="bg-black/50"            // Black 50% opacity
```

### Modal Sizes
```tsx
maxWidth="sm"    // Small
maxWidth="md"    // Medium
maxWidth="lg"    // Large
maxWidth="xl"    // Extra large
maxWidth="2xl"   // 2X large (default)
maxWidth="3xl"   // 3X large
maxWidth="4xl"   // 4X large
maxWidth="full"  // Full width
```

## 🐛 Troubleshooting

### TypeScript Errors
```bash
# Clear and rebuild
rm -rf node_modules package-lock.json
npm install
npx tsc --noEmit
```

### Modal Not Opening
1. Check modal `id` matches trigger `data-modal-open`
2. Ensure modal-controller.ts is imported in App.tsx
3. Check browser console for errors

### Form Validation Not Working
1. Ensure form has `data-form="care-plan"`
2. Check inputs have `data-validate` attribute
3. Verify error element has `data-error` matching input name
4. Ensure form-validator.ts is imported in App.tsx

### Dev Server Issues
```bash
# Kill the server
pkill -f "vite"

# Restart
npm run dev
```

## 📖 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Full architecture guide
- **[MIGRATION.md](./MIGRATION.md)** - Migration details
- **[TYPESCRIPT-REFACTOR-COMPLETE.md](./TYPESCRIPT-REFACTOR-COMPLETE.md)** - Complete summary

## 🎯 Key Files

| Purpose | File |
|---------|------|
| Modal logic | `src/lib/modal-controller.ts` |
| Form validation | `src/lib/form-validator.ts` |
| Modal component | `src/components/Modal.tsx` |
| Form component | `src/components/CarePlanForm.tsx` |
| Type definitions | `src/types/*.ts` |
| Entry point | `src/main.tsx` |
| App root | `src/App.tsx` |

## 🔥 Hot Tips

1. **Use TypeScript autocomplete** - Press `Ctrl+Space` for suggestions
2. **Hover for types** - Hover over any variable to see its type
3. **Go to definition** - Cmd/Ctrl+Click to jump to source
4. **Find all references** - Right-click → Find All References
5. **Rename safely** - Right-click → Rename Symbol (updates all usages)

## ✅ Checklist for New Features

- [ ] Define types in `src/types/`
- [ ] Add business logic in `src/lib/`
- [ ] Create component in `src/components/`
- [ ] Import component in `App.tsx`
- [ ] Run `npx tsc --noEmit` to verify types
- [ ] Test in browser
- [ ] Update documentation

---

**Need Help?** Check the full documentation files listed above!
