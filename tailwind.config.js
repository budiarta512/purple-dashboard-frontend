module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
