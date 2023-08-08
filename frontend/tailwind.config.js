/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f50",
        searchbar_gray: "#f2f2f2",
        orange: "#f50",
        topbar: "#333",
      },
      backgroundImage: {
        lading_web: "url('/src/assets/images/cover_landing_web.jpg')",
      },
      zIndex: {
        max: "999",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require('tailwind-scrollbar')({ nocompatible: true })],
};
