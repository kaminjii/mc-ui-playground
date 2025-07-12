// src/components/layout/Footer/Footer.jsx
import React from 'react';
import { theme } from '../../../theme';

const Footer = () => {
  const footerStyles = {
    backgroundColor: theme.colors.background.secondary,
    padding: `${theme.spacing.xl}`,
    position: 'relative',
    zIndex: 10,
    borderTop: `1px solid ${theme.colors.border.light}`
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
  };

  const copyrightStyles = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.tertiary,
  };

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        <div style={logoStyles}>
          {/* Mastercard-inspired logo mark */}
          <div style={{ display: 'flex' }}>
            <div style={{ width: '24px', height: '24px', background: theme.colors.secondary, borderRadius: '50%' }} />
            <div style={{ width: '24px', height: '24px', background: theme.colors.accent.yellow, borderRadius: '50%', marginLeft: '-12px', opacity: 0.9 }} />
          </div>
        </div>
        <div style={copyrightStyles}>
          © {new Date().getFullYear()} Mastercard. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;