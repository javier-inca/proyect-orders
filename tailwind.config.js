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
        'light-primary' : '#D9DBE2',
        
        'secondary' : '#64C5CC',
        'light-secondary' : '#E0F3F5',

        'danger' : '#EA4F2C',
        'light-danger' : '#FBDCD5',

        'warning' : '#ED9201',
        'light-warning' : '#FBE9CC',
        
        'information' : '#0272E6',
        'light-information' : '#CCE3FA',

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

