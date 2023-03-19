/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'body' : ['Space Grotesk', 'sans-serif'],
      },
      colors:{
        'primary' : '#151965',
        'secondary' : '#32407B',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
