const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fallback mapping for clean light theme
        navy: {
          950: '#FFFFFF',
          900: '#F9FAFB',
          800: '#F3F4F6',
          700: '#E5E7EB',
          600: '#D1D5DB',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F9FAFB',
          subtle: '#F3F4F6',
        },
        cyan: {
          ...colors.cyan,
          DEFAULT: '#0284C7',
          glow: 'rgba(2, 132, 199, 0.15)',
        },
        violet: {
          ...colors.violet,
          DEFAULT: '#4F46E5',
          glow: 'rgba(79, 70, 229, 0.15)',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'axiom-gradient': 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(2, 132, 199, 0.15)' },
          '50%': { boxShadow: '0 0 25px rgba(2, 132, 199, 0.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
