// src/components/sections/DesignSystems/DesignSystems.jsx
import React from 'react';
import { Palette, Layers, Gem } from 'lucide-react';
import { theme } from '../../../theme';
import Card from '../../ui/Card/Card';

const DesignSystems = () => {
  const sectionStyles = {
    padding: `${theme.spacing['3xl']} 0`,
    backgroundColor: theme.colors.background.dark,
    color: theme.colors.text.inverse,
    position: 'relative',
    overflow: 'hidden',
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.xl}`,
    position: 'relative',
    zIndex: 2,
  };

  const headerStyles = {
    textAlign: 'center',
    marginBottom: theme.spacing['3xl']
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.md,
    letterSpacing: '-0.02em',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing.xl,
  };

  const principles = [
    {
      icon: <Palette size={32} color={theme.colors.primary} />,
      title: 'Unified Visual Language',
      description: 'A shared vocabulary for designers and developers, ensuring brand consistency across all platforms and products.'
    },
    {
      icon: <Layers size={32} color={theme.colors.primary} />,
      title: 'Reusable Components',
      description: 'A library of pre-built, tested, and accessible UI elements that accelerate development and reduce redundancy.'
    },
    {
      icon: <Gem size={32} color={theme.colors.primary} />,
      title: 'Scalable & Maintainable',
      description: 'Clear guidelines and patterns that allow teams to build complex applications efficiently and maintain them with ease.'
    }
  ];

  return (
    <section style={sectionStyles}>
      {/* Decorative background elements */}
      <div style={{ position: 'absolute', width: '50vw', height: '50vw', borderRadius: '50%', background: `radial-gradient(circle, ${theme.colors.primary}1A, transparent 60%)`, top: '10%', left: '-20%', zIndex: 1 }} />
      <div style={{ position: 'absolute', width: '40vw', height: '40vw', borderRadius: '50%', border: `1px solid ${theme.colors.border.dark}`, top: '40%', right: '-15%', zIndex: 1 }} />

      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>The Power of Design Systems</h2>
          <p style={{...subtitleStyles, color: theme.colors.text.tertiary}}>
            More than just a style guide, a design system is the single source of truth that groups all the elements that will allow the teams to design, realize, and develop a product.
          </p>
        </header>

        <div style={gridStyles}>
          {principles.map(item => (
            <Card key={item.title} variant="glass" interactive>
              <div style={{ marginBottom: theme.spacing.lg }}>{item.icon}</div>
              <h3 style={{ fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing.md, color: theme.colors.text.inverse }}>{item.title}</h3>
              <p style={{ color: theme.colors.text.tertiary, lineHeight: 1.6 }}>{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Re-using subtitle style definition for consistency
const subtitleStyles = {
  fontSize: theme.typography.fontSize.lg,
  color: theme.colors.text.secondary,
  maxWidth: '650px',
  margin: '0 auto',
  lineHeight: 1.6
};

export default DesignSystems;