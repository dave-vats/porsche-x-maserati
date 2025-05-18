/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B2535'
      },
      screens: {
        fold: '278px',
        _510 : '510px',
        _451 : '451px',
        _400 : '400px',
        _300 : '300px',
        _350: '350px',
        _700 : '700px'
      },
      fontFamily: {
        dancingScript: "'Dancing Script', cursive",
        aquire: "'Aquire', sans-serif"
      }
    },
  },
  plugins: [],
}