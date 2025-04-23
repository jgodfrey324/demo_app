/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',  // include all pages under src
    './src/components/**/*.{js,ts,jsx,tsx}',  // include all components under src (if you have them)
    './src/features/**/*.{js,ts,jsx,tsx}',  // include all features under src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

