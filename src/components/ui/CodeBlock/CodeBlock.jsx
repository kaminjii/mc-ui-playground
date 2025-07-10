import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { theme } from '../../../theme';

const CodeBlock = ({ children, language = "javascript", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const containerStyles = {
    position: 'relative',
    backgroundColor: theme.colors.background.dark,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    boxShadow: theme.shadows.lg,
    border: `1px solid ${theme.colors.border.medium}`
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottom: `1px solid ${theme.colors.border.medium}`,
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  };

  const languageTagStyles = {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.tertiary,
    fontFamily: theme.typography.fontFamily.mono,
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  const copyButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: theme.borderRadius.md,
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.xs,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const codeStyles = {
    padding: theme.spacing.xl,
    overflow: 'auto',
    fontSize: theme.typography.fontSize.sm,
    lineHeight: theme.typography.lineHeight.relaxed,
    fontFamily: theme.typography.fontFamily.mono,
    color: theme.colors.text.inverse,
    backgroundColor: 'transparent',
    margin: 0
  };

  return (
    <div style={containerStyles} className={className}>
      <div style={headerStyles}>
        <span style={languageTagStyles}>{language}</span>
        <button 
          onClick={copyToClipboard}
          style={copyButtonStyles}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre style={codeStyles}>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;