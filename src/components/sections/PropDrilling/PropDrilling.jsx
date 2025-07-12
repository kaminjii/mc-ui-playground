import React, { useState, useContext, createContext } from "react";
import {
  Share2,
  ArrowDown,
  ThumbsDown,
  ThumbsUp,
  Code,
  Box,
  GitBranch,
  Zap,
  Link,
  Unlink,
  Edit,
} from "lucide-react";
import { theme } from "../../../theme";

// 1. Create the context for the solution
const UserContext = createContext();

// --- Reusable UI Components for the Demo ---

// A wrapper to visually represent a component in the tree
const ComponentWrapper = ({
  label,
  code,
  isPassing,
  isConsuming,
  children,
  hasProp,
}) => {
  const getBorderColor = () => {
    if (isConsuming) return theme.colors.primary;
    if (isPassing) return theme.colors.border.medium;
    return theme.colors.border.light;
  };
  const wrapperStyles = {
    border: `2px ${isPassing ? "dashed" : "solid"} ${getBorderColor()}`,
    backgroundColor: isPassing
      ? "rgba(255, 255, 255, 0.05)"
      : theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    margin: `${theme.spacing.md} 0`,
    position: "relative",
    transition: "all 0.3s ease",
    boxShadow: isConsuming ? theme.shadows.md : "none",
  };
  const labelStyles = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: isConsuming ? theme.colors.primary : theme.colors.text.primary,
  };
  const codeToggleStyles = {
    position: "absolute",
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    cursor: "pointer",
    color: theme.colors.text.tertiary,
  };
  const propLabelStyles = {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.mono,
    color: theme.colors.text.secondary,
    backgroundColor: theme.colors.background.secondary,
    padding: `2px ${theme.spacing.xs}`,
    borderRadius: theme.borderRadius.sm,
    marginLeft: theme.spacing.sm,
  };

  const [showCode, setShowCode] = useState(false);

  return (
    <div style={wrapperStyles}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span style={labelStyles}>{label}</span>
          {hasProp && <span style={propLabelStyles}>props.user</span>}
        </div>
        <Code
          size={16}
          style={codeToggleStyles}
          onClick={() => setShowCode(!showCode)}
        />
      </div>
      {showCode && (
        <pre
          style={{
            backgroundColor: "#282c34",
            color: "#abb2bf",
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            marginTop: theme.spacing.md,
            fontSize: "12px",
            whiteSpace: "pre-wrap",
            textAlign: "left",
          }}
        >
          <code>{code}</code>
        </pre>
      )}
      <div style={{ paddingTop: theme.spacing.sm }}>{children}</div>
    </div>
  );
};

// The final component that displays the user's name
const UserDisplay = ({ user, fromContext = false }) => {
  const userDisplayStyles = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    border: `1px solid ${theme.colors.border.light}`,
  };
  return (
    <p style={userDisplayStyles}>
      {fromContext && <Share2 size={16} />}
      Hello, {user.name}!
    </p>
  );
};

