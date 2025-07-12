import React, { useState } from 'react';
import { theme } from '../../../theme';

const SpacingPlayground = () => {
  const [padding, setPadding] = useState(24);
  const [margin, setMargin] = useState(16);
  const [gap, setGap] = useState(16);

  // --- Styles ---
  const sectionStyles = { padding: `${theme.spacing['3xl']} 0`, backgroundColor: theme.colors.background.secondary, position: 'relative' };
  const containerStyles = { maxWidth: '1200px', margin: '0 auto', padding: `0 ${theme.spacing.xl}` };
  const headerStyles = { textAlign: 'center', marginBottom: theme.spacing['3xl'] };
  const titleStyles = { fontSize: theme.typography.fontSize['4xl'], fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing.md };
  const subtitleStyles = { fontSize: theme.typography.fontSize.lg, color: theme.colors.text.secondary, maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 };

  const mainGrid = { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: theme.spacing.xl, alignItems: 'flex-start' };
  
  // --- Demo Styles ---
  const playgroundContainerStyles = {
    backgroundColor: 'rgba(232, 80, 2, 0.1)', // Padding visualization
    border: `2px dashed ${theme.colors.primary}`,
    borderRadius: theme.borderRadius.lg,
    padding: `${padding}px`, // Controlled by state
    transition: 'padding 0.2s ease',
  };

  const flexWrapperStyles = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: `${gap}px`, // Controlled by state
    backgroundColor: theme.colors.background.secondary,
    minHeight: '300px',
    borderRadius: theme.borderRadius.md,
  };

  const itemStyles = {
    backgroundColor: theme.colors.background.primary,
    border: `1px solid ${theme.colors.border.medium}`,
    borderRadius: theme.borderRadius.md,
    flex: '1 1 100px',
    minHeight: '100px',
    margin: `${margin}px`, // Controlled by state
    transition: 'margin 0.2s ease',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.fontWeight.bold,
  };

  // Pseudo-element to visualize margin
  const marginVisualizerStyles = {
    content: '""',
    position: 'absolute',
    top: `-${margin}px`,
    left: `-${margin}px`,
    right: `-${margin}px`,
    bottom: `-${margin}px`,
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    border: `1px dashed #0066CC`,
    borderRadius: theme.borderRadius.lg,
    zIndex: -1,
  };
  
  // --- Control Panel Styles ---
  const controlPanelStyles = { backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', borderRadius: theme.borderRadius.xl, padding: theme.spacing.lg, border: `1px solid ${theme.colors.border.light}` };
  const controlGroupStyles = { marginBottom: theme.spacing.xl };
  const controlLabelStyles = { display: 'flex', justifyContent: 'space-between', fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing.sm };

  return (
    <section id="spacing-playground" style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>The Box Model Playground</h2>
          <p style={subtitleStyles}>Visually understand the difference between CSS spacing properties by manipulating them directly.</p>
        </header>

        <div style={mainGrid}>
          <div style={playgroundContainerStyles}>
            <div style={flexWrapperStyles}>
              {[1, 2, 3].map(i => (
                <div key={i} style={itemStyles}>
                  <style>{`[data-item="${i}"]::before { background-color: blue; }`}</style>
                  <div style={marginVisualizerStyles} />
                  Item {i}
                </div>
              ))}
            </div>
          </div>

          <div style={controlPanelStyles}>
            <div style={controlGroupStyles}>
              <label style={controlLabelStyles}><span style={{color: theme.colors.primary}}>Padding</span><span>{padding}px</span></label>
              <p style={{fontSize: '12px', color: theme.colors.text.secondary, margin: '0 0 8px 0'}}>Space inside the container (orange area)</p>
              <input type="range" min="0" max="48" value={padding} onChange={e => setPadding(Number(e.target.value))} style={{width: '100%'}} />
            </div>
             <div style={controlGroupStyles}>
              <label style={controlLabelStyles}><span style={{color: '#0066CC'}}>Margin</span><span>{margin}px</span></label>
              <p style={{fontSize: '12px', color: theme.colors.text.secondary, margin: '0 0 8px 0'}}>Space around each item (blue area)</p>
              <input type="range" min="0" max="48" value={margin} onChange={e => setMargin(Number(e.target.value))} style={{width: '100%'}} />
            </div>
             <div>
              <label style={controlLabelStyles}><span>Gap</span><span>{gap}px</span></label>
              <p style={{fontSize: '12px', color: theme.colors.text.secondary, margin: '0 0 8px 0'}}>Space between items in a flex/grid container</p>
              <input type="range" min="0" max="48" value={gap} onChange={e => setGap(Number(e.target.value))} style={{width: '100%'}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpacingPlayground;
