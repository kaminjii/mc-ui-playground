// src/components/ui/Button/Button.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { theme } from '../../../theme';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  onClick,
  className = '',
  style = {},
  ...props 
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    borderRadius: theme.borderRadius.full,
    transition: 'all 0.25s ease-out',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    border: '1px solid transparent',
    outline: 'none',
  };

  const variants = {
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.text.inverse,
      borderColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,
      borderColor: theme.colors.border.medium,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors.text.secondary,
      borderColor: 'transparent',
    }
  };

  const sizes = {
    sm: { padding: `0 ${theme.spacing.lg}`, fontSize: theme.typography.fontSize.sm, height: '36px' },
    md: { padding: `0 ${theme.spacing.xl}`, fontSize: theme.typography.fontSize.base, height: '44px' },
    lg: { padding: `0 ${theme.spacing['2xl']}`, fontSize: theme.typography.fontSize.lg, height: '52px' }
  };

  const buttonStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    ...style,
    opacity: disabled || loading ? 0.7 : 1
  };

  // Define hover styles separately to keep the base object clean
  const getHoverStyles = () => {
    switch(variant) {
      case 'primary':
        return { transform: 'translateY(-2px)', boxShadow: theme.shadows.lg, filter: 'brightness(1.05)' };
      case 'secondary':
        return { borderColor: theme.colors.primary, color: theme.colors.primary, boxShadow: theme.shadows.md };
      case 'ghost':
        return { backgroundColor: theme.colors.background.secondary, color: theme.colors.text.primary };
      default:
        return {};
    }
  };
  
  return (
    <button 
      style={buttonStyles}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, getHoverStyles());
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          // Reset styles to original state
          Object.assign(e.currentTarget.style, {
            transform: 'translateY(0)',
            boxShadow: 'none',
            filter: 'none',
            backgroundColor: variants[variant].backgroundColor,
            color: variants[variant].color,
            borderColor: variants[variant].borderColor || 'transparent',
          });
        }
      }}
      {...props}
    >
      {loading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
      {children}
    </button>
  );
};

export default Button;