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
    fontFamily: theme.typography.fontFamily.secondary,
    fontWeight: theme.typography.fontWeight.semibold,
    borderRadius: theme.borderRadius.xl,
    transition: 'all 0.2s ease',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    textDecoration: 'none'
  };

  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
      color: theme.colors.text.inverse,
      boxShadow: theme.shadows.md
    },
    secondary: {
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.primary,
      border: `2px solid ${theme.colors.primary}`
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors.text.primary
    },
    danger: {
      backgroundColor: theme.colors.status.error,
      color: theme.colors.text.inverse
    }
  };

  const sizes = {
    sm: {
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.sm
    },
    md: {
      padding: `${theme.spacing.md} ${theme.spacing.xl}`,
      fontSize: theme.typography.fontSize.base
    },
    lg: {
      padding: `${theme.spacing.lg} ${theme.spacing['2xl']}`,
      fontSize: theme.typography.fontSize.lg
    }
  };

  const buttonStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    ...style,
    opacity: disabled || loading ? 0.6 : 1
  };

  return (
    <button 
      style={buttonStyles}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading && <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />}
      {children}
    </button>
  );
};

export default Button;
