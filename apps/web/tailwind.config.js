/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      green: "#339933",
      "dark-gray": "#333333",
      gray: "#444444",
      "light-gray": "#555555",
      "lighter-gray": "#cccccc",
      white: "#ffffff",
      black: "#000000",
      red: "#ff0000",
    },
    fontFamily: {
      sans: ["Ubuntu", "sans-serif"],
    },
    extend: {
      spacing: {
        112: "28rem",
        128: "32rem",
        160: "40rem",
      },
    },
  },
  plugins: [],
};
