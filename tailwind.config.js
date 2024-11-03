/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.tsx", "app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          950: "#181718",
          900: "#272625",
        },
      },
    },
  },
  plugins: [],
};
