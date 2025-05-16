/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'indigo': {
          900: '#312e81', // Deep indigo for main branding
          800: '#3730a3',
          700: '#4338ca',
          600: '#4f46e5',
        },
        'blue': {
          700: '#1d4ed8',
          600: '#2563eb',
        },
        'orange': {
          600: '#ea580c',
          500: '#f97316',
        },
        'teal': {
          500: '#14b8a6',
          400: '#2dd4bf',
        },
        'coral': {
          500: '#ff6b6b',
        },
      },
    },
  },
  plugins: [],
} 