// src/components/ui/Card/Card.jsx
import React from 'react';
import { theme } from '../../../theme';

const Card = ({ 
  children, 
  variant = 'default', 
  interactive = false, 
  className = '',
  style = {},
  ...props 
}) => {
  const baseStyles = {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing['xl'],
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
  };

  const variants = {
    default: {
      backgroundColor: theme.colors.background.primary,
      border: `1px solid ${theme.colors.border.light}`,
      boxShadow: theme.shadows.md
    },
    elevated: {
      backgroundColor: theme.colors.background.primary,
      border: `1px solid ${theme.colors.border.light}`,
      boxShadow: theme.shadows.lg
    },
    glass: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(15px)',
      border: `1px solid ${theme.colors.border.dark}`,
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
    }
  };

  const cardStyles = {
    ...baseStyles,
    ...variants[variant],
    ...style
  };

  const handleMouseEnter = (e) => {
    if (interactive) {
      e.currentTarget.style.transform = 'translateY(-5px)';
      if(variant === 'glass') {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      } else {
        e.currentTarget.style.boxShadow = theme.shadows.xl;
        e.currentTarget.style.borderColor = theme.colors.border.medium;
      }
    }
  };

  const handleMouseLeave = (e) => {
    if (interactive) {
      e.currentTarget.style.transform = 'translateY(0)';
      if(variant === 'glass') {
        e.currentTarget.style.borderColor = theme.colors.border.dark;
      } else {
        e.currentTarget.style.boxShadow = variants[variant].boxShadow;
        e.currentTarget.style.borderColor = theme.colors.border.light;
      }
    }
  };

  return (
    <div 
      style={cardStyles} 
      className={className} 
      onMouseEnter={interactive ? handleMouseEnter : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;