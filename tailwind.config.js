/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Microsoft Dark Mode Colors
        "ms-dark": {
          50: "#f8f8f8",
          100: "#e1e1e1",
          200: "#cccccc",
          300: "#b4b4b4",
          400: "#8a8a8a",
          500: "#605e5c",
          600: "#454549",
          700: "#3f3f46",
          800: "#2d2d30",
          900: "#1e1e1e",
          950: "#1a1a1a",
        },
        "ms-blue": {
          500: "#0078d4",
          600: "#0062ad",
          700: "#004a94",
        },
      },
    },
  },
  plugins: [],
};
