import React from 'react';
import { theme } from '../../../theme';

const Input = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  state = 'default',
  icon,
  className = '',
  style = {},
  ...props 
}) => {
  const stateStyles = {
    default: {
      borderColor: theme.colors.border.medium
    },
    success: {
      borderColor: theme.colors.status.success
    },
    error: {
      borderColor: theme.colors.status.error
    },
    warning: {
      borderColor: theme.colors.status.warning
    }
  };

  const inputStyles = {
    width: '100%',
    padding: icon ? `${theme.spacing.md} ${theme.spacing['2xl']} ${theme.spacing.md} ${theme.spacing['3xl']}` : theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
    border: `2px solid`,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.background.primary,
    transition: 'all 0.2s ease',
    outline: 'none',
    ...stateStyles[state],
    ...style
  };

  const containerStyles = {
    position: 'relative',
    width: '100%'
  };

  const iconStyles = {
    position: 'absolute',
    left: theme.spacing.md,
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.colors.text.tertiary,
    pointerEvents: 'none'
  };

  return (
    <div style={containerStyles} className={className}>
      {icon && <div style={iconStyles}>{icon}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={inputStyles}
        {...props}
      />
    </div>
  );
};

export default Input;
