/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: '#F5EDD6',
        parchment: '#EDE3C8',
        primary: '#1B4D1E',
        'primary-deep': '#0D2910',
        accent: '#C0392B',
        gold: '#B8860B',
        'gold-light': '#D4AA30',
        dark: '#1A0D08',
        'dark-mid': '#2C1810',
        'off-white': '#FDFAF4',
      },
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        body: ['Lato', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
