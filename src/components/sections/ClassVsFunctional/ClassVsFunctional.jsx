// src/components/sections/ClassVsFunctional/ClassVsFunctional.jsx
import React from "react";
import { motion } from "framer-motion";
import { theme } from "../../../theme";
import Card from "../../ui/Card/Card";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ClassVsFunctional = () => {
  const sectionStyles = {
    padding: `${theme.spacing["3xl"]} 0`,
    backgroundColor: theme.colors.background.secondary,
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
  const comparisonGridStyles = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing.xl,
    alignItems: "start",
  };

  const codeCardStyles = {
    padding: 0,
    overflow: "hidden",
  };

  const codeHeaderStyles = {
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    borderBottom: `1px solid ${theme.colors.border.medium}`,
    backgroundColor: theme.colors.background.primary,
  };

  const classComponentCode = `import React, { Component } from 'react';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello'
    };
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  render() {
    return (
      <h1>{this.state.message}, {this.props.name}</h1>
    );
  }
}`;

  const functionalComponentCode = `import React, { useState, useEffect } from 'react';

const Welcome = ({ name }) => {
  const [message, setMessage] = useState('Hello');

  useEffect(() => {
    console.log('Component rendered/updated');
  }, []);

  return (
    <h1>{message}, {name}</h1>
  );
};`;

  const syntaxHighlighterStyle = {
    ...atomOneDark,
    hljs: {
      ...atomOneDark.hljs,
      background: "transparent",
      padding: theme.spacing.lg,
      fontSize: theme.typography.fontSize.sm,
      lineHeight: "1.7",
    },
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>Class vs. Functional Components</h2>
          <p style={subtitleStyles}>
            React has evolved from primarily using class-based components to
            favoring functional components with Hooks. Functional components are
            generally more concise, easier to read and test, and offer better
            performance.
          </p>
        </header>

        <div style={comparisonGridStyles}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card style={codeCardStyles}>
              <div style={codeHeaderStyles}>
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                  }}
                >
                  Class Component (Legacy)
                </h3>
              </div>
              <SyntaxHighlighter
                language="javascript"
                style={syntaxHighlighterStyle}
              >
                {classComponentCode}
              </SyntaxHighlighter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Card style={codeCardStyles}>
              <div style={codeHeaderStyles}>
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                  }}
                >
                  Functional Component (Modern)
                </h3>
              </div>
              <SyntaxHighlighter
                language="javascript"
                style={syntaxHighlighterStyle}
              >
                {functionalComponentCode}
              </SyntaxHighlighter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ClassVsFunctional;
