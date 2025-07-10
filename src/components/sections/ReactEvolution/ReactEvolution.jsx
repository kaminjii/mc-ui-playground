import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

// It's recommended to define theme colors in a separate file, but they are here for simplicity.
const theme = {
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#FF5F00', // A vibrant accent inspired by Mastercard
    textPrimary: '#FFFFFF',
    textSecondary: '#A9A9A9',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  spacing: {
    xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px', '3xl': '64px',
  },
  borderRadius: {
    md: '12px',
    lg: '20px',
    full: '9999px',
  },
  typography: {
    fontFamily: '"Inter", sans-serif', // A clean, modern font
    fontWeight: { regular: 400, medium: 500, bold: 700 },
    fontSize: {
      xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.5rem', '2xl': '2rem', '3xl': '3.5rem'
    }
  }
};

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

  // --- STYLES ---

  const sectionStyles = {
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.colors.background,
    color: theme.colors.textPrimary,
    padding: `${theme.spacing['3xl']} ${theme.spacing.lg}`,
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
  };
  
  const decorativeCircleStyle = (size, top, left, opacity) => ({
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      border: `1px solid rgba(255, 95, 0, ${opacity})`,
      top: top,
      left: left,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none'
  });

  const headerStyles = {
    textAlign: 'center',
    marginBottom: theme.spacing['3xl']
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.md,
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
  };

  const subtitleStyles = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textSecondary,
    maxWidth: '650px',
    margin: '0 auto',
    lineHeight: 1.6
  };
  
  const mainContentStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing['2xl'],
    alignItems: 'flex-start',
    // Responsive adjustment
    '@media (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gap: theme.spacing.xl
    }
  };

  const timelineStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  };

  const eraItemStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    backgroundColor: isActive ? theme.colors.surface : 'transparent',
    borderColor: isActive ? theme.colors.border : 'transparent',
  });
  
  const eraYearStyles = (isActive) => ({
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.base,
    flexShrink: 0,
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
    color: isActive ? theme.colors.textPrimary : theme.colors.textSecondary,
    border: `1px solid ${isActive ? theme.colors.primary : theme.colors.border}`,
  });

  const eraInfoStyles = {
    lineHeight: 1.3,
  };

  const eraTitleStyles = {
    fontWeight: theme.typography.fontWeight.medium,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  };
  
  const eraYearTextStyles = {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
  };

  const detailCardStyles = {
    position: 'sticky',
    top: '100px',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    border: `1px solid ${theme.colors.border}`,
    height: 'fit-content'
  };

  const featureGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg
  };

  const featureBubbleStyles = {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    border: `1px solid ${theme.colors.border}`,
    transition: 'all 0.2s ease-in-out',
  };
  
  return (
    <div style={sectionStyles}>
      <div style={decorativeCircleStyle('500px', '20%', '30%', 0.1)} />
      <div style={decorativeCircleStyle('400px', '70%', '80%', 0.05)} />

      <header style={headerStyles}>
        <h2 style={titleStyles}>
          Designing the Future of React
        </h2>
        <p style={subtitleStyles}>
          From the Virtual DOM to Concurrent Features, see how React has evolved to empower developers and create seamless user experiences.
        </p>
      </header>

      <main style={mainContentStyles}>
        {/* --- TIMELINE SECTION --- */}
        <div style={timelineStyles}>
          {eras.map((era) => (
            <div
              key={era.id}
              style={eraItemStyles(activeEra === era.id)}
              onClick={() => setActiveEra(era.id)}
              onMouseEnter={(e) => {
                if (activeEra !== era.id) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                }
              }}
              onMouseLeave={(e) => {
                 if (activeEra !== era.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={eraYearStyles(activeEra === era.id)}>
                '{era.year.slice(-2)}
              </div>
              <div style={eraInfoStyles}>
                <h3 style={eraTitleStyles}>{era.title}</h3>
                <p style={eraYearTextStyles}>{era.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- ACTIVE ERA DETAILS CARD --- */}
        {activeEraData && (
          <div style={detailCardStyles}>
            <h3 style={{...eraTitleStyles, fontSize: theme.typography.fontSize.xl, marginBottom: theme.spacing.sm }}>
              {activeEraData.title}
            </h3>
            
            <p style={{...subtitleStyles, maxWidth: '100%', margin: 0, marginBottom: theme.spacing.lg }}>
              {activeEraData.description}
            </p>
            
            <div style={{ borderTop: `1px solid ${theme.colors.border}`, paddingTop: theme.spacing.lg }}>
                <h4 style={{
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.sm,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    Key Features
                </h4>
                <div style={featureGridStyles}>
                  {activeEraData.features.map((feature) => (
                    <div 
                      key={feature} 
                      style={featureBubbleStyles}
                      onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = theme.colors.primary;
                          e.currentTarget.style.color = theme.colors.textPrimary;
                      }}
                      onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = theme.colors.border;
                          e.currentTarget.style.color = theme.colors.textSecondary;
                      }}
                    >
                      {feature}
                    </div>
                  ))}
                </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReactEvolution;