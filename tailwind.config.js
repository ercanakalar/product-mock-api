/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        headerColor: '#2A59FE',
        headerTextColor: '#FFFFFF',
        cardTitle: '#333333B2',
        filterSearch: '#FAFAFA',
        button: '#2A59FE',
        countTextBg: '#2A59FE',
        countText: '#FFFFFF',
        buttonText: '#FFFFFF',
        countButtonBg: '#FAFAFA',
        countButton: '#000000',
        cardPrice: '#2A59FE',
      },
      fontSize: {
        xss: '0.625rem',
        xm: '0.8125rem',
      },
      scrollbar: ['rounded'],
      boxShadow: {
        card: '0px 0.5px 3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          overflow: '-moz-hidden-unscrollable',
        },
        '.scrollbar-thumb': {
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#C4C4C4',
            'border-radius': '5px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        },
      });
    },
  ],
};
