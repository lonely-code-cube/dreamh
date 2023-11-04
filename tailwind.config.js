const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'inter': ['Inter', ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night", "lemonade", "halloween", "garden"],
  },
  keyframes: {
    shimmer: {
      "100%": {
        "transform": "translateX(100%)",
      },
    },
  }
}

