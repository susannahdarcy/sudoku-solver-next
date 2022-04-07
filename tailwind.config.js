module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        168: '36rem',
        100: '20.25rem',
      },
      colors: {
        'grey-blue': '#27272a',
      },
      borderColor: {
        DEFAULT: '#27272a',
      },
      fontFamily: {
        serif: ['Roboto Slab'],
      },
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
    },
    boxShadow: {
      '3xl': '0 15px 50px 5px rgba(0, 0, 0, 0.15)',
    },
  },
  plugins: [],
};
