/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        logo: ['logo', 'sans-serif'],
        game: ['game', 'sans-serif'],
      },
      height: {
        '10p': '10%',
        '5p': '5%',
      },
    },
  },
  plugins: [],
};
