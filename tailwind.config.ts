import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EBF0F5",
          100: "#C4D3E5",
          500: "#1E3A5F",
          700: "#14273F",
          900: "#0A1520",
        },
        secondary: {
          500: "#F59E0B",
          600: "#D97706",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;