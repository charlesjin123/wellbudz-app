/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   preflight: false,
  // },
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Open Sans"'],
        'poppins': ['Poppins', 'sans-serif'],
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
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
}