// src/theme/index.js
export const theme = {
  colors: {
    primary: "#E85002", // Vibrant branding orange
    secondary: "#EB001B", // Mastercard Red for accents
    accent: { yellow: "#F79E1B" },
    text: {
      primary: "#1A1A1A", // High-contrast text
      secondary: "#666666", // For secondary information
      tertiary: "#A9A9A9", // For hints and disabled states
      inverse: "#FFFFFF", // For dark backgrounds
      code: "#F8F8F2", // Text color for code blocks
    },
    background: {
      primary: "#FFFFFF", // Main content background
      secondary: "#F7F7F7", // For alternating sections
      dark: "#121212", // For hero and footer sections
      code: "#282A36", // Background for code blocks
    },
    border: {
      light: "#EAEAEA",
      medium: "#DDDDDD",
      dark: "rgba(255, 255, 255, 0.1)",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
  },
  borderRadius: {
    md: "12px",
    lg: "20px",
    xl: "24px",
    full: "9999px",
  },
  typography: {
    fontFamily: "'Mark Pro', 'Inter', -apple-system, sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.375rem",
      "2xl": "1.75rem",
      "3xl": "2.25rem",
      "4xl": "3rem",
      "5xl": "4.5rem",
    },
    fontWeight: { normal: 400, medium: 500, bold: 700, black: 900 },
    lineHeight: { tight: 1.2, normal: 1.5, relaxed: 1.75 },
  },
  shadows: {
    sm: "0 2px 4px rgba(26, 26, 26, 0.05)",
    md: "0 4px 12px rgba(26, 26, 26, 0.08)",
    lg: "0 10px 30px rgba(26, 26, 26, 0.1)",
    xl: "0 20px 50px rgba(26, 26, 26, 0.12)",
    focus: "0 0 0 3px rgba(232, 80, 2, 0.2)",
  },
};
