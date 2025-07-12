// src/components/sections/ReactEvolution/ReactEvolution.jsx
import React from "react";
import { motion } from "framer-motion";
import { GitCommit } from "lucide-react";
import { theme } from "../../../theme";

const ReactEvolution = () => {
  const sectionStyles = {
    padding: `${theme.spacing["3xl"]} 0`,
    backgroundColor: theme.colors.background.primary,
  };
  const containerStyles = {
    maxWidth: "800px",
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
    maxWidth: "650px",
    margin: "0 auto",
    lineHeight: 1.6,
  };
  const timelineStyles = {
    position: "relative",
    padding: `${theme.spacing.lg} 0`,
    "::before": {
      content: '""',
      position: "absolute",
      left: "19px",
      top: 0,
      bottom: 0,
      width: "2px",
      backgroundColor: theme.colors.border.light,
    },
  };
  const timelineItemStyles = {
    position: "relative",
    display: "flex",
    gap: theme.spacing.xl,
    paddingLeft: theme.spacing["3xl"],
    marginBottom: theme.spacing["2xl"],
  };
  const timelineIconStyles = {
    position: "absolute",
    left: 0,
    top: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: theme.colors.background.secondary,
    border: `2px solid ${theme.colors.border.light}`,
  };

  const events = [
    {
      year: "2013",
      title: "Initial Release",
      description:
        "Facebook open-sources React, introducing the Virtual DOM and a component-based architecture.",
    },
    {
      year: "2015",
      title: "React Native",
      description:
        'The "learn once, write anywhere" paradigm is introduced, allowing React to target mobile platforms.',
    },
    {
      year: "2017",
      title: "Fiber & Error Boundaries",
      description:
        "A complete rewrite of the core reconciliation algorithm for better performance, and a new way to catch errors.",
    },
    {
      year: "2018",
      title: "React Hooks",
      description:
        "The release of Hooks (useState, useEffect) revolutionizes state management in functional components.",
    },
    {
      year: "2020",
      title: "Concurrent Mode (Experimental)",
      description:
        "New APIs like `useTransition` are introduced to handle rendering without blocking the main thread.",
    },
    {
      year: "2022",
      title: "React 18 & Server Components",
      description:
        "Official release of concurrent features, automatic batching, and the introduction of Server Components.",
    },
  ];

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>The Evolution of React</h2>
          <p style={subtitleStyles}>
            From a simple UI library to a comprehensive ecosystem, React's
            journey has been marked by innovation that has shaped modern web
            development.
          </p>
        </header>
        <div style={timelineStyles}>
          {events.map((event, index) => (
            <motion.div
              key={index}
              style={timelineItemStyles}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div style={timelineIconStyles}>
                <GitCommit size={20} color={theme.colors.text.tertiary} />
              </div>
              <div>
                <span
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.primary,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  {event.year}
                </span>
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight.bold,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  {event.title}
                </h3>
                <p
                  style={{
                    color: theme.colors.text.secondary,
                    lineHeight: 1.6,
                  }}
                >
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReactEvolution;
