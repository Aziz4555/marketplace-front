module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing : {
        '500':'31.25rem',
        '700':'43.75rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
