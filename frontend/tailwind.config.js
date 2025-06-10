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
          light: '#FEFBF6',
          dark: '#3D3C42',
        },
        'custom-gray': '#AFAA9E',
      },
      borderRadius: {
        'custom-xs': '3px',
      },
      screens:{
        'custom-mobileSmall': '320px',
        'custom-mobileMedium': '375px',
        'custom-mobileLarge': '425px',
        'custom-tablet': '768px',
        'custom-laptop': '1024px',
        'custom-laptopMedium': '1333px',
        'custom-laptopLarge': '1440px',
        'custom-maxScreen': '2560px',
      },
    },
  },
  plugins: [],
};
