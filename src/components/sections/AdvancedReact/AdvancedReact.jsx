import React, { useState, useCallback } from "react";
import {
  Shield,
  Repeat,
  Puzzle,
  ArrowRight,
  File,
  Files,
  Server,
  Zap,
} from "lucide-react";
import { theme } from "../../../theme";
import Button from "../../ui/Button/Button";
import CodeBlock from "../../ui/CodeBlock/CodeBlock";

// --- Simplified Child Component for useCallback demo ---
const MemoizedChild = React.memo(({ type, onClick }) => {
  const renderCount = React.useRef(0);
  renderCount.current += 1;

  const isMemoized = type === "Memoized";

  const childStyles = {
    backgroundColor: theme.colors.background.primary,
    border: `1px solid ${theme.colors.border.medium}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    textAlign: "center",
    width: "180px",
    position: "relative",
    boxShadow: theme.shadows.sm,
    transition: "all 0.2s ease",
  };

  const labelStyle = {
    fontWeight: "600",
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  };

  const countStyle = {
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: "bold",
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.mono,
  };

  const statusStyle = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginTop: theme.spacing.xs,
  };

  return (
    <div style={childStyles}>
      <div style={labelStyle}>{type}</div>
      <div style={countStyle}>{renderCount.current}</div>
      <div style={statusStyle}>renders</div>
    </div>
  );
});

const AdvancedReact = () => {
  const [parentRenderCount, setParentRenderCount] = useState(0);

  const memoizedCallback = useCallback(() => {
    console.log("Memoized callback created. Its identity is stable.");
  }, []);

  const nonMemoizedCallback = () => {
    console.log(
      "Non-memoized callback created. A new function is created on every parent render."
    );
  };

  const staticImportCode = `// All components are bundled into main.js
import RegularComponent from './RegularComponent';

function App() {
  return <RegularComponent />;
}`;

  const dynamicImportCode = `// LazyComponent.js is in a separate bundle
const LazyComponent = React.lazy(() => 
  import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <LazyComponent />
    </Suspense>
  );
}`;

  const webpackConfigCode = `// webpack.config.js
module.exports = {
  output: {
    filename: 'bundle.[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
};`;

  const viteExampleCode = `// No config needed for dev!
// Vite serves files as native ES modules.
// 'npm run build' handles production bundling.`;

  const sectionStyles = {
    padding: `${theme.spacing["4xl"]} 0`,
    maxWidth: "1200px",
    margin: "0 auto",
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
  };

  const headerStyles = {
    textAlign: "center",
    marginBottom: theme.spacing["4xl"],
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize["4xl"],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text.primary,
  };

  const subtitleStyles = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: 1.6,
  };

  // Section wrapper without cards
  const conceptSectionStyles = {
    marginBottom: theme.spacing["4xl"],
    paddingBottom: theme.spacing["3xl"],
  };

  const conceptHeaderStyles = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  };

  const conceptTitleStyles = {
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    margin: 0,
  };

  const conceptDescriptionStyles = {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: 1.6,
    marginBottom: theme.spacing["2xl"],
    maxWidth: "800px",
  };

  // Demo area styling
  const demoAreaStyles = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: theme.spacing["3xl"],
    alignItems: "start",
  };

  const controlPanelStyles = {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing["2xl"],
    border: `1px solid ${theme.colors.border.medium}`,
  };

  const resultsAreaStyles = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.xl,
  };

  const parentCounterStyles = {
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  };

  const childrenContainerStyles = {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing["2xl"],
  };

  // Code splitting layout
  const codeSplittingLayoutStyles = {
    display: "grid",
    gap: theme.spacing["3xl"],
  };

  const comparisonRowStyles = {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: theme.spacing.xl,
    alignItems: "center",
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.border.medium}`,
  };

  const bundleVisualizationStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.border.light}`,
  };

  const bundlerGridStyles = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing["2xl"],
    marginTop: theme.spacing["2xl"],
  };

  const bundlerSectionStyles = {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.lg,
  };

  const bundlerHeaderStyles = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  };

  const bundlerTitleStyles = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  };

  const bundlerDescriptionStyles = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 1.5,
    marginBottom: theme.spacing.lg,
  };

  return (
    <section style={sectionStyles}>
      <header style={headerStyles}>
        <h2 style={titleStyles}>Advanced Performance Patterns</h2>
        <p style={subtitleStyles}>
          Interactive experiments demonstrating key hooks and patterns for
          building highly performant React applications.
        </p>
      </header>

      {/* useCallback Demo Section */}
      <div style={conceptSectionStyles}>
        <div style={conceptHeaderStyles}>
          <Shield size={24} color={theme.colors.primary} />
          <h3 style={conceptTitleStyles}>
            <code>useCallback</code> + <code>React.memo</code>
          </h3>
        </div>

        <p style={conceptDescriptionStyles}>
          Prevent child components from re-rendering by memoizing callbacks.
          Click "Re-render Parent" and notice only the "Non-Memoized"
          component's render count increases, because a new function is passed
          to it on every render.
        </p>

        <div style={demoAreaStyles}>
          <div style={controlPanelStyles}>
            <div style={parentCounterStyles}>
              <p
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing.sm,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Parent Renders
              </p>
              <p
                style={{
                  fontSize: theme.typography.fontSize["3xl"],
                  fontWeight: "bold",
                  color: theme.colors.primary,
                  marginBottom: theme.spacing.lg,
                  fontFamily: theme.typography.fontFamily.mono,
                }}
              >
                {parentRenderCount}
              </p>
              <Button onClick={() => setParentRenderCount((c) => c + 1)}>
                <Repeat size={16} /> Re-render Parent
              </Button>
            </div>
          </div>

          <div style={resultsAreaStyles}>
            <div style={childrenContainerStyles}>
              <MemoizedChild type="Memoized" onClick={memoizedCallback} />
              <MemoizedChild
                type="Non-Memoized"
                onClick={nonMemoizedCallback}
              />
            </div>
            <p
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.tertiary,
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Watch how the memoized component maintains its render count
            </p>
          </div>
        </div>
      </div>

      {/* Code Splitting Section */}
      <div style={conceptSectionStyles}>
        <div style={conceptHeaderStyles}>
          <Puzzle size={24} color={theme.colors.primary} />
          <h3 style={conceptTitleStyles}>
            <code>React.lazy</code> & Code-Splitting
          </h3>
        </div>

        <p style={conceptDescriptionStyles}>
          Code splitting ensures our initial bundle does not become too large.
          We can load code "chunks" on demand or in parallel, decreasing initial
          load times by only downloading what's necessary for the current view.
        </p>

        <div style={codeSplittingLayoutStyles}>
          {/* Static vs Dynamic Import Comparison */}
          <div style={comparisonRowStyles}>
            <CodeBlock language="javascript">{staticImportCode}</CodeBlock>
            <ArrowRight size={24} color={theme.colors.text.tertiary} />
            <div style={bundleVisualizationStyles}>
              <File size={32} color={theme.colors.text.secondary} />
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontWeight: "600",
                    color: theme.colors.text.primary,
                  }}
                >
                  main-bundle.js
                </p>
                <p
                  style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.text.tertiary,
                  }}
                >
                  Large monolithic bundle
                </p>
              </div>
            </div>
          </div>

          <div style={comparisonRowStyles}>
            <CodeBlock language="javascript">{dynamicImportCode}</CodeBlock>
            <ArrowRight size={24} color={theme.colors.text.tertiary} />
            <div style={bundleVisualizationStyles}>
              <Files size={32} color={theme.colors.primary} />
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontWeight: "600",
                    color: theme.colors.text.primary,
                  }}
                >
                  main.js + chunks
                </p>
                <p
                  style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.text.tertiary,
                  }}
                >
                  Optimized code splitting
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bundler Tools Section */}
        <h4
          style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            textAlign: "center",
            marginTop: theme.spacing["3xl"],
            marginBottom: theme.spacing.xl,
          }}
        >
          How Bundlers Handle This
        </h4>

        <div style={bundlerGridStyles}>
          <div style={bundlerSectionStyles}>
            <div style={bundlerHeaderStyles}>
              <Server size={20} color={theme.colors.text.secondary} />
              <h5 style={bundlerTitleStyles}>Webpack</h5>
            </div>
            <p style={bundlerDescriptionStyles}>
              Builds a dependency graph and bundles modules into static assets
              with advanced chunking strategies.
            </p>
            <CodeBlock language="javascript">{webpackConfigCode}</CodeBlock>
          </div>

          <div style={bundlerSectionStyles}>
            <div style={bundlerHeaderStyles}>
              <Zap size={20} color={theme.colors.text.secondary} />
              <h5 style={bundlerTitleStyles}>Vite</h5>
            </div>
            <p style={bundlerDescriptionStyles}>
              Uses native ES modules in development for instant server start and
              lightning-fast hot module replacement.
            </p>
            <CodeBlock language="javascript">{viteExampleCode}</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedReact;
