const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'inter': ['Inter', ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [require("daisyui"), require('@tailwindcss/aspect-ratio')],
  daisyui: {
    themes: ["dracula", "cupcake", "halloween", "pastel", "night", "valentine"],
  }
}

