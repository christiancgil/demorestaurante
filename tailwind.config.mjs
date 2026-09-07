/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#F5EDD6',
        primary: '#1B4D1E',
        accent: '#C0392B',
        gold: '#B8860B',
        dark: '#2C1810',
        'off-white': '#FDFAF4',
      },
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
