/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkmode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        logo: ['logo', 'sans-serif'],
        game: ['game', 'sans-serif'],
        gamebold: ['gamebold', 'sans-serif'],
      },
      height: {
        '10p': '10%',
        '5p': '5%',
      },
      backgroundImage: {
        twitch: "url('/src/assets/twitch-bg.png')",
        kick: "url('/src/assets/kick-bg2-dark.png')",
        youtube: "url('/src/assets/youtube-bg5.png')",
      },
    },
  },
  plugins: [],
};
