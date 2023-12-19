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
    themes: [{
      dark: {
        "color-scheme": "dark",
        "primary": "#ffa0aa",
        "secondary": "#ffa0aa",
        "accent": "#ffa0aa",
        "base-100": "#000000",
        "base-200": "#141414",
        "base-300": "#262626",
        "base-content": "#d6d6d6",
        "neutral": "#373737",
        "info": "#0000ff",
        "success": "#008000",
        "warning": "#ffff00",
        "error": "#ff0000",
        "--rounded-box": "0",
        "--rounded-btn": "5px",
        "--rounded-badge": "0",
        "--animation-btn": "0",
        "--animation-input": "0",
        "--btn-focus-scale": "1",
        "--tab-radius": "0",
      }
    }],
  },
}

