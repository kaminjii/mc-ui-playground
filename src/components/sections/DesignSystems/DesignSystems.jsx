// src/components/sections/DesignSystems/DesignSystems.jsx
import React from "react";
import { Layers, Puzzle, Beaker, ExternalLink } from "lucide-react";
import { theme } from "../../../theme";
import Card from "../../ui/Card/Card";
import Button from "../../ui/Button/Button";
import { motion } from "framer-motion";

const DesignSystems = () => {
  const sectionStyles = {
    padding: `${theme.spacing["3xl"]} 0`,
    backgroundColor: theme.colors.background.dark,
    color: theme.colors.text.inverse,
    position: "relative",
    overflow: "hidden",
  };

  const containerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: `0 ${theme.spacing.xl}`,
    position: "relative",
    zIndex: 2,
  };

  const headerStyles = {
    textAlign: "center",
    marginBottom: theme.spacing["3xl"],
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize["4xl"],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.md,
    letterSpacing: "-0.02em",
  };

  const subtitleStyles = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.tertiary,
    maxWidth: "750px",
    margin: "0 auto",
    lineHeight: 1.6,
  };

  const gridStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: theme.spacing.xl,
    marginBottom: theme.spacing["3xl"],
  };

  const codeSnippetStyle = {
    fontFamily: theme.typography.fontFamily.mono,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.inverse,
  };

  const principles = [
    {
      icon: <Beaker size={32} color={theme.colors.primary} />,
      title: "Design Tokens",
      description:
        "MADE is built on a foundation of design tokens—the primitive values for colors, spacing, and typography. These are exposed as CSS Custom Properties (e.g., `var(--made-color-brand-on-primary)`) for consistent and themeable styling.",
    },
    {
      icon: <Layers size={32} color={theme.colors.primary} />,
      title: "Component Classes (-c)",
      description: (
        <>
          Component classes encapsulate all the styles for a specific UI
          element. They style the "what." For example,{" "}
          <code style={codeSnippetStyle}>.made-c-button</code> contains all the
          necessary styling for a button component.
        </>
      ),
    },
    {
      icon: <Puzzle size={32} color={theme.colors.primary} />,
      title: "Utility Classes (-u)",
      description: (
        <>
          Utility classes apply a single, immutable style rule to handle
          exceptions and layout. They style the "where." For example,{" "}
          <code style={codeSnippetStyle}>.made-u-margin-bottom-lg</code> adds a
          large bottom margin.
        </>
      ),
    },
  ];

  const BackgroundShape = ({ size, top, left, color }) => (
    <motion.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}1A 0%, transparent 70%)`,
        top,
        left,
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );

  return (
    <section style={sectionStyles}>
      <BackgroundShape
        size="50vw"
        top="10%"
        left="-20%"
        color={theme.colors.primary}
      />
      <BackgroundShape
        size="40vw"
        top="40%"
        right="-15%"
        color={theme.colors.secondary}
      />

      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>MADE: The Mastercard Design Ecosystem</h2>
          <p style={subtitleStyles}>
            MADE is our single source of truth, a collection of reusable
            components and clear standards that allow us to build high-quality,
            consistent digital experiences efficiently.
          </p>
        </header>

        <div style={gridStyles}>
          {principles.map((item) => (
            <Card
              key={item.title}
              variant="glass"
              interactive
              style={{ height: "100%" }}
            >
              <div style={{ marginBottom: theme.spacing.lg }}>{item.icon}</div>
              <h3
                style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.bold,
                  marginBottom: theme.spacing.md,
                  color: theme.colors.text.inverse,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: theme.colors.text.tertiary,
                  lineHeight: 1.6,
                  fontSize: theme.typography.fontSize.md,
                }}
              >
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <Card
          variant="elevated"
          style={{
            backgroundColor: theme.colors.background.primary,
            textAlign: "center",
            padding: theme.spacing["2xl"],
          }}
        >
          <h3
            style={{
              fontSize: theme.typography.fontSize["2xl"],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md,
            }}
          >
            Explore the Connect UIKit
          </h3>
          <p
            style={{
              color: theme.colors.text.secondary,
              maxWidth: "600px",
              margin: `0 auto ${theme.spacing.xl} auto`,
              lineHeight: 1.6,
            }}
          >
            The Connect UIKit is our internal library of reusable React
            components, built on the principles of MADE. It's the toolbox you'll
            use to build applications.
          </p>
          <Button
            onClick={() =>
              window.open(
                "https://mastercard.com/your-internal-link-here",
                "_blank"
              )
            }
            variant="primary"
          >
            Go to Connect UIKit{" "}
            <ExternalLink size={18} style={{ marginLeft: theme.spacing.sm }} />
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default DesignSystems;
