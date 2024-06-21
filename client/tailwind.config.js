/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-left-bottom': '-20px 15px 25px -2px rgba(0, 0, 0, 0.1)', // Adjust the values as needed
        'diff': '-5px 5px 5px rgba(0, 98, 90, 0.4), -10px 10px 10px rgba(0, 98, 90, 0.3), -15px 15px 15px rgba(0, 98, 90, 0.2), -20px 20px 20px rgba(0, 98, 90, 0.1), -25px 25px 25px rgba(0, 98, 90, 0.05)',
        'diff1': '0px 3px 10px rgba(0,0,0,0.2)',
      },
      fontFamily: {
        sans: ["var(--font-sora)", ...fontFamily.sans],
        code: "var(--font-code)",
        grotesk: "var(--font-grotesk)",
        noto: ["'Noto Sans'", ...fontFamily.sans],
      },
      animation: {
        'T1': 'fade-in-right 1s ease-out',
      },
      keyframes: {
        'T1': {
          '0%': {
            opacity: '0',
            transform: 'translateX(100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover'],
    },
  },
  plugins: [],
}

