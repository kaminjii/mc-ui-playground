import React, { useState, useEffect } from 'react';
import { ArrowDown, Code, Play } from 'lucide-react';
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
    padding: theme.spacing.lg,
    position: 'relative',
    overflow: 'hidden',
    background: `linear-gradient(135deg, ${theme.colors.background.primary} 0%, ${theme.colors.background.secondary} 100%)`
  };

  const contentStyles = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1200px',
    margin: '0 auto',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: 'all 1s ease-out'
  };

  const titleStyles = {
    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
    fontWeight: theme.typography.fontWeight.black,
    lineHeight: theme.typography.lineHeight.tight,
    marginBottom: theme.spacing.xl,
    background: `linear-gradient(135deg, ${theme.colors.text.primary}, ${theme.colors.text.secondary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const subtitleStyles = {
    fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing['3xl'],
    lineHeight: theme.typography.lineHeight.relaxed,
    maxWidth: '800px',
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

  // Floating animation elements
  const floatingElements = [
    { 
      size: '80px', 
      top: '20%', 
      left: '10%', 
      delay: '0s',
      color: theme.colors.accent.orange 
    },
    { 
      size: '60px', 
      top: '60%', 
      right: '15%', 
      delay: '2s',
      color: theme.colors.accent.yellow 
    },
    { 
      size: '40px', 
      top: '30%', 
      right: '25%', 
      delay: '4s',
      color: theme.colors.primary 
    }
  ];

  return (
    <section style={heroStyles}>
      {/* Floating background elements */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: element.size,
            height: element.size,
            background: `linear-gradient(135deg, ${element.color}20, ${element.color}10)`,
            borderRadius: '50%',
            top: element.top,
            left: element.left,
            right: element.right,
            animation: `float 6s ease-in-out infinite`,
            animationDelay: element.delay,
            zIndex: 1
          }}
        />
      ))}

      <div style={contentStyles}>
        {/* Logo animation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing['2xl']
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.md
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: theme.shadows.lg
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.tertiary})`,
                borderRadius: '50%'
              }} />
            </div>
          </div>
        </div>

        <h1 style={titleStyles}>
          Modern UI Engineering
        </h1>

        <p style={subtitleStyles}>
          An interactive exploration of advanced frontend development principles, 
          from React fundamentals to cutting-edge design systems that power world-class applications.
        </p>

        <div style={buttonGroupStyles}>
          <Button 
            size="lg"
            onClick={() => document.getElementById('react-evolution')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Play size={20} />
            <span>Start Exploring</span>
          </Button>
          
          <Button 
            variant="secondary"
            size="lg"
            onClick={() => document.getElementById('project-architecture')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Code size={20} />
            <span>View Architecture</span>
          </Button>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(-10px) rotate(-5deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;