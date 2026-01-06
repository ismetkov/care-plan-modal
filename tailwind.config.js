/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#9B7EBD',
        'purple-dark': '#7B5FA0',
      },
    },
  },
  plugins: [],
}
