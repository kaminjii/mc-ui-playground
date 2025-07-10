// src/theme/colors.js
export const colors = {
  // Mastercard brand colors from asset library
  primary: "#ff671b", // Orange
  secondary: "#f38b00", // Gold
  tertiary: "#ffc81f", // Yellow

  // Minimal accent colors - use sparingly
  accent: {
    orange: "#ff671b",
    gold: "#f38b00",
    yellow: "#ffc81f",
    green: "#8db92e", // Use very sparingly
    blue: "#0066CC", // Use very sparingly
    purple: "#6C1D7F", // Use very sparingly
  },

  // Neutral colors - primary palette
  text: {
    primary: "#141413", // Dark gray
    secondary: "#666666",
    tertiary: "#999999",
    inverse: "#ffffff",
    muted: "#8a8a8a",
  },

  background: {
    primary: "#ffffff", // White - main background
    secondary: "#f8f8f8", // Very light gray
    tertiary: "#f2f2f2", // Light gray
    dark: "#141413", // Dark gray
    overlay: "rgba(255, 103, 27, 0.03)", // Very subtle orange overlay
    card: "rgba(255, 255, 255, 0.7)", // More transparent for glassmorphism
    glass: "rgba(255, 255, 255, 0.25)", // Very glassy
  },

  border: {
    light: "#f0f0f0",
    medium: "#e0e0e0",
    dark: "#d0d0d0",
  },

  status: {
    success: "#8db92e", // Green - use sparingly
    warning: "#ffc81f", // Yellow
    error: "#ff671b", // Orange
    info: "#666666", // Gray instead of blue
  },
};
