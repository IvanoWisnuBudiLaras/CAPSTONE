export default {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: "#1ECFB0",
        "teal-dark": "#17b89b",
        red: "#E53935",
        blue: "#2979FF",
        navy: "#1A1A2E",
      },
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
        nunito: ["'Nunito'", "sans-serif"],
      },
    },
  },
  plugins: [],
};