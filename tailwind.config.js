/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lp-yellow': '#FDE047',
        'lp-black': '#0C0B10',
        'lp-orange': '#FC8019',
        'lp-purple': '#C3B1E1',
        'lp-card': '#1A1822',
        'lp-gray': '#9CA3AF',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
