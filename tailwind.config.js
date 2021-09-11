const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: {
        blue: "#332272",
        red: "#FF3838",
        100: "#ECECEC",
        200: "#F9F9F9",
        white: "#FFFFFF",
      },
      secondry: {
        black: colors.black,
        gray: colors.trueGray,
      },
    },
    extend: {
      backgroundImage: (theme) => ({
        heroImage: "url('/src/Assets/Covid Background.png')",
        logoImage :"url('/src/Assets/Mapsense Logo.png')",
      }),
      width: {
        "731px": "45.6875rem",
        "463px": "28.9375rem",
        "196px": "12.25rem",
        "760px": "47.5rem",
      },
      height: {
        "720px": "45rem",
      },
      fontFamily : {
        sans : "Segoe UI" ,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
