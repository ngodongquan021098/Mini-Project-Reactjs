/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

const listBackgroundSafeList = ['#799ED2', '#8882C9', '#66CC86', '#E93335', '#CE8355'].map(el => `bg-[${el}]`)
const listColorSafeList = ['#799ED2', '#8882C9', '#66CC86', '#E93335', '#CE8355'].map(el => `text-[${el}]`)
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-[#F8CC68]', 'bg-[#F6959D]', 'bg-[#7BC2B1]', 'border-[#F8CC68]', 'border-[#F6959D]', 'border-[#7BC2B1]', ...listBackgroundSafeList, ...listColorSafeList
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif']
      },
      backgroundImage: {
        'main-bg': "url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Mountains-1412683.svg/1280px-Mountains-1412683.svg.png')",
      },
      boxShadow: {
        'main-bg': '5px 5px 15px 5px rgba(168,168,168,0.68)',
        'bubble': 'inset -10px -10px 0 rgba(0,0,0,0.07);',
      },
      colors: {
        'line-bubble': "rgba(0,0,0,0.2)"
      },
      // animations
      keyframes: {
        moveTop: {
          '0%': {transform: 'rotate(0deg)'},
          // '50%': {transform: 'translateY(-50vh)'},
          '100%': {transform: 'rotate(360deg)'}
        },
        scaleUp: {
          '0%': {transform: 'scale(1)'},
          '50%': {transform: 'scale(1.4)'},
          '100%': {transform: 'scale(1)'}
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        upperNumber: {
          '0%': {transform: 'scale(1)'},
          '50%': {transform: 'scale(1.2)'},
          '100%': {transform: 'scale(1)'}
        }
      },
      animation: {
        wiggle: 'wiggle 1s linear',
        scaleUp: 'scaleUp 500ms linear',
        upperNumber: 'upperNumber 500ms linear'
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      rotate: {
        '30': '30deg',
        '40': '40deg'
      }
    },
  },
  plugins: [],
})