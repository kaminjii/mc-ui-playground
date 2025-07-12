// src/components/sections/ProjectArchitecture/ProjectArchitecture.jsx
import React from 'react';
import { Folder, Files, Package, Settings } from 'lucide-react';
import { theme } from '../../../theme';

const ProjectArchitecture = () => {
  const sectionStyles = {
    padding: `${theme.spacing['3xl']} 0`,
    backgroundColor: theme.colors.background.primary,
    position: 'relative',
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.xl}`,
  };

  const headerStyles = {
    textAlign: 'center',
    marginBottom: theme.spacing['3xl']
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.md,
    letterSpacing: '-0.02em',
  };
  
  const diagramContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: theme.spacing.md,
  };

  const nodeStyles = {
    backgroundColor: theme.colors.background.primary,
    border: `1px solid ${theme.colors.border.medium}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    minWidth: '250px',
    boxShadow: theme.shadows.md,
  };
  
  const connectorStyles = {
    width: '1px',
    height: theme.spacing.xl,
    backgroundColor: theme.colors.border.medium,
  };

  const horizontalConnectorStyles = {
    height: '1px',
    width: '100%',
    backgroundColor: theme.colors.border.medium,
    margin: `${theme.spacing.xl} 0`,
  };

  const branchContainerStyles = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    gap: theme.spacing.lg,
  };

  const Node = ({ icon, title, description }) => (
    <div style={nodeStyles}>
      {icon}
      <div>
        <h4 style={{fontWeight: theme.typography.fontWeight.bold}}>{title}</h4>
        <p style={{fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary}}>{description}</p>
      </div>
    </div>
  );

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>Scalable Project Architecture</h2>
          <p style={subtitleStyles}>A well-organized file structure is the backbone of a maintainable and scalable application.</p>
        </header>

        <div style={diagramContainerStyles}>
          <Node icon={<Folder size={24} color={theme.colors.primary}/>} title="src/" description="The root of your application." />
          <div style={connectorStyles} />
          
          <div style={branchContainerStyles}>
             <div style={{...connectorStyles, transform: 'rotate(45deg) translateY(-20px) translateX(20px)'}} />
             <div style={{...connectorStyles, transform: 'translateY(-16px)'}} />
             <div style={{...connectorStyles, transform: 'rotate(-45deg) translateY(-20px) translateX(-20px)'}} />
          </div>

          <div style={branchContainerStyles}>
            <Node icon={<Files size={24} color={theme.colors.text.secondary}/>} title="components/" description="Reusable UI elements." />
            <Node icon={<Package size={24} color={theme.colors.text.secondary}/>} title="pages/" description="Application views/routes." />
            <Node icon={<Settings size={24} color={theme.colors.text.secondary}/>} title="utils/" description="Shared helper functions." />
          </div>
        </div>
      </div>
    </section>
  );
};

const subtitleStyles = {
  fontSize: theme.typography.fontSize.lg,
  color: theme.colors.text.secondary,
  maxWidth: '650px',
  margin: '0 auto',
  lineHeight: 1.6
};

export default ProjectArchitecture;
