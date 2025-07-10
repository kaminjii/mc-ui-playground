import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../Card/Card';
import { theme } from '../../../theme';

const MetricCard = ({ title, value, change, icon: Icon, trend = "up", ...props }) => {
  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg
  };

  const iconContainerStyles = {
    width: '48px',
    height: '48px',
    borderRadius: theme.borderRadius.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: trend === 'up' ? theme.colors.status.success + '15' : theme.colors.status.error + '15'
  };

  const changeStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    backgroundColor: trend === 'up' ? theme.colors.status.success + '15' : theme.colors.status.error + '15',
    color: trend === 'up' ? theme.colors.status.success : theme.colors.status.error
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
    fontWeight: theme.typography.fontWeight.medium
  };

  const valueStyles = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    lineHeight: theme.typography.lineHeight.tight
  };

  return (
    <Card variant="elevated" interactive {...props}>
      <div style={headerStyles}>
        <div style={iconContainerStyles}>
          <Icon 
            size={24} 
            style={{ color: trend === 'up' ? theme.colors.status.success : theme.colors.status.error }} 
          />
        </div>
        {change && (
          <div style={changeStyles}>
            {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <h3 style={titleStyles}>{title}</h3>
      <p style={valueStyles}>{value}</p>
    </Card>
  );
};

export default MetricCard;
