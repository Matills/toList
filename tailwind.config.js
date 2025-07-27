module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#121212',
          secondary: '#1E1E1E',
        },
        primary: '#1446a0',
        secondary: '#F8B400',
        text: {
          primary: '#E0E0E0',
          secondary: '#A0A0A0',
        },
        border: '#2A2A2A',
        success: '#22C55E',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
};
