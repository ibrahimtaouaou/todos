/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "white-bg": "#F9F7F7",
        "blue-light": "#DBE2EF",
        "blue-mid": "#3F72AF",
        "blue-dark": "#112D4E",
      },
    },
  },
  plugins: [],
};
