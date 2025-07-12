// src/components/sections/PropDrilling/PropDrilling.jsx
import React from "react";
import { motion } from "framer-motion";
import { Share2, ArrowDown } from "lucide-react";
import { theme } from "../../../theme";
import Card from "../../ui/Card/Card";

const ComponentNode = ({
  name,
  children,
  isDrilling,
  isReceiving,
  isContext,
  style,
}) => {
  const nodeStyle = {
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    backgroundColor: isContext
      ? theme.colors.background.primary
      : theme.colors.background.secondary,
    border: `1px solid ${
      isReceiving ? theme.colors.primary : theme.colors.border.light
    }`,
    borderRadius: theme.borderRadius.md,
    textAlign: "center",
    position: "relative",
    boxShadow: isReceiving
      ? `0 0 15px ${theme.colors.primary}33`
      : theme.shadows.sm,
    transition: "all 0.4s ease",
    ...style,
  };
  return (
    <div
      style={{
        padding: `${theme.spacing.lg} 0`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={nodeStyle}>{name}</div>
      {children && (
        <ArrowDown
          size={24}
          color={isDrilling ? theme.colors.text.tertiary : "transparent"}
          style={{
            margin: `${theme.spacing.sm} 0`,
            transition: "color 0.4s ease",
          }}
        />
      )}
      {children && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const PropDrilling = () => {
  const sectionStyles = {
    padding: `${theme.spacing["3xl"]} 0`,
    backgroundColor: theme.colors.background.primary,
  };
  const containerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: `0 ${theme.spacing.xl}`,
  };
  const headerStyles = {
    textAlign: "center",
    marginBottom: theme.spacing["3xl"],
  };
  const titleStyles = {
    fontSize: theme.typography.fontSize["4xl"],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.md,
  };
  const subtitleStyles = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    maxWidth: "750px",
    margin: "0 auto",
    lineHeight: 1.6,
  };
  const vizGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing["3xl"],
    alignItems: "center",
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>The Prop Drilling Problem</h2>
          <p style={subtitleStyles}>
            "Prop drilling" refers to passing data from a parent component down
            through various levels of nested child components, even if the
            intermediate components don't need the data themselves.
          </p>
        </header>
        <Card variant="elevated">
          <div style={vizGrid}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: theme.spacing.lg,
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                The Problem: Prop Drilling
              </h3>
              <ComponentNode name="Parent (Has Data)" isReceiving>
                <ComponentNode name="Child A (Doesn't need data)" isDrilling>
                  <ComponentNode name="Child B (Doesn't need data)" isDrilling>
                    <ComponentNode name="Grandchild (Needs Data)" isReceiving />
                  </ComponentNode>
                </ComponentNode>
              </ComponentNode>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: theme.spacing.lg,
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                The Solution: Context API
              </h3>
              <ComponentNode name="Provider (Has Data)" isContext isReceiving>
                <div
                  style={{
                    padding: theme.spacing.xl,
                    margin: `${theme.spacing.sm} 0`,
                    border: `2px dashed ${theme.colors.border.medium}`,
                    borderRadius: theme.borderRadius.lg,
                    position: "relative",
                  }}
                >
                  <Share2
                    size={20}
                    color={theme.colors.primary}
                    style={{ position: "absolute", top: 10, right: 10 }}
                  />
                  <p
                    style={{
                      textAlign: "center",
                      color: theme.colors.text.tertiary,
                      fontStyle: "italic",
                      marginBottom: theme.spacing.lg,
                    }}
                  >
                    Context established
                  </p>
                  <ComponentNode
                    name="Child A"
                    style={{
                      backgroundColor: "transparent",
                      border: `1px dashed ${theme.colors.border.light}`,
                    }}
                  />
                  <ComponentNode
                    name="Child B"
                    style={{
                      backgroundColor: "transparent",
                      border: `1px dashed ${theme.colors.border.light}`,
                    }}
                  />
                  <ComponentNode
                    name="Grandchild (Consumes Data)"
                    isReceiving
                  />
                </div>
              </ComponentNode>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PropDrilling;
