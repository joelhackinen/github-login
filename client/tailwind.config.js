/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.{js,jsx}", "./index.html"],
  darkMode: ["class"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
