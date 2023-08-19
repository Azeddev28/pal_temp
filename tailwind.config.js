/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        trueWhite: '#FFFFFF',
        blue: '#0000FF',
        background: '#C5C6D0',
        black: '#151D23',  
        brandBlue: '#005382',
        brandSecondaryBlue: '#D2EFFF',
        hoverBlue: '#00446A',
        pressedBlue: '#002B43',
        disabledBlue: '#CCDDE6',
        grey0: '#F0F0F0',
        grey10: '#CACACA',
        grey20: '#939393',
        grey30: '#555555',
        grey40: '#2F2F2F',
      }
    },
  },
  plugins: [],
}