/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bw: {
          900: '#0b0b0b',
          800: '#1f1f1f',
          700: '#333333',
          500: '#6b6b6b',
          300: '#bdbdbd',
          100: '#f3f3f3',
        },
        surface: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        md: '0.5rem',
        lg: '0.75rem',
      },
    },
  },
  plugins: [],
};
