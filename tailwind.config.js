/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#60c3d2', // logo blue
          black: '#111111',
        },
        primary: '#60c3d2',
        dark: '#111111',
      },
      boxShadow: {
        'calm': '0 4px 24px 0 rgba(29, 233, 182, 0.15)',
      },
    },
  },
  plugins: [],
}