// src/components/sections/DesignSystems/DesignSystems.jsx
import React from "react";
import { Layers, Puzzle, Beaker, ExternalLink } from "lucide-react";
import { theme } from "../../../theme";
import Card from "../../ui/Card/Card";
import Button from "../../ui/Button/Button";
import { motion } from "framer-motion";
import FigmaEmbed from "react-figma-embed";

const DesignSystems = () => {
  const sectionStyles = {
    padding: `${theme.spacing["3xl"]} 0`,
    backgroundColor: theme.colors.background.dark,
    color: theme.colors.text.inverse,
    position: "relative",
    overflow: "hidden",
  };

  const contentContainerStyles = {
    maxWidth: `calc(${theme.grid.container} - (${theme.grid.margins} * 2))`,
    margin: "0 auto",
    zIndex: 2,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing["3xl"],
    padding: `0 ${theme.spacing.xl}`,
  };

  const headerStyles = {
    textAlign: "center",
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
  };

  const codeSnippetStyle = {
    fontFamily: theme.typography.fontFamily.mono,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.inverse,
  };

  const principles = [
    {
      icon: <Beaker size={32} color={theme.colors.primary} />,
      title: "Design Tokens",
      description:
        "MADE is built on a foundation of design tokens—the primitive values for colors, spacing, and typography. These are exposed as CSS Custom Properties for consistent and themeable styling.",
    },
    {
      icon: <Layers size={32} color={theme.colors.primary} />,
      title: "Component Classes (-c)",
      description: (
        <>
          Component classes encapsulate all the styles for a specific UI
          element. For example,{" "}
          <code style={codeSnippetStyle}>.made-c-button</code> contains all the
          necessary styling for a button.
        </>
      ),
    },
    {
      icon: <Puzzle size={32} color={theme.colors.primary} />,
      title: "Utility Classes (-u)",
      description: (
        <>
          Utility classes apply a single style rule to handle exceptions and
          layout. For example,{" "}
          <code style={codeSnippetStyle}>.made-u-margin-bottom-lg</code> adds a
          large bottom margin.
        </>
      ),
    },
  ];

  const BackgroundShape = ({ size, top, left, right, color, opacity }) => (
    <motion.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        opacity: opacity,
        top,
        left,
        right,
        filter: "blur(100px)",
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: opacity, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
  );

  // --- STYLING FIX FOR FIGMA EMBEDS ---
  const figmaEmbedWrapperStyles = {
    position: "relative",
    paddingBottom: "75%", // This creates a 4:3 aspect ratio. Adjust as needed (e.g., 56.25% for 16:9)
    height: 0,
    overflow: "hidden",
    borderRadius: theme.borderRadius.lg,
    width: "100%",
  };

  const figmaEmbedStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: `1px solid ${theme.colors.border.dark}`,
  };
  // --- END OF FIX ---

  return (
    <section style={sectionStyles}>
      <BackgroundShape
        size="50vw"
        top="-10%"
        left="-25%"
        color={theme.colors.primary}
        opacity={0.15}
      />
      <BackgroundShape
        size="40vw"
        top="30%"
        right="-20%"
        color={theme.colors.secondary}
        opacity={0.15}
      />

      <div style={contentContainerStyles}>
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
            <Card key={item.title} variant="glass" interactive>
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
                  fontSize: theme.typography.fontSize.base,
                }}
              >
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <Card variant="glass">
          <div style={{ textAlign: "center", padding: theme.spacing.xl }}>
            <h3
              style={{
                fontSize: theme.typography.fontSize["2xl"],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.inverse,
                marginBottom: theme.spacing.md,
              }}
            >
              Explore the Connect UIKit
            </h3>
            <p
              style={{
                color: theme.colors.text.tertiary,
                maxWidth: "600px",
                margin: `0 auto ${theme.spacing.xl} auto`,
                lineHeight: 1.6,
              }}
            >
              The Connect UIKit is our internal library of reusable React
              components, built on the principles of MADE. It's the toolbox
              you'll use to build applications.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: theme.spacing.md,
                flexWrap: "wrap",
              }}
            >
              <Button
                onClick={() => window.open("#", "_blank")}
                variant="primary"
              >
                Connect UI Kit Storybook{" "}
                <ExternalLink
                  size={16}
                  style={{ marginLeft: theme.spacing.sm }}
                />
              </Button>
              <Button
                onClick={() => window.open("#", "_blank")}
                variant="glass"
              >
                MADE Storybook{" "}
                <ExternalLink
                  size={16}
                  style={{ marginLeft: theme.spacing.sm }}
                />
              </Button>
            </div>
          </div>
        </Card>

        <Card variant="glass">
          <div style={{ padding: theme.spacing.xl }}>
            <h3
              style={{
                fontSize: theme.typography.fontSize["2xl"],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.inverse,
                marginBottom: theme.spacing.xl,
                textAlign: "center",
              }}
            >
              Figma Designs
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: theme.spacing.xl,
              }}
            >
              <div style={figmaEmbedWrapperStyles}>
                <FigmaEmbed
                  style={figmaEmbedStyles}
                  url="https://www.figma.com/design/ImwfNaHsKZvvcY7BHpbdhE/Glow?node-id=0-1&t=uUPoOGjchnc7OF9a-1"
                />
              </div>
              <div style={figmaEmbedWrapperStyles}>
                <FigmaEmbed
                  style={figmaEmbedStyles}
                  url="https://www.figma.com/design/ImwfNaHsKZvvcY7BHpbdhE/Glow?node-id=0-1&t=uUPoOGjchnc7OF9a-1"
                />
              </div>
              <div style={figmaEmbedWrapperStyles}>
                <FigmaEmbed
                  style={figmaEmbedStyles}
                  url="https://www.figma.com/design/ImwfNaHsKZvvcY7BHpbdhE/Glow?node-id=0-1&t=uUPoOGjchnc7OF9a-1"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DesignSystems;
