module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        168: '36rem',
        100: '20.25rem',
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
    borderColor: {
      DEFAULT: '#27272a',
    },
    boxShadow: {
      '3xl': '0 35px 70px 0 rgba(0, 0, 0, 0.3)',
    },
  },
  plugins: [],
};
