module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      spacing: {
        '96': '24rem',
        '320': '80rem'
      }
    },
    // 此处是主题的切换
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: 'var(--color--black)', //
      white: 'var(--color--white)', //
      slate: colors.slate,
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        // 默认的 border 的颜色
        200: 'var(--color--gray--200)',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827'
      },
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: {
        50: '#fafaf9',
        100: '#f5f5f4',
        200: '#e7e5e4',
        300: '#d6d3d1',
        400: '#a8a29e',
        500: '#78716c',
        600: 'var(--color--stone--600)', //'#57534e',
        700: '#44403c',
        800: 'var(--color--stone--800)',//'#292524',
        900: '#1c1917'
      },
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    }),
  },
  plugins: [
    require('@tailwindcss/line-clamp'),

  ],
  variants: {
    extend: {
      color: ['last'],
    }
  },
}
