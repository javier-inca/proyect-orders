/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#E77523',
        'secondary':'#18243C',
        'black-custom':'#182339'
      },
      screens:{
        '3xl': '1800px',
      }
    },
  },
  plugins: [],
}

