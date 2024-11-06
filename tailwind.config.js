/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#F8C601',
        'secondary':'#FF2940',
        'black-custom':'#1E1E21'
      }
    },
  },
  plugins: [],
}

