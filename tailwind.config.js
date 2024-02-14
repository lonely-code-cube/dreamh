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
      {
        AmoledDark: {
          "primary": "#bbf7d0",
          "secondary": "#fca5a5",
          "accent": "#93c5fd",
          "neutral": "#281e06",
          "base-100": "#000000",
          "info": "#60a5fa",
          "success": "#00b054",
          "warning": "#ffd100",
          "error": "#f43f5e",
        },
      },
    ],
  },
}

