/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["PT\\ Sans"],
      },
      backgroundImage: {
        "lemon-background": "url('/img/background.png')",
        "cups-background": "url('/img/cups.png')",
      },
      colors: {
        "lemon-background-color": "#febe87",
        "cups-background-color": "#ebebeb",
        "wb-orange": "#FD7C00",
        "wb-blue": "#48B4E4",
      },
    },
  },
  plugins: [],
}
