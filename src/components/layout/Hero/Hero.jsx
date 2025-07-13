// src/components/layout/Hero/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import { theme } from "../../../theme";

const Hero = () => {
  const heroStyles = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "left",
    padding: `0 ${theme.grid.margins}`,
    position: "relative",
    overflow: "hidden",
    backgroundColor: theme.colors.background.dark,
    color: theme.colors.text.inverse,
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const brandCenterStyles = {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.tertiary,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: theme.spacing.lg,
  };

  const titleStyles = {
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: "clamp(3rem, 7vw, 5.5rem)",
    fontWeight: 300, // Lighter font weight for modern feel
    lineHeight: 1.1,
    marginBottom: theme.spacing.xl,
    letterSpacing: "-0.03em", // Tighter letter spacing
  };

  const highlightStyle = {
    color: theme.colors.primary,
    fontWeight: 700,
  };

  // Animated background shapes
  const BackgroundShape = ({ size, top, left, color, duration }) => (
    <motion.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        top,
        left,
        transform: "translate(-50%, -50%)",
        zIndex: 1,
      }}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.8, 0.9, 0.8],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );

  return (
    <section style={heroStyles}>
      <BackgroundShape
        size="clamp(500px, 60vw, 900px)"
        top="50%"
        left="70%"
        color="rgba(232, 80, 2, 0.05)"
        duration={10}
      />
      <BackgroundShape
        size="clamp(400px, 50vw, 700px)"
        top="20%"
        left="30%"
        color="rgba(235, 0, 27, 0.05)"
        duration={12}
      />

      <motion.div
        style={{ position: "relative", zIndex: 2, maxWidth: "800px" }}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} style={brandCenterStyles}>
          A Frontend Development Guide
        </motion.p>
        <motion.h1 variants={itemVariants} style={titleStyles}>
          Building Interactive &<br />
          <span style={highlightStyle}>Scalable</span> UI
        </motion.h1>
      </motion.div>
    </section>
  );
};

export default Hero;
