// src/components/ui/Card/Card.jsx
import React from "react";
import { motion } from "framer-motion";
import { theme } from "../../../theme";

const Card = ({
  children,
  variant = "default",
  interactive = false,
  className = "",
  style = {},
  ...props
}) => {
  const baseStyles = {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing["xl"],
    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
  };

  const variants = {
    default: {
      backgroundColor: theme.colors.background.primary,
      border: `1px solid ${theme.colors.border.light}`,
      boxShadow: theme.shadows.md,
    },
    elevated: {
      backgroundColor: theme.colors.background.primary,
      border: `1px solid ${theme.colors.border.light}`,
      boxShadow: theme.shadows.lg,
    },
    glass: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(15px)",
      border: `1px solid ${theme.colors.border.dark}`,
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
    },
  };

  const cardStyles = {
    ...baseStyles,
    ...variants[variant],
    ...style,
  };

  const hoverEffect = interactive
    ? {
        y: -5,
        boxShadow: theme.shadows.xl,
        borderColor:
          variant === "glass"
            ? "rgba(255, 255, 255, 0.2)"
            : theme.colors.border.medium,
      }
    : {};

  return (
    <motion.div
      style={cardStyles}
      className={className}
      whileHover={hoverEffect}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
