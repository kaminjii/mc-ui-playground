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
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius['2xl'],
    padding: theme.spacing['2xl'],
    border: `1px solid ${theme.colors.border.light}`,
    transition: 'all 0.3s ease'
  };

  const variants = {
    default: {
      boxShadow: theme.shadows.sm
    },
    elevated: {
      boxShadow: theme.shadows.md
    },
    floating: {
      boxShadow: theme.shadows.lg
    }
  };

  const cardStyles = {
    ...baseStyles,
    ...variants[variant],
    ...style
  };

  const handleMouseEnter = (e) => {
    if (interactive) {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = theme.shadows.xl;
    }
  };

  const handleMouseLeave = (e) => {
    if (interactive) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = variants[variant].boxShadow || theme.shadows.sm;
    }
  };

  return (
    <div 
      style={cardStyles} 
      className={className} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;