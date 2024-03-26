/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#303030",
        accent: "#ee8800",
        bluegray: "#272c3a",
        modal: "#00000080",
      },
      spacing: {
        90: "70%",
      },
    },
  },
  plugins: [],
};
