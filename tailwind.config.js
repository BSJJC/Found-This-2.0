/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      transitionDuration: {
        '1500': '1500ms',
      }
    },
  },
  plugins: [],
}

