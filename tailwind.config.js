/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        prim: "#5293FA",
        sec: "#0E336E",
        overprim: "#F7F6FF",
        oversec: "#EDF4FF",
        backg: "#F5F5F5",
        soft: "#A3A0A0",
        text: "#03010E",
      },
    },
  },
  plugins: [],
};
