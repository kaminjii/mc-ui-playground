import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { theme } from "../../../theme";

const CodeBlock = ({ children, language = "javascript", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const containerStyles = {
    position: "relative",
    backgroundColor: theme.colors.background.dark,
    borderRadius: theme.borderRadius.xl,
    overflow: "hidden",
    boxShadow: `${theme.shadows.lg}, 0 0 0 1px rgba(255, 255, 255, 0.08)`,
    border: `1px solid ${theme.colors.border.medium}`,
    backdropFilter: "blur(8px)",
  };

  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(4px)",
  };

  const languageTagStyles = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
    fontFamily: theme.typography.fontFamily.mono,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontWeight: "600",
    position: "relative",
  };

  const copyButtonStyles = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: copied
      ? "rgba(34, 197, 94, 0.15)"
      : "rgba(255, 255, 255, 0.08)",
    border: `1px solid ${
      copied ? "rgba(34, 197, 94, 0.3)" : "rgba(255, 255, 255, 0.15)"
    }`,
    borderRadius: theme.borderRadius.md,
    color: copied ? "#22c55e" : theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    transform: "translateY(0)",
  };

  const codeStyles = {
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    overflow: "auto",
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.relaxed,
    fontFamily: theme.typography.fontFamily.mono,
    color: theme.colors.text.inverse,
    backgroundColor: "transparent",
    margin: 0,
    // Enhanced scrollbar styling
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
  };

  const scrollbarStyles = `
    .code-block-content::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    .code-block-content::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
    }
    
    .code-block-content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      transition: background 0.2s ease;
    }
    
    .code-block-content::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div style={containerStyles} className={className}>
        <div style={headerStyles}>
          <span style={languageTagStyles}>
            {language}
            <div
              style={{
                position: "absolute",
                bottom: "-2px",
                left: "0",
                right: "0",
                height: "1px",
                background: `linear-gradient(90deg, ${theme.colors.primary}, transparent)`,
                borderRadius: "1px",
              }}
            />
          </span>
          <button
            onClick={copyToClipboard}
            style={copyButtonStyles}
            onMouseEnter={(e) => {
              if (!copied) {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.15)";
                e.target.style.transform = "translateY(0)";
              }
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "translateY(0) scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "translateY(-1px) scale(1)";
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
        <pre style={codeStyles} className="code-block-content">
          <code>{children}</code>
        </pre>
      </div>
    </>
  );
};

export default CodeBlock;
