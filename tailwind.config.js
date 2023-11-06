/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.ejs`], // all .html files
  theme: {
    extend: {},
  },
  variants:{
    extend:{
      backgroundColor: ['active', 'hover', 'responsive'],
      fontSize: ['active','hover',]
    }
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui'), require('tailwind-variants')],
  daisyui: {
    themes: ['pastel'],
  }
}


/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name:AUDREY DUZON Student ID: 019153147 Date: OCT 23, 2023
*
********************************************************************************/