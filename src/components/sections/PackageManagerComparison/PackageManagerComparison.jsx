import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ToyBrick, DatabaseZap } from "lucide-react";
import { theme } from "../../../theme";
import Card from "../../ui/Card/Card";

const managers = [
  {
    icon: <Package size={32} />,
    title: "NPM",
    description:
      "The default package manager for Node.js. It's the most widely used and comes bundled with Node, making it the standard choice for most projects.",
  },
  {
    icon: <ToyBrick size={32} />,
    title: "Yarn",
    description:
      "Developed by Facebook to improve upon npm's performance and security in its early days. It introduced features like lockfiles for deterministic installs.",
  },
  {
    icon: <DatabaseZap size={32} />,
    title: "PNPM",
    description:
      "Focuses on speed and efficiency. It saves disk space by using a content-addressable store and symlinking packages, avoiding duplication.",
  },
];

const PackageManagerComparison = () => {
  const [selected, setSelected] = useState(managers[0]);

  const sectionStyles = {
    padding: `${theme.spacing["3xl"]} 0`,
    backgroundColor: theme.colors.background.secondary,
  };
  const containerStyles = {
    maxWidth: "1000px",
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
  const selectorContainerStyles = {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  };
  const selectorButtonStyles = (isSelected) => ({
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.full,
    cursor: "pointer",
    transition: "all 0.3s ease",
    backgroundColor: isSelected ? theme.colors.primary : "transparent",
    color: isSelected ? theme.colors.text.inverse : theme.colors.text.primary,
    border: `1px solid ${
      isSelected ? "transparent" : theme.colors.border.medium
    }`,
  });

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>Package Managers</h2>
          <p style={subtitleStyles}>
            These tools automate the process of installing, upgrading,
            configuring, and removing project dependencies from a central
            registry.
          </p>
        </header>

        <div style={selectorContainerStyles}>
          {managers.map((manager) => (
            <motion.div
              key={manager.title}
              style={selectorButtonStyles(selected.title === manager.title)}
              onClick={() => setSelected(manager)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {manager.icon}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Card>
              <div style={{ textAlign: "center", padding: theme.spacing.xl }}>
                <h3
                  style={{
                    fontSize: theme.typography.fontSize["2xl"],
                    fontWeight: theme.typography.fontWeight.bold,
                    marginBottom: theme.spacing.md,
                  }}
                >
                  {selected.title}
                </h3>
                <p
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    color: theme.colors.text.secondary,
                    lineHeight: 1.6,
                    maxWidth: "600px",
                    margin: "0 auto",
                  }}
                >
                  {selected.description}
                </p>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PackageManagerComparison;
