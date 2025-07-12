import React from "react";
import { motion } from "framer-motion";
import { Zap, Code, ShieldCheck, Paintbrush, ArrowRight } from "lucide-react";
import { theme } from "../../../theme";

const tools = [
  {
    icon: <Paintbrush size={28} color={theme.colors.primary} />,
    title: "Prettier & ESLint",
    description: "Format code and enforce quality rules as you write.",
  },
  {
    icon: <Code size={28} color={theme.colors.primary} />,
    title: "Babel",
    description: "Transpiles modern JS into browser-compatible versions.",
  },
  {
    icon: <Zap size={28} color={theme.colors.primary} />,
    title: "Vite",
    description: "Bundles code and serves it with a fast dev server.",
  },
];

const BuildTools = () => {
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
  const workflowContainerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,
    flexWrap: "wrap",
  };
  const toolNodeStyles = {
    border: `1px solid ${theme.colors.border.light}`,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    textAlign: "center",
    flex: "1",
    minWidth: "220px",
    maxWidth: "280px",
    backgroundColor: theme.colors.background.primary,
    boxShadow: theme.shadows.md,
  };
  const arrowStyles = {
    color: theme.colors.text.tertiary,
    flexShrink: 0,
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>Modern Frontend Workflow</h2>
          <p style={subtitleStyles}>
            Your code goes on a journey from your editor to the user's browser,
            powered by a toolchain that ensures quality and compatibility.
          </p>
        </header>
        <div style={workflowContainerStyles}>
          {tools.map((tool, index) => (
            <React.Fragment key={tool.title}>
              <motion.div
                style={toolNodeStyles}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    padding: theme.spacing.lg,
                    backgroundColor: theme.colors.background.secondary,
                    borderRadius: theme.borderRadius.full,
                    marginBottom: theme.spacing.lg,
                  }}
                >
                  {tool.icon}
                </div>
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight.bold,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  {tool.title}
                </h3>
                <p
                  style={{
                    color: theme.colors.text.secondary,
                    lineHeight: 1.6,
                  }}
                >
                  {tool.description}
                </p>
              </motion.div>
              {index < tools.length - 1 && (
                <motion.div
                  style={arrowStyles}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                >
                  <ArrowRight size={32} />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildTools;
