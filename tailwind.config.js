const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'inter': ['Inter', ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        ApricotMyst: {
          "primary": "#F9DBBD",
          "secondary": "#FCA17D",
          "accent": "#DA627D",
          "neutral": "#e09b69",
          "base-100": "#171921",
          "info": "#60a5fa",
          "success": "#4ade80",
          "warning": "#fcd34d",
          "error": "#f87171",
        }
      },
    ],
  },
}

