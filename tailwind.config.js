/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
        fontHeading: ["Alegreya", "sans-serif"],
        fontCategory: ["Source Code Pro", "sans-serif"],
      },
      colors: {
        primaryColor: "#457EFF",
        headingColor: "#1A202E",
        textColor: "#495367",
        gray: "#96A2BE",
      },
    },
  },
  plugins: [],
};
