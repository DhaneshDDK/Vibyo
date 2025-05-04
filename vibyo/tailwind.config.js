/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        GrayBackground: "#F0F4FA",
        BlueBackground: "#EAF2FE",
      }
    },
  },
  plugins: [],
}

