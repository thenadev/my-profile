import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        customGold: "#d1bc8a",
        customGoldLight: "rgb(209 188 138 / 1)",
        primaryColor: "#3b82f6",
        turquoise: {
          50: "#e6f7f8",
          100: "#b3e8eb",
          200: "#80d9de",
          300: "#4dcad1",
          400: "#1ab5bd",
          500: "#00B0B0",
          600: "#1A8F95",
          700: "#0B878E",
          800: "#2E6D74",
          900: "#1f4a50",
          950: "#0f2528",
          dark: "#2E6D74",
          bright: "#00B0B0",
          medium: "#1A8F95",
          "medium-alt": "#0B878E",
        },
        /* Hero-Portrait-Hintergrund – verweist auf globale CSS-Variablen (globals.css) */
        "hero-portrait-bg": {
          bright: "var(--hero-portrait-bg-bright)",
          mid: "var(--hero-portrait-bg-mid)",
          dark: "var(--hero-portrait-bg-dark)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
