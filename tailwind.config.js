const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#06091E',
          900: '#0B0F2E',
          800: '#0D1238',
          700: '#101642',
          600: '#1B1464',
        },
        cyan: {
          ...colors.cyan,
          DEFAULT: '#22D3EE',
          glow: 'rgba(34,211,238,0.3)',
        },
        violet: {
          ...colors.violet,
          DEFAULT: '#7C5CFF',
          glow: 'rgba(124,92,255,0.3)',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'axiom-gradient': 'linear-gradient(135deg, #0B0F2E 0%, #1B1464 100%)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34,211,238,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(34,211,238,0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
