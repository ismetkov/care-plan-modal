# Care Plan Modal - React + Tailwind CSS

A beautiful, interactive modal form built with React and Tailwind CSS, inspired by modern healthcare user experiences.

## Features

- 🎨 **Styled with Tailwind CSS** - Beautiful, responsive design
- ⚛️ **React Components** - Modular and reusable
- ✅ **Form Validation** - Real-time validation with error messages
- 🎭 **Modal Overlay** - Smooth modal experience with backdrop
- 📱 **Responsive Design** - Works on all screen sizes
- ♿ **Accessible** - Keyboard navigation and ARIA labels

## Project Structure

```
care-plan-modal/
├── src/
│   ├── components/
│   │   ├── Modal.jsx           # Reusable modal component
│   │   └── CarePlanForm.jsx    # Multi-step form component
│   ├── App.jsx                 # Main application
│   ├── index.css               # Tailwind directives
│   └── main.jsx                # Entry point
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── package.json
```

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Components

### Modal Component

A reusable modal component with the following features:
- Backdrop overlay with purple gradient
- Close button
- Body scroll lock when open
- Click outside to close

Usage:
```jsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <YourContent />
</Modal>
```

### CarePlanForm Component

A multi-step form with:
- First name and last name inputs
- Email validation
- Dropdown selection
- Form validation
- Error handling
- Progress indicator

## Customization

### Colors

The project uses custom purple colors defined in [tailwind.config.js](tailwind.config.js):

```js
colors: {
  'purple-primary': '#9B7EBD',
  'purple-dark': '#7B5FA0',
}
```

### Form Fields

Edit [src/components/CarePlanForm.jsx](src/components/CarePlanForm.jsx) to add or modify form fields.

## Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **ESLint** - Code linting

## License

MIT
