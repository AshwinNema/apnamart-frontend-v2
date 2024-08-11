import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "google-gradient":
          "linear-gradient(-120deg, #4285f4, #34a853, #fbbc05, #ea4335)",
      },
      colors: {
        theme:
          "hsl(var(--nextui-primary) / var(--nextui-primary-opacity, var(--tw-bg-opacity)))",
      },
      animation: {
        glow: "glow 1.5s linear 3s infinite",
        markerArrival: "markerArrival 1.5s",
        hideMarkerToolTip: "hideMarkerToolTip 2s",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0px 0px 0px 4px #f97316" },
          "100%": { boxShadow: "0px 0px 0px 40px transparent" },
        },
        markerArrival: {
          "0%": { transform: "translateY(-0.2rem)" },
          "25%": { transform: "translateY(0.2rem)" },
          "50%": { transform: "translateY(-0.1rem)" },
          "75%": { transform: "translateY(0.1rem)" },
        },
        hideMarkerToolTip: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
