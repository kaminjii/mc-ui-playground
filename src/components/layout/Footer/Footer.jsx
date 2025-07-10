import React from 'react';
import { theme } from '../../../theme';

const Footer = () => {
  const footerStyles = {
    textAlign: 'center',
    padding: `${theme.spacing['3xl']} ${theme.spacing.lg}`,
    backgroundColor: theme.colors.background.secondary,
    borderTop: `1px solid ${theme.colors.border.light}`,
    color: theme.colors.text.secondary
  };

  const containerStyles = {
    maxWidth: '800px',
    margin: '0 auto'
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize.lg,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text.primary
  };

  const descriptionStyles = {
    fontSize: theme.typography.fontSize.sm,
    marginBottom: theme.spacing.xl
  };

  const mastercardLogoStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl
  };

  const logoTextStyles = {
    marginLeft: theme.spacing.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary
  };

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        <p style={titleStyles}>
          This comprehensive presentation showcases the depth and breadth of modern frontend engineering.
        </p>
        <p style={descriptionStyles}>
          Designed and built with ❤️ by a passionate Software Engineer at Mastercard, 
          demonstrating excellence in UI/UX development.
        </p>
        <div style={mastercardLogoStyles}>
          <div style={{
            width: '32px',
            height: '32px',
            background: theme.colors.primary,
            borderRadius: '50%'
          }} />
          <div style={{
            width: '32px',
            height: '32px',
            background: theme.colors.secondary,
            borderRadius: '50%',
            marginLeft: '-16px',
            opacity: 0.9
          }} />
          <span style={logoTextStyles}>
            Mastercard
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;