import type { Config } from "tailwindcss";

/**
 * Visual tokens aligned with the CleanOnes reference (Ainomiq) system.
 * Colors / radius / type only — no behavior.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        /* Explicit hierarchy at 15px root */
        xs: ["0.75rem", { lineHeight: "1.35" }], // 11.25px labels / captions
        sm: ["0.875rem", { lineHeight: "1.45" }], // 13.125px body / controls
        base: ["1rem", { lineHeight: "1.55" }], // 15px default body
        lg: ["1.125rem", { lineHeight: "1.35" }], // section titles
        xl: ["1.25rem", { lineHeight: "1.3" }],
        "2xl": ["1.5rem", { lineHeight: "1.25" }], // page titles
      },
      colors: {
        background: "#FFFFFF",
        foreground: "#252B37",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#252B37",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#252B37",
        },
        border: {
          DEFAULT: "#E7EAF0",
        },
        input: {
          DEFAULT: "#E7EAF0",
        },
        ring: {
          DEFAULT: "#009EE2",
        },
        primary: {
          DEFAULT: "#009EE2",
          hover: "#008BC7",
          light: "#E5F6FC",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F1F3F5",
          hover: "#E7EAF0",
          light: "#F8FAFC",
          foreground: "#374151",
        },
        muted: {
          DEFAULT: "#F1F3F5",
          foreground: "#667085",
        },
        accent: {
          DEFAULT: "#E5F6FC",
          foreground: "#007EB5",
        },
        destructive: {
          DEFAULT: "#DC4A41",
          foreground: "#FFFFFF",
        },
        sidebar: {
          DEFAULT: "#FFFFFF",
          hover: "#E7E7ED",
          foreground: "#667085",
          border: "#E2E3E9",
          primary: "#009EE2",
          "primary-foreground": "#FFFFFF",
          accent: "#E7E7ED",
          "accent-foreground": "#252B37",
        },
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.375rem",
        xl: "0.375rem",
      },
      boxShadow: {
        none: "none",
        xs: "none",
        sm: "none",
      },
    },
  },
  plugins: [],
};

export default config;
