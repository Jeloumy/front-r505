/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F21D56',
        'secondary': '#145873',
        'accent': '#35BDF2',
        'background': '#0F1921',
        'text': '#F2D6BD',
        'highlight': '#F2955E',
      },
      backgroundColor: {
        'custom-bg-color': '#2C3B4F',
      },},
  },
  plugins: [require("daisyui")],
}

