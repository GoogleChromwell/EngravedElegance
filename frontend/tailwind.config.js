module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary:{
          light: '#AFAA9E',
          dark: '#333446',
        },
        'custom-gray': '#AFAA9E',
      },
      borderRadius: {
        'custom-xs': '3px',
      },
    },
  },
  plugins: [],
};
