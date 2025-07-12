// src/components/layout/Hero/Hero.jsx
import React, { useState, useEffect } from "react";
import { theme } from "../../../theme";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const heroStyles = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start", // Align content to the left
    textAlign: "left", // Align text to the left
    padding: `0 ${theme.spacing["3xl"]}`, // Adjust padding
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#1C1C1E", // Darker background
    color: theme.colors.text.inverse,
  };

  const contentStyles = {
    position: "relative",
    zIndex: 2,
    maxWidth: "800px",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 1s ease, transform 1s cubic-bezier(0.23, 1, 0.32, 1)",
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
    fontSize: "clamp(3rem, 7vw, 5.5rem)", // Responsive font size
    fontWeight: theme.typography.fontWeight.light, // Lighter font weight
    lineHeight: 1.1,
    marginBottom: theme.spacing.xl,
    letterSpacing: "-0.02em",
  };

  // Updated circle configuration for better visibility
  const backgroundCircles = [
    {
      size: "clamp(500px, 60vw, 900px)",
      top: "50%",
      left: "70%",
      color: "rgba(255, 255, 255, 0.02)",
    },
    {
      size: "clamp(400px, 50vw, 700px)",
      top: "20%",
      left: "30%",
      color: "rgba(255, 255, 255, 0.03)",
    },
  ];

  return (
    <section style={heroStyles}>
      {backgroundCircles.map((circle, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: circle.size,
            height: circle.size,
            borderRadius: "50%",
            backgroundColor: circle.color, // Use a semi-transparent background color
            top: circle.top,
            left: circle.left,
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        />
      ))}

      <div style={contentStyles}>
        <p style={brandCenterStyles}>Brand Center</p>

        <h1 style={titleStyles}>
          Kaitlin
          <br />
          UI
          <br />
          Presentation
        </h1>
      </div>
    </section>
  );
};

export default Hero;
