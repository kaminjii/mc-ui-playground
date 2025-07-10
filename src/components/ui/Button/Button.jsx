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
    fontWeight: theme.typography.fontWeight.medium, // Softer weight
    borderRadius: theme.borderRadius.full, // Very rounded/pill shaped
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden'
  };

  const variants = {
    primary: {
      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
      color: theme.colors.text.inverse,
      boxShadow: `0 8px 32px ${theme.colors.primary}15`,
      border: 'none'
    },
    secondary: {
      backgroundColor: theme.colors.background.glass,
      color: theme.colors.text.primary,
      border: `1px solid rgba(255,255,255,0.3)`,
      backdropFilter: 'blur(30px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.04)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors.text.primary,
      border: `1px solid ${theme.colors.border.light}`,
      backdropFilter: 'blur(20px)'
    },
    danger: {
      background: `linear-gradient(135deg, ${theme.colors.primary}, #ff4757)`,
      color: theme.colors.text.inverse,
      boxShadow: `0 8px 32px ${theme.colors.primary}15`
    }
  };

  const sizes = {
    sm: {
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.sm,
      height: '36px'
    },
    md: {
      padding: `${theme.spacing.md} ${theme.spacing.xl}`,
      fontSize: theme.typography.fontSize.base,
      height: '44px'
    },
    lg: {
      padding: `${theme.spacing.lg} ${theme.spacing['2xl']}`,
      fontSize: theme.typography.fontSize.lg,
      height: '52px'
    }
  };

  const buttonStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    ...style,
    opacity: disabled || loading ? 0.6 : 1
  };

  const handleMouseEnter = (e) => {
    if (!disabled && !loading) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      if (variant === 'primary') {
        e.currentTarget.style.boxShadow = `0 12px 40px ${theme.colors.primary}25`;
      } else if (variant === 'secondary') {
        e.currentTarget.style.backgroundColor = theme.colors.background.primary;
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
      } else if (variant === 'ghost') {
        e.currentTarget.style.backgroundColor = theme.colors.background.secondary;
        e.currentTarget.style.borderColor = theme.colors.border.medium;
      }
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled && !loading) {
      e.currentTarget.style.transform = 'translateY(0)';
      if (variant === 'primary') {
        e.currentTarget.style.boxShadow = `0 6px 24px ${theme.colors.primary}20`;
      } else if (variant === 'secondary') {
        e.currentTarget.style.backgroundColor = theme.colors.background.card;
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
      } else if (variant === 'ghost') {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderColor = theme.colors.border.light;
      }
    }
  };

  return (
    <button 
      style={buttonStyles}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {loading && (
        <Loader2 
          size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} 
          style={{ animation: 'spin 1s linear infinite' }} 
        />
      )}
      {children}
    </button>
  );
};

export default Button;