import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        "earth-black": "var(--earth-black)",
        "iron-white": "var(--iron-white)",
        "oxide-red": "var(--oxide-red)",
        "quarry-grey": "var(--quarry-grey)",
        "slab-grey": "var(--slab-grey)",
        "coal-dark": "var(--coal-dark)",
        "dust-tan": "var(--dust-tan)",
        "safety-amber": "var(--safety-amber)",
        "field-green": "var(--field-green)",
        "deep-ore": "var(--deep-ore)",
      },
      spacing: {
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "40px",
        xl: "64px",
        "2xl": "96px",
        "3xl": "128px",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Newsreader", "Georgia", "serif"],
        serif: ["var(--font-heading)", "Newsreader", "Georgia", "serif"],
        body: ["var(--font-body)", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 2rem + 3.1vw, 4.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 1.75rem + 2.2vw, 3.5rem)", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.75rem, 1.55rem + 0.9vw, 2.25rem)", { lineHeight: "1.05", letterSpacing: "-0.012em" }],
        "heading-1": ["clamp(1.875rem, 1.625rem + 1.1vw, 2.5rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "heading-2": ["clamp(1.5rem, 1.3rem + 0.9vw, 2rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        "heading-3": ["clamp(1.25rem, 1.15rem + 0.45vw, 1.5rem)", { lineHeight: "1.2", letterSpacing: "-0.005em" }],
        "heading-4": ["1.125rem", { lineHeight: "1.3", letterSpacing: "0" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "0" }],
        body: ["1rem", { lineHeight: "1.65", letterSpacing: "0" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.005em" }],
        label: ["0.75rem", { lineHeight: "1.3", letterSpacing: "0.035em" }],
        mono: ["0.875rem", { lineHeight: "1.4", letterSpacing: "0" }],
      },
      maxWidth: {
        content: "1280px",
        editorial: "680px",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};

export default config;
