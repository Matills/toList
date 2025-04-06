/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#212121',
        'primary': '#D94D3E',
        'accent': '#F3A712',
        'light-bg': '#FAFAFA',
      }
    },
  },
  plugins: [],
}