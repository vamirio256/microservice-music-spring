/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f50",
        searchbar_gray: "#f2f2f2",
      },
      backgroundImage: {
        lading_web: "url('/src/images/cover_landing_web.jpg')",
      },
    },
  }
};
