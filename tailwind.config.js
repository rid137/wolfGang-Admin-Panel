/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: '0.9rem',
      normal: '1rem',
      md: '1.2rem',
      lg: '1.8rem',
      xl: '2.4rem',
      xxl: '3.6rem',
      xxxl: '5rem'
    },
    screens: {
      xs: '340px',
      sm: '480px',
      md: '768px',
      lg: '1250px',
      xl: '1440px'
    },

    extend: {
      colors: {
        primary: "#276AD9",
        whiteBg: "#F5F5F5",
        greyBg: "#E6E6E6",
        lightPurple: "#FB9DFB",
        transBg: "rgba(0, 0, 0, .5)"
        
      },
      // fontFamily: {
      //   sans: ['DM Sans', 'sans-serif'],
      //   inter: ['Inter', 'sans-serif'],
      //   nunito: ['Nunito Sans', 'sans-serif'],
      // },
    },
  },
  plugins: [],
}

