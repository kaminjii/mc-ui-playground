// src/theme/typography.js
export const typography = {
  fontFamily: {
    primary:
      "'Mark Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", // Correctly using Mastercard's brand font
    secondary:
      "'Mark Pro Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", // Correctly using Mastercard's brand font
    mono: "'SF Mono', Monaco, 'Cascadia Code', monospace",
  },

  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.375rem", // 22px
    "2xl": "1.75rem", // 28px
    "3xl": "2.25rem", // 36px
    "4xl": "3rem", // 48px
    "5xl": "4.5rem", // 72px
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};
