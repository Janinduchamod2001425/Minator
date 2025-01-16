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