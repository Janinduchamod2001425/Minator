/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "button-bg": "#A5B4FC",
        "button-text": "#1E1B4B",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        product: ['"Product Sans"', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'], // Add Roboto font
        lato: ['Lato', 'sans-serif'],     // Add Lato font
        montserrat: ['Montserrat', 'sans-serif'], // Add Montserrat font
      },
      keyframes: {
        smoothVibrate: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '50% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        smoothVibrate: 'smoothVibrate 10s ease-in-out',
      },
    },
  },
  plugins: [],
}