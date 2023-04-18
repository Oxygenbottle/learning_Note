module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      spacing: {
        '320':"80rem"
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
  variants: {
    extend: {
      color: ['last'],
    }
  },
}