// An explanation block with key points
const KeyPointsBlock = ({ title, items }) => {
  return (
    <div style={{ marginTop: "auto", paddingTop: theme.spacing.xl }}>
      <h4
        style={{
          textAlign: "center",
          fontWeight: theme.typography.fontWeight.bold,
          marginBottom: theme.spacing.lg,
          fontSize: theme.typography.fontSize.lg,
        }}
      >
        {title}
      </h4>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: theme.spacing.md,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{ textAlign: "center", color: theme.colors.text.secondary }}
          >
            <item.icon
              size={24}
              style={{
                marginBottom: theme.spacing.xs,
                color: item.isGood ? theme.colors.success : theme.colors.error,
              }}
            />
            <p
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Components for Prop Drilling Demo ---
const Level1 = ({ user }) => (
  <ComponentWrapper
    label="Level1.jsx"
    code={`const Level1 = ({ user }) => (\n  <Level2 user={user} />\n);`}
    isPassing
    hasProp
  >
    <Level2 user={user} />
  </ComponentWrapper>
);
const Level2 = ({ user }) => (
  <ComponentWrapper
    label="Level2.jsx"
    code={`const Level2 = ({ user }) => (\n  <Level3 user={user} />\n);`}
    isPassing
    hasProp
  >
    <ArrowDown
      size={20}
      style={{ margin: "auto", color: theme.colors.text.tertiary }}
    />
    <Level3 user={user} />
  </ComponentWrapper>
);
const Level3 = ({ user }) => (
  <ComponentWrapper
    label="Level3.jsx"
    code={`const Level3 = ({ user }) => (\n  <UserDisplay user={user} />\n);`}
    isConsuming
    hasProp
  >
    <UserDisplay user={user} />
  </ComponentWrapper>
);

// --- Components for useContext Demo ---
const ContextLevel1 = () => (
  <ComponentWrapper
    label="Level1.jsx"
    code={`const ContextLevel1 = () => (\n  <ContextLevel2 />\n);`}
  >
    <ContextLevel2 />
  </ComponentWrapper>
);
const ContextLevel2 = () => (
  <ComponentWrapper
    label="Level2.jsx"
    code={`const ContextLevel2 = () => (\n  <ContextLevel3 />\n);`}
  >
    <ArrowDown
      size={20}
      style={{ margin: "auto", color: theme.colors.text.tertiary }}
    />
    <ContextLevel3 />
  </ComponentWrapper>
);
const ContextLevel3 = () => {
  const user = useContext(UserContext);
  return (
    <ComponentWrapper
      label="Level3.jsx"
      code={`const user = useContext(UserContext);`}
      isConsuming
    >
      <UserDisplay user={user} fromContext />
    </ComponentWrapper>
  );
};

// --- Main Component ---
const PropDrilling = () => {
  const [user, setUser] = useState({ name: "Kaitlin" });

  const sectionStyles = {
    padding: `${theme.spacing["3xl"]} 0`,
    backgroundColor: theme.colors.background.secondary,
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
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: 1.6,
  };
  const comparisonGridStyles = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing["2xl"],
    alignItems: "stretch",
  };
  const columnStyles = {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    border: `1px solid ${theme.colors.border.light}`,
    display: "flex",
    flexDirection: "column",
  };
  const demoTitleStyles = {
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
    textAlign: "center",
  };

  const SourceBox = ({ children, color }) => (
    <div
      style={{
        border: `2px solid ${color}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        textAlign: "center",
        backgroundColor: theme.colors.background.secondary,
      }}
    >
      {children}
    </div>
  );

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>Solving Prop Drilling</h2>
          <p style={subtitleStyles}>
            A concise, visual comparison of state management patterns for
            experienced engineers.
          </p>
        </header>

        <div
          style={{
            textAlign: "center",
            marginBottom: theme.spacing.xl,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: theme.spacing.md,
          }}
        >
          <Edit size={20} color={theme.colors.text.secondary} />
          <label
            style={{
              fontWeight: theme.typography.fontWeight.semibold,
              fontSize: theme.typography.fontSize.lg,
            }}
          >
            Live State:
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ name: e.target.value })}
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                borderRadius: theme.borderRadius.md,
                border: `1px solid ${theme.colors.border.medium}`,
                fontSize: theme.typography.fontSize.lg,
                marginLeft: theme.spacing.sm,
                width: "150px",
              }}
            />
          </label>
        </div>

        <div style={comparisonGridStyles}>
          {/* Problem Column */}
          <div style={columnStyles}>
            <h3 style={demoTitleStyles}>The Problem: Prop Drilling</h3>
            <SourceBox color={theme.colors.error}>
              <div style={{ fontWeight: theme.typography.fontWeight.bold }}>
                State initialized in root
              </div>
            </SourceBox>
            <ArrowDown
              size={20}
              style={{
                margin: "1rem auto",
                display: "block",
                color: theme.colors.error,
              }}
            />
            <Level1 user={user} />
            <KeyPointsBlock
              title="Analysis"
              items={[
                { icon: Link, text: "Tightly Coupled", isGood: false },
                { icon: GitBranch, text: "Brittle to Refactor", isGood: false },
              ]}
            />
          </div>

          {/* Solution Column */}
          <div style={columnStyles}>
            <h3 style={demoTitleStyles}>The Solution: `useContext`</h3>
            <UserContext.Provider value={user}>
              <SourceBox color={theme.colors.success}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: theme.spacing.sm,
                    fontWeight: theme.typography.fontWeight.bold,
                  }}
                >
                  <Box /> UserContext.Provider
                </div>
              </SourceBox>
              <ArrowDown
                size={20}
                style={{
                  margin: "1rem auto",
                  display: "block",
                  color: theme.colors.success,
                }}
              />
              <ContextLevel1 />
            </UserContext.Provider>
            <KeyPointsBlock
              title="Analysis"
              items={[
                { icon: Unlink, text: "Decoupled", isGood: true },
                { icon: Zap, text: "Direct Consumption", isGood: true },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropDrilling;
