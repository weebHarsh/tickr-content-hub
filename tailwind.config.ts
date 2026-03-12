import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#530093",
          secondary: "#A21094",
          accent: "#FFCC29",
          dark: "#201E1E",
        },
        purple: {
          50: "#F19CFD",
          100: "#D89BF9",
          200: "#CEA2F7",
          300: "#B592F1",
          400: "#9260EB",
          500: "#7649E5",
          600: "#530093",
          700: "#4D0C83",
          800: "#430FA5",
          900: "#4400D1",
        },
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-opensans)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
