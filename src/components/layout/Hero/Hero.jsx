import React, { useState, useEffect } from 'react';
import { ArrowDown, Code, Play, ChevronDown } from 'lucide-react';
import Button from '../../ui/Button/Button';
import { theme } from '../../../theme';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroStyles = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: `${theme.spacing['2xl']} ${theme.spacing.lg}`,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: theme.colors.background.primary, // Pure white
    paddingTop: '120px' // Account for nav bar
  };

  const contentStyles = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1000px',
    margin: '0 auto',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)'
  };

  const titleStyles = {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    fontWeight: theme.typography.fontWeight.bold, // Softer weight
    lineHeight: 1.2,
    marginBottom: theme.spacing.xl,
    color: theme.colors.text.primary,
    letterSpacing: '-0.01em' // Less tight
  };

  const highlightStyles = {
    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block'
  };

  const subtitleStyles = {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing['3xl'],
    lineHeight: 1.6,
    maxWidth: '700px',
    margin: `0 auto ${theme.spacing['3xl']}`
  };

  const buttonGroupStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    alignItems: 'center',
    '@media (min-width: 640px)': {
      flexDirection: 'row',
      justifyContent: 'center'
    }
  };

  const scrollIndicatorStyles = {
    position: 'absolute',
    bottom: theme.spacing['2xl'],
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.sm,
    color: theme.colors.text.muted,
    fontSize: theme.typography.fontSize.sm,
    animation: 'bounce 2s infinite'
  };

  // Large minimal circles - outline style like Mastercard Design Center
  const circleElements = [
    // Large outline circle (main focal point)
    {
      size: '500px',
      top: '15%',
      right: '10%',
      borderWidth: '2px',
      opacity: 0.08,
      zIndex: 1
    },
    // Medium outline circle
    {
      size: '300px',
      bottom: '20%',
      left: '15%',
      borderWidth: '1px',
      opacity: 0.06,
      zIndex: 1
    },
    // Small accent circle
    {
      size: '150px',
      top: '40%',
      left: '20%',
      borderWidth: '1px',
      opacity: 0.04,
      zIndex: 1
    }
  ];

  // Remove the small floating circles - keep it minimal

  return (
    <>
      <style jsx>{`
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0px); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      
      <section style={heroStyles}>
        {/* Large minimal outline circles */}
        {circleElements.map((circle, index) => (
          <div
            key={`circle-${index}`}
            style={{
              position: 'absolute',
              width: circle.size,
              height: circle.size,
              borderRadius: '50%',
              border: `${circle.borderWidth} solid ${theme.colors.text.tertiary}`,
              top: circle.top,
              bottom: circle.bottom,
              left: circle.left,
              right: circle.right,
              opacity: circle.opacity,
              zIndex: circle.zIndex,
              animation: 'fadeIn 3s ease-out',
              animationDelay: `${index * 0.5}s`
            }}
          />
        ))}

        <div style={contentStyles}>
          {/* Mastercard-style brand mark */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: theme.spacing['2xl'],
            gap: '-8px'
          }}>
            {/* Red circle */}
            <div style={{
              width: '50px',
              height: '50px',
              background: '#EB001B',
              borderRadius: '50%',
              zIndex: 2
            }} />
            {/* Orange circle overlapping */}
            <div style={{
              width: '50px',
              height: '50px',
              background: theme.colors.primary,
              borderRadius: '50%',
              marginLeft: '-20px',
              zIndex: 1
            }} />
          </div>

          <h1 style={titleStyles}>
            Modern{' '}
            <span style={highlightStyles}>
              UI Engineering
            </span>
          </h1>

          <p style={subtitleStyles}>
            An interactive exploration of advanced frontend development principles, 
            from React fundamentals to cutting-edge design systems that power world-class applications.
          </p>

          <div style={buttonGroupStyles}>
            <Button 
              size="lg"
              onClick={() => document.getElementById('react-evolution')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                border: 'none',
                borderRadius: theme.borderRadius.full, // Very rounded
                boxShadow: `0 12px 40px ${theme.colors.primary}15`,
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                padding: `${theme.spacing['2xl']} ${theme.spacing['3xl']}`,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.medium // Softer weight
              }}
            >
              <Play size={20} />
              <span>Start Exploring</span>
            </Button>
            
            <Button 
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById('project-architecture')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                backgroundColor: theme.colors.background.glass,
                border: `1px solid rgba(255,255,255,0.3)`,
                borderRadius: theme.borderRadius.full, // Very rounded
                backdropFilter: 'blur(30px)',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                color: theme.colors.text.primary,
                padding: `${theme.spacing['2xl']} ${theme.spacing['3xl']}`,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.medium, // Softer weight
                boxShadow: '0 12px 40px rgba(0,0,0,0.06)'
              }}
            >
              <Code size={20} />
              <span>View Architecture</span>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={scrollIndicatorStyles}>
          <span>Scroll to explore</span>
          <ChevronDown size={20} />
        </div>
      </section>
    </>
  );
};

export default Hero;