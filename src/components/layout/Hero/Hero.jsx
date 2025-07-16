// src/components/layout/Hero/Hero.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { theme } from "../../../theme";

// A new, more advanced 3D credit card component
const CreditCard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // This function handles the mouse movement over the card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the card's center
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x, y });
  };

  // Reset the state when the mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // The main style for the card's 3D transformation
  const cardStyle = {
    transform: isHovered
      ? `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${
          mousePosition.y * -15
        }deg) translateZ(20px) scale(1.1)`
      : "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px) scale(1)",
    transition: "transform 0.4s ease-out",
    transformStyle: "preserve-3d",
  };

  // The style for the dynamic shine effect
  const shineStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.25) 50%, transparent 70%)",
    // The shine moves based on the mouse position
    transform: `translateX(${mousePosition.x * 50 - 25}%) translateY(${
      mousePosition.y * 50
    }%) skewX(-30deg)`,
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
    mixBlendMode: "color-dodge",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "420px",
        height: "260px",
        cursor: "pointer",
      }}
    >
      <motion.div
        className="card-3d-wrapper"
        style={{
          ...cardStyle,
          width: "100%",
          height: "100%",
          borderRadius: theme.borderRadius.xl,
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.4)",
          position: "relative",
          overflow: "hidden",
          // A complex gradient to simulate brushed metal
          background:
            "linear-gradient(135deg, #808080, #C0C0C0, #E0E0E0, #C0C0C0, #808080)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* The shine effect layer */}
        <div style={shineStyle} />

        {/* The content of the card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: theme.spacing.xl,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#1A1A1A", // Dark text for contrast on silver
            transform: "translateZ(50px)", // Lifts the content off the card surface
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                fontWeight: theme.typography.fontWeight.bold,
                fontSize: theme.typography.fontSize.lg,
                letterSpacing: "0.1em",
              }}
            >
              MASTERCARD
            </span>
            {/* A simple chip simulation */}
            <div
              style={{
                width: "48px",
                height: "36px",
                background:
                  "linear-gradient(135deg, #d4af37, #ffd700, #d4af37)",
                borderRadius: theme.borderRadius.md,
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontSize: theme.typography.fontSize.xl,
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                marginRight: theme.spacing.sm,
              }}
            >
              5412 7512 3412 3456
            </span>
            {/* The iconic Mastercard logo */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: theme.colors.secondary,
                }}
              />
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: theme.colors.accent.yellow,
                  marginLeft: "-24px",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const heroStyles = {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
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
        opacity: [0.1, 0.15, 0.1],
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
        size="clamp(600px, 70vw, 1000px)"
        top="50%"
        left="20%"
        color={theme.colors.primary}
        duration={10}
      />
      <BackgroundShape
        size="clamp(500px, 60vw, 800px)"
        top="20%"
        left="60%"
        color={theme.colors.secondary}
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <CreditCard />
      </div>
    </section>
  );
};

export default Hero;
