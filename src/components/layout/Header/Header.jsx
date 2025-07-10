import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../../ui/Button/Button';
import { theme } from '../../../theme';

const Header = ({ sections, currentSection, onSectionClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerStyles = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${theme.colors.border.light}`,
    transition: 'all 0.3s ease'
  };

  const containerStyles = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.lg}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px'
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary
  };

  const navStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none'
  };

  const navItemStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? theme.colors.primary : 'transparent',
    color: isActive ? theme.colors.text.inverse : theme.colors.text.secondary,
    transform: isActive ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isActive ? theme.shadows.md : 'none',
    border: 'none'
  });

  const mobileNavStyles = {
    display: mobileMenuOpen ? 'block' : 'none',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background.primary,
    borderBottom: `1px solid ${theme.colors.border.light}`,
    padding: theme.spacing.lg,
    boxShadow: theme.shadows.lg,
    '@media (min-width: 768px)': {
      display: 'none'
    }
  };

  const desktopNavStyles = {
    ...navStyles,
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'flex'
    }
  };

  return (
    <header style={headerStyles}>
      <div style={containerStyles}>
        {/* Logo */}
        <div style={logoStyles}>
          <div style={{
            width: '32px',
            height: '32px',
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            borderRadius: theme.borderRadius.md
          }} />
          <span>Frontend Engineering</span>
        </div>

        {/* Desktop Navigation */}
        <nav style={desktopNavStyles}>
          {Object.entries(sections).map(([key, { title, icon }]) => (
            <button
              key={key}
              onClick={() => onSectionClick(key)}
              style={navItemStyles(currentSection === key)}
            >
              {React.cloneElement(icon, { size: 16 })}
              <span>{title}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div style={{ display: 'block', '@media (min-width: 768px)': { display: 'none' } }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div style={mobileNavStyles}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.sm
        }}>
          {Object.entries(sections).map(([key, { title, icon }]) => (
            <button
              key={key}
              onClick={() => {
                onSectionClick(key);
                setMobileMenuOpen(false);
              }}
              style={navItemStyles(currentSection === key)}
            >
              {React.cloneElement(icon, { size: 16 })}
              <span>{title}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;