/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
              "surface-dim": "#0e0e0e",
              "tertiary": "#ac89ff",
              "surface-variant": "#262626",
              "secondary-fixed": "#00f1fe",
              "inverse-on-surface": "#565554",
              "tertiary-dim": "#874cff",
              "on-secondary-container": "#e2fdff",
              "secondary-container": "#00696f",
              "inverse-primary": "#5e5f60",
              "outline": "#777575",
              "on-tertiary-container": "#f8f1ff",
              "error-container": "#9f0519",
              "surface-container-low": "#131313",
              "on-secondary-fixed-variant": "#006065",
              "primary-fixed-dim": "#dcdddd",
              "primary-container": "#a0a1a1",
              "surface-container-highest": "#262626",
              "primary": "#f9f9f9",
              "on-primary": "#5e5f60",
              "error-dim": "#d7383b",
              "on-tertiary": "#290067",
              "surface-bright": "#2c2c2c",
              "on-primary-container": "#212323",
              "background": "#0a0a0a",
              "surface": "#0a0a0a",
              "surface-container-lowest": "#000000",
              "on-tertiary-fixed-variant": "#4700a7",
              "secondary": "#00f1fe",
              "on-primary-fixed": "#434545",
              "on-secondary-fixed": "#004145",
              "tertiary-fixed": "#bda1ff",
              "on-error-container": "#ffa8a3",
              "on-secondary": "#00555a",
              "outline-variant": "#494847",
              "on-error": "#490006",
              "on-primary-fixed-variant": "#5f6161",
              "on-surface": "#ffffff",
              "tertiary-fixed-dim": "#b190ff",
              "surface-tint": "#f9f9f9",
              "on-tertiary-fixed": "#1f0052",
              "on-background": "#ffffff",
              "inverse-surface": "#fcf8f8",
              "surface-container-high": "#201f1f",
              "secondary-dim": "#00e2ee",
              "on-surface-variant": "#adaaaa",
              "surface-container": "#1a1919",
              "primary-dim": "#ebebeb",
              "primary-fixed": "#ebebeb",
              "secondary-fixed-dim": "#00e2ee",
              "tertiary-container": "#7000ff",
              "error": "#ff716c"
      },
      "borderRadius": {
              "DEFAULT": "0.125rem",
              "lg": "0.25rem",
              "xl": "0.5rem",
              "full": "0.75rem"
      },
      "fontFamily": {
              "headline": ["Inter"],
              "body": ["Inter"],
              "label": ["Inter"],
              "inter": ['Inter', 'sans-serif'],
              "sans": ['Inter', 'sans-serif']
      },
      animation: {
        'rgb-gradient': 'rgbGradient 3s ease infinite',
      },
      keyframes: {
        rgbGradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        }
      }
    },
  },
  plugins: [],
}
