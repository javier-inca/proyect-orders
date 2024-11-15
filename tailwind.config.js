/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#414B6F',
        'secondary' : '#64C5CC',
        'danger' : '#EA4F2C',
        'warning' : '#ED9201',
        'information' : '#0272E6',
        'success' : '#42BB6B',
        'light-success' : '#DFF2E3',
        'black-custom':'#8A8D8F'
      },

      screens: {
        '3xl': '1800px',
      },
    },
  },
  plugins: [],
}

