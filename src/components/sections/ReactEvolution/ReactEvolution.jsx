// src/components/sections/ReactEvolution/ReactEvolution.jsx
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { theme } from '../../../theme';

const ReactEvolution = () => {
  const [activeEra, setActiveEra] = useState(1);
  
  const eras = [
    {
      id: 0,
      year: '2013',
      title: 'The Foundation',
      description: 'React introduced the revolutionary Virtual DOM, changing how we build UIs with class components and lifecycle methods.',
      features: ['Class Components', 'Virtual DOM', 'JSX Syntax', 'Lifecycle Methods']
    },
    {
      id: 1,
      year: '2018', 
      title: 'The Functional Shift',
      description: 'Hooks revolutionized React, enabling powerful functional components and simplifying state management and side effects.',
      features: ['useState', 'useEffect', 'Custom Hooks', 'Context API']
    },
    {
      id: 2,
      year: '2022',
      title: 'The Concurrent Age',
      description: 'Concurrent features and Server Components arrived, focusing on improved performance and user experience for complex apps.',
      features: ['Concurrent Mode', 'Suspense', 'Server Components', 'useTransition']
    }
  ];

  const activeEraData = eras.find(e => e.id === activeEra);

  const sectionStyles = {
    padding: `${theme.spacing['3xl']} 0`,
    position: 'relative',
    backgroundColor: theme.colors.background.secondary,
  };
  
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.xl}`,
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
  
  const highlightStyles = {
    color: theme.colors.primary,
  };

  const mainContentStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing['3xl'],
    alignItems: 'flex-start',
  };

  const timelineStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
  };

  const eraItemStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? theme.colors.background.primary : 'transparent',
    borderColor: isActive ? theme.colors.border.medium : 'transparent',
    boxShadow: isActive ? theme.shadows.lg : 'none',
    transform: isActive ? 'scale(1.03)' : 'scale(1)',
  });
  
  const eraYearStyles = (isActive) => ({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.lg,
    flexShrink: 0,
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? theme.colors.primary : theme.colors.background.primary,
    color: isActive ? theme.colors.text.inverse : theme.colors.text.secondary,
    border: `1px solid ${isActive ? theme.colors.primary : theme.colors.border.medium}`,
  });

  const detailCardStyles = {
    position: 'sticky',
    top: '120px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(12px)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    border: `1px solid ${theme.colors.border.light}`,
    boxShadow: theme.shadows.xl,
  };

  const featureGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg
  };

  const featureBubbleStyles = {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    border: `1px solid ${theme.colors.border.light}`,
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <section id="react-evolution" style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>
            The Evolution of <span style={highlightStyles}>React</span>
          </h2>
          <p style={{...subtitleStyles, maxWidth: '700px'}}>
            From a simple library to a full-fledged framework, React's journey is one of continuous innovation.
          </p>
        </header>

        <div style={mainContentStyles}>
          <div style={timelineStyles}>
            {eras.map((era) => (
              <div
                key={era.id}
                style={eraItemStyles(activeEra === era.id)}
                onClick={() => setActiveEra(era.id)}
              >
                <div style={eraYearStyles(activeEra === era.id)}>
                  '{era.year.slice(-2)}
                </div>
                <div>
                  <h3 style={{fontWeight: theme.typography.fontWeight.bold, fontSize: theme.typography.fontSize.xl}}>{era.title}</h3>
                  <p style={{color: theme.colors.text.secondary}}>{era.year}</p>
                </div>
                {activeEra === era.id && <ArrowRight size={24} color={theme.colors.primary} style={{marginLeft: 'auto'}}/>}
              </div>
            ))}
          </div>

          {activeEraData && (
            <div style={detailCardStyles}>
              <h3 style={{fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing.md}}>
                {activeEraData.title}
              </h3>
              <p style={{color: theme.colors.text.secondary, lineHeight: 1.6, marginBottom: theme.spacing.xl}}>
                {activeEraData.description}
              </p>
              <h4 style={{fontWeight: theme.typography.fontWeight.bold, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary}}>Key Features</h4>
              <div style={featureGridStyles}>
                {activeEraData.features.map((feature) => (
                  <div key={feature} style={featureBubbleStyles}>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
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

export default ReactEvolution;