/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.tsx',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#024E44',
          main: '#90C841',
          light: '#98B80B',
        },
        background: {
          dark: '#024E44',
          light: '#FFFFFF',
        },
      },
      fontFamily: {
        jakarta: ['PlusJakartaSans-Regular'],
        'jakarta-medium': ['PlusJakartaSans-Medium'],
        'jakarta-semibold': ['PlusJakartaSans-SemiBold'],
        'jakarta-bold': ['PlusJakartaSans-Bold'],
        'jakarta-extrabold': ['PlusJakartaSans-ExtraBold'],
      },
    },
  },
  plugins: [],
};
