/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          slate: "#0F172A",
          navy: "#1E293B",
          terracotta: "#C2410C",
          terracottaLight: "#EA580C",
          ochre: "#D97706",
          sand: "#F8FAFC",
          cream: "#FDFBF7",
          border: "#E2E8F0"
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
