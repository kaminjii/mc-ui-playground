// src/components/sections/BuildTools/BuildTools.jsx
import React from "react";
import { Zap, Server, Package, TestTube, Bug, Wrench } from "lucide-react";
import { theme } from "../../../theme";
import CodeBlock from "../../ui/CodeBlock/CodeBlock";

const BuildTools = () => {
  const vitestMockCode = `// setupTests.js or at the top of your test file

import { vi } from 'vitest';

// Tell Vitest to replace the module with an empty object
vi.mock('@connect/typography', () => ({
  // You can mock specific exports if needed,
  // but an empty object is often enough.
  default: {},
}));
`;

  // --- Styles ---
  const sectionStyles = {
    padding: `${theme.spacing["3xl"]} 0`,
    position: "relative",
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
    maxWidth: "800px",
    margin: "0 auto",
    lineHeight: 1.6,
  };
  const cardStyles = {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    border: `1px solid ${theme.colors.border.light}`,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };
  const conceptTitleStyles = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.md,
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
  };
  const toolCardStyles = {
    ...cardStyles,
    alignItems: "center",
    textAlign: "center",
  };
  const descriptionStyles = {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: 1.6,
    flexGrow: 1,
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>The React Tooling Landscape</h2>
          <p style={subtitleStyles}>
            A summary of modern build tools and frameworks, why the ecosystem
            has evolved, and how to solve common testing challenges.
          </p>
        </header>

        {/* Tooling Comparison */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: theme.spacing.xl,
            alignItems: "stretch",
          }}
        >
          <div style={toolCardStyles}>
            <Package
              size={40}
              color={theme.colors.text.tertiary}
              style={{ marginBottom: theme.spacing.md }}
            />
            <h3 style={{ ...conceptTitleStyles, justifyContent: "center" }}>
              Create React App (CRA)
            </h3>
            <p style={descriptionStyles}>
              The original zero-config tool for React. It was sunsetted because
              its underlying bundler (Webpack) became slow for modern
              development, and it lacked the flexibility needed for many
              projects.
            </p>
          </div>
          <div style={toolCardStyles}>
            <Zap
              size={40}
              color={theme.colors.primary}
              style={{ marginBottom: theme.spacing.md }}
            />
            <h3 style={{ ...conceptTitleStyles, justifyContent: "center" }}>
              Vite
            </h3>
            <p style={descriptionStyles}>
              The modern successor to CRA for client-side apps. It uses native
              ES modules for a lightning-fast development server and Rollup for
              highly optimized production builds. It is now the official
              recommendation from the React team.
            </p>
          </div>
          <div style={toolCardStyles}>
            <Server
              size={40}
              color={theme.colors.text.secondary}
              style={{ marginBottom: theme.spacing.md }}
            />
            <h3 style={{ ...conceptTitleStyles, justifyContent: "center" }}>
              Next.js
            </h3>
            <p style={descriptionStyles}>
              A full-stack React framework for production. It provides
              server-side rendering (SSR), static site generation (SSG),
              file-based routing, and API routes out of the box. Use it when you
              need more than just a client-side app.
            </p>
          </div>
        </div>

        {/* Testing Section */}
        <div style={{ ...cardStyles, marginTop: theme.spacing.xl }}>
          <h3 style={conceptTitleStyles}>
            <TestTube size={24} /> Testing Static Assets: Vitest vs. Jest
          </h3>
          <p style={descriptionStyles}>
            We encountered an issue where Vitest failed when a component
            imported the `@connect/typography` package, because that package, in
            turn, imports a `.woff2` font file. Here's why this happens and how
            to solve it.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: theme.spacing.xl,
              marginTop: theme.spacing.lg,
            }}
          >
            <div>
              <h4
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing.sm,
                  fontWeight: "bold",
                }}
              >
                <Bug size={20} color={theme.colors.error} /> The Problem with
                Vitest
              </h4>
              <p style={{ ...descriptionStyles, marginTop: theme.spacing.sm }}>
                Vitest runs in a Node.js environment, which doesn't understand
                how to process non-JavaScript assets like font files (`.woff2`),
                CSS, or images by default. When it sees `import './font.woff2'`,
                it throws an error because it's not a valid JavaScript module.
              </p>
            </div>
            <div>
              <h4
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing.sm,
                  fontWeight: "bold",
                }}
              >
                <Wrench size={20} color={theme.colors.success} /> How CRA (Jest)
                Handled It
              </h4>
              <p style={{ ...descriptionStyles, marginTop: theme.spacing.sm }}>
                Create React App's Jest configuration came pre-configured with
                "transforms." These transforms would intercept imports for
                static assets and replace them with a mock value (like a
                filename string), preventing the test runner from crashing.
              </p>
            </div>
          </div>

          <div style={{ marginTop: theme.spacing.xl }}>
            <h4
              style={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing.sm,
                fontWeight: "bold",
              }}
            >
              The Solution: Mocking the Module
            </h4>
            <p style={{ ...descriptionStyles, marginTop: theme.spacing.sm }}>
              Since we only need to prevent the test from crashing on the
              import, we can tell Vitest to replace the entire
              `@connect/typography` module with a "mock" (a fake version). This
              satisfies the import and allows our component tests to run.
            </p>
            <CodeBlock theme="light">{vitestMockCode}</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildTools;
