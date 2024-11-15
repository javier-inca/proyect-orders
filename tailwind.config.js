/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors:{
        'primary' : '#414B6F',
        'secondary' : '#64C5CC',
        'danger' : '#E41925',
        'warning' : '#FFBC18',
        'black-custom':'#8A8D8F'
      },
      screens:{
        '3xl': '1800px',
      }
    },
  },
  plugins: [],
}

