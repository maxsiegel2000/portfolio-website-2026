const cssVar = (value) => `var(${value})`;

const textUtilities = {
  ".text-display": {
    fontSize: "72px",
    lineHeight: "88px",
    fontWeight: "700",
    letterSpacing: "-0.012em",
    fontFamily: "'Nunito', sans-serif",
  },
  ".text-display-2": {
    fontSize: "64px",
    lineHeight: "76px",
    fontWeight: "700",
    letterSpacing: "-0.01em",
    fontFamily: "'Nunito', sans-serif",
  },
  ".text-h1": {
    fontSize: "56px",
    lineHeight: "68px",
    fontWeight: "600",
    letterSpacing: "-0.005em",
    fontFamily: "'Nunito', sans-serif",
  },
  ".text-h2": {
    fontSize: "46px",
    lineHeight: "58px",
    fontWeight: "500",
    letterSpacing: "-0.004em",
    fontFamily: "'Nunito', sans-serif",
  },
  ".text-h3": {
    fontSize: "36px",
    lineHeight: "46px",
    fontWeight: "500",
    letterSpacing: "-0.003em",
    fontFamily: "'Nunito', sans-serif",
  },
  ".text-h4": {
    fontSize: "26px",
    lineHeight: "34px",
    fontWeight: "400",
    letterSpacing: "-0.002em",
    fontFamily: "'Nunito', sans-serif",
  },
  ".text-title-1": {
    fontSize: "20px",
    lineHeight: "28px",
    fontWeight: "600",
    fontFamily: "Nunito",
  },
  ".text-title-2": {
    fontSize: "18px",
    lineHeight: "26px",
    fontWeight: "500",
    letterSpacing: "-0.001em",
    fontFamily: "'Nunito', sans-serif",
  },
  ".text-body": {
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: "400",
    letterSpacing: "0",
    fontFamily: "'Nunito', sans-serif",
  },
  ".text-caption": {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "300",
    letterSpacing: "0.25px",
    fontFamily: "Nunito",
  },
  ".text-tiny": {
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: "400",
    letterSpacing: "0",
    fontFamily: "'Nunito', sans-serif",
  },
};

const typographyUtilitiesPlugin = ({ addUtilities }) => {
  addUtilities(textUtilities);
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "accent-gradient-primary": "var(--accent-gradient-primary)",
        "accent-gradient-secondary": "var(--accent-gradient-secondary)",
        "accent-gradient-tertiary": "var(--accent-gradient-tertiary)",
        "bg-gradient-primary": "var(--bg-gradient-primary)",
        "bg-gradient-secondary": "var(--bg-gradient-secondary)",
      },
      colors: {
        background: cssVar("--bg-primary"),
        "background-secondary": cssVar("--bg-secondary"),
        "background-tertiary": cssVar("--bg-tertiary"),
        overlay: 'var(--hover-overlay)',
        primary: cssVar("--text-primary"),
        secondary: cssVar("--text-secondary"),
        muted: cssVar("--text-muted"),
        success: cssVar("--text-success"),
        warning: cssVar("--text-warning"),
        danger: cssVar("--text-danger"),
        accent: cssVar("--accent-primary"),
        "accent-cyan": cssVar("--accent-cyan"),
        "accent-cyan-light": cssVar("--accent-cyan-light"),
        "accent-cyan-dark": cssVar("--accent-cyan-dark"),
        border: cssVar("--border-primary"),
        sidebar: cssVar("--sidebar"),
        "sidebar-foreground": cssVar("--sidebar-foreground"),
        "sidebar-primary": cssVar("--sidebar-primary"),
        "sidebar-primary-foreground": cssVar("--sidebar-primary-foreground"),
        "sidebar-accent": cssVar("--sidebar-accent"),
        "sidebar-accent-foreground": cssVar("--sidebar-accent-foreground"),
        "sidebar-border": cssVar("--sidebar-border"),
        "sidebar-ring": cssVar("--sidebar-ring"),
        ring: cssVar("--sidebar-ring"),
      },
      dropShadow: {
        card: cssVar("--drop-shadow-card"),
        glow: cssVar("--drop-shadow-glow"),
      },
    },
  },
  plugins: [typographyUtilitiesPlugin],
};
