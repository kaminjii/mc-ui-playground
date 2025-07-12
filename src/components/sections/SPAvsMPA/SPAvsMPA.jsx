//TODO: Remove this component 
import React from 'react';
import { File, Files } from 'lucide-react';
import { theme } from '../../../theme';
import Card from '../../ui/Card/Card';

const SPAvsMPA = () => {
  const sectionStyles = {
    padding: `${theme.spacing['3xl']} 0`,
    backgroundColor: theme.colors.background.secondary,
    position: 'relative',
    overflow: 'hidden',
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

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing.xl,
    alignItems: 'stretch',
  };

  const cardHeaderStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  };

  const pros = ['Rich, fluid user experience', 'Fast transitions, no page reloads', 'Simplified development for complex apps'];
  const cons = ['Slower initial load time', 'SEO can be more complex', 'Requires JavaScript to be enabled'];

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>SPA vs. MPA: The Great Debate</h2>
          <p style={subtitleStyles}>Choosing the right architecture is a critical decision that impacts performance, user experience, and development workflow.</p>
        </header>

        <div style={gridStyles}>
          <Card interactive>
            <div style={cardHeaderStyles}>
              <File size={32} color={theme.colors.primary} />
              <h3 style={{fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold}}>Single-Page App (SPA)</h3>
            </div>
            <p style={{color: theme.colors.text.secondary, lineHeight: 1.6, marginBottom: theme.spacing.lg}}>A single HTML page that dynamically updates content as the user interacts with the app. Feels like a native desktop application.</p>
            <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: theme.spacing.md}}>
              {pros.map(pro => <li key={pro} style={{display: 'flex', alignItems: 'center', gap: theme.spacing.sm}}>✅ <span style={{color: theme.colors.text.primary}}>{pro}</span></li>)}
              {cons.map(con => <li key={con} style={{display: 'flex', alignItems: 'center', gap: theme.spacing.sm}}>❌ <span style={{color: theme.colors.text.secondary}}>{con}</span></li>)}
            </ul>
          </Card>

          <Card interactive>
            <div style={cardHeaderStyles}>
              <Files size={32} color={theme.colors.text.secondary} />
              <h3 style={{fontSize: theme.typography.fontSize['2xl'], fontWeight: theme.typography.fontWeight.bold}}>Multi-Page App (MPA)</h3>
            </div>
            <p style={{color: theme.colors.text.secondary, lineHeight: 1.6, marginBottom: theme.spacing.lg}}>The traditional web model where each new page is requested from the server. Simpler, robust, and great for content-heavy sites.</p>
            <ul style={{listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: theme.spacing.md}}>
              {['Excellent for SEO out of the box', 'Faster initial page load', 'Simpler to build for static content'].map(pro => <li key={pro} style={{display: 'flex', alignItems: 'center', gap: theme.spacing.sm}}>✅ <span style={{color: theme.colors.text.primary}}>{pro}</span></li>)}
              {['Slower navigation between pages', 'Tightly coupled frontend and backend', 'More complex to create app-like feel'].map(con => <li key={con} style={{display: 'flex', alignItems: 'center', gap: theme.spacing.sm}}>❌ <span style={{color: theme.colors.text.secondary}}>{con}</span></li>)}
            </ul>
          </Card>
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

export default SPAvsMPA;