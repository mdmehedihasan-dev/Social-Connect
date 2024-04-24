/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#5F35F5"
      },
      width: {
        'box': '400px',
        'small':'340px'
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}