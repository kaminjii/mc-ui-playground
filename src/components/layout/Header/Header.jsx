import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../../ui/Button/Button';
import { theme } from '../../../theme';

const Header = ({ sections, currentSection, onSectionClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderBottom: isScrolled ? `1px solid ${theme.colors.border.light}` : 'none',
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    transform: isScrolled ? 'translateY(0)' : 'translateY(0)'
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
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    textDecoration: 'none',
    transition: 'all 0.3s ease'
  };

  const logoMarkStyles = {
    width: '32px',
    height: '32px',
    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  };

  const navStyles = {
    display: 'none',
    alignItems: 'center',
    gap: theme.spacing.xs,
    '@media (min-width: 768px)': {
      display: 'flex'
    }
  };

  const navItemStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.xl,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    backgroundColor: isActive ? `${theme.colors.primary}10` : 'transparent',
    color: isActive ? theme.colors.primary : theme.colors.text.secondary,
    border: 'none',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden'
  });

  const mobileNavStyles = {
    display: mobileMenuOpen ? 'block' : 'none',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${theme.colors.border.light}`,
    padding: theme.spacing.lg,
    boxShadow: `0 10px 40px ${theme.colors.background.overlay}`,
    borderRadius: `0 0 ${theme.borderRadius['2xl']} ${theme.borderRadius['2xl']}`
  };

  return (
    <header style={headerStyles}>
      <div style={containerStyles}>
        {/* Logo */}
        <a 
          href="#" 
          style={logoStyles}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div style={logoMarkStyles}>
            <div style={{
              width: '12px',
              height: '12px',
              background: theme.colors.background.primary,
              borderRadius: '50%'
            }} />
          </div>
          <span>Frontend Engineering</span>
        </a>

        {/* Desktop Navigation */}
        <nav style={navStyles}>
          {Object.entries(sections).map(([key, { title, icon }]) => (
            <button
              key={key}
              onClick={() => onSectionClick(key)}
              style={navItemStyles(currentSection === key)}
              onMouseEnter={(e) => {
                if (currentSection !== key) {
                  e.target.style.backgroundColor = `${theme.colors.primary}05`;
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentSection !== key) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {React.cloneElement(icon, { size: 16 })}
              <span>{title}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            '@media (min-width: 768px)': { display: 'none' },
            padding: theme.spacing.sm,
            backgroundColor: mobileMenuOpen ? `${theme.colors.primary}10` : 'transparent'
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
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
              style={{
                ...navItemStyles(currentSection === key),
                justifyContent: 'flex-start',
                width: '100%',
                padding: theme.spacing.lg
              }}
            >
              {React.cloneElement(icon, { size: 18 })}
              <span>{title}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;