/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bobsburgers: ['bobsburgers', 'sans-serif'],
      },
      width: {
        '1/10': '10%',
        '1/8': '12.5%',
      },
    },
  },
  plugins: [],
};
