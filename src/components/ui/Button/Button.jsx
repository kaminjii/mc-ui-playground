// src/components/ui/Button/Button.jsx
import React from "react";
import { motion } from "framer-motion";
import { theme } from "../../../theme";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  style = {},
}) => {
  const baseStyles = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight.bold,
    borderRadius: theme.borderRadius.full,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
  };

  const sizeStyles = {
    sm: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.sm,
    },
    md: {
      padding: `${theme.spacing.md} ${theme.spacing.xl}`,
      fontSize: theme.typography.fontSize.base,
    },
    lg: {
      padding: `18px ${theme.spacing["2xl"]}`,
      fontSize: theme.typography.fontSize.lg,
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.text.inverse,
      boxShadow: theme.shadows.md,
    },
    secondary: {
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,
      border: `2px solid ${theme.colors.border.medium}`,
    },
    glass: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: theme.colors.text.inverse,
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: theme.shadows.glass,
    },
  };

  const hoverStyles = {
    primary: { scale: 1.05, boxShadow: theme.shadows.lg },
    secondary: {
      borderColor: theme.colors.primary,
      color: theme.colors.primary,
    },
    glass: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      scale: 1.05,
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <motion.button
      style={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? hoverStyles[variant] : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.button>
  );
};

export default Button;
