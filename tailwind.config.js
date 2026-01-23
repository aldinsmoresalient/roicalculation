/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        halant: ['Halant', 'Georgia', 'serif'],
        geist: ['Geist', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#FAF6F2',
        'cream-secondary': '#F6F0E9',
        charcoal: '#0F0F0F',
      },
      borderRadius: {
        '4xl': '24px',
      },
    },
  },
  plugins: [],
}
