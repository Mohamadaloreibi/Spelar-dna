import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0e1a",
        "bg-2": "#0f1422",
        card: "#131a2c",
        "card-2": "#1a2238",
        line: "#1f2942",
        text: "#e8ecf5",
        muted: "#6b7794",
        accent: "#00ff94",
        "accent-2": "#ffcc00",
        "accent-3": "#ff3860",
        season: "#4a6fa5",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
