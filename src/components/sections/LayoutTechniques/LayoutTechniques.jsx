// src/components/sections/LayoutTechniques/LayoutTechniques.jsx
import React, { useState } from 'react';
import { AlignLeft, AlignCenter, ChevronsLeftRight, Expand, Shrink, Grid } from 'lucide-react';
import { theme } from '../../../theme';

const LayoutTechniques = () => {
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [gap, setGap] = useState(16);

  const sectionStyles = { padding: `${theme.spacing['3xl']} 0`, position: 'relative' };
  const containerStyles = { maxWidth: '1200px', margin: '0 auto', padding: `0 ${theme.spacing.xl}` };
  const headerStyles = { textAlign: 'center', marginBottom: theme.spacing['3xl'] };
  const titleStyles = { fontSize: theme.typography.fontSize['4xl'], fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing.md };
  const subtitleStyles = { fontSize: theme.typography.fontSize.lg, color: theme.colors.text.secondary, maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 };
  const contentGrid = { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: theme.spacing.xl, alignItems: 'flex-start' };
  const playgroundStyles = { height: '400px', backgroundColor: theme.colors.background.secondary, borderRadius: theme.borderRadius.xl, border: `1px solid ${theme.colors.border.light}`, padding: theme.spacing.lg, display: 'flex', transition: 'all 0.3s ease', justifyContent, alignItems, gap: `${gap}px` };
  const controlPanelStyles = { backgroundColor: 'rgba(247, 247, 247, 0.5)', backdropFilter: 'blur(10px)', borderRadius: theme.borderRadius.xl, padding: theme.spacing.lg, border: `1px solid ${theme.colors.border.light}` };
  const controlTitleStyles = { fontWeight: theme.typography.fontWeight.bold, marginBottom: theme.spacing.sm, marginTop: theme.spacing.lg };
  const controlGroupStyles = { display: 'flex', gap: theme.spacing.sm, alignItems: 'center' };
  const flexItemStyles = { width: '80px', backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.md, transition: 'all 0.3s ease' };

  const ControlButton = ({ onClick, children, active }) => {
    const controlButtonStyles = { border: '1px solid #ddd', borderRadius: theme.borderRadius.md, padding: theme.spacing.sm, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', backgroundColor: active ? theme.colors.primary : 'white', color: active ? 'white' : 'black' };
    return <button onClick={onClick} style={controlButtonStyles}>{children}</button>;
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>Interactive Flexbox Playground</h2>
          <p style={subtitleStyles}>Directly manipulate Flexbox properties to understand how they affect layout and alignment in real-time.</p>
        </header>
        <div style={contentGrid}>
          <div style={playgroundStyles}>
            <div style={{...flexItemStyles, height: '100px'}} />
            <div style={{...flexItemStyles, height: '150px'}} />
            <div style={{...flexItemStyles, height: '70px'}} />
          </div>
          <div style={controlPanelStyles}>
            <h3 style={controlTitleStyles}>Justify Content</h3>
            <div style={controlGroupStyles}>
              <ControlButton onClick={() => setJustifyContent('flex-start')} active={justifyContent === 'flex-start'}><AlignLeft size={16}/></ControlButton>
              <ControlButton onClick={() => setJustifyContent('center')} active={justifyContent === 'center'}><AlignCenter size={16}/></ControlButton>
              <ControlButton onClick={() => setJustifyContent('flex-end')} active={justifyContent === 'flex-end'}><Grid size={16}/></ControlButton>
              <ControlButton onClick={() => setJustifyContent('space-between')} active={justifyContent === 'space-between'}><ChevronsLeftRight size={16}/></ControlButton>
            </div>
            <h3 style={controlTitleStyles}>Align Items</h3>
            <div style={controlGroupStyles}>
              <ControlButton onClick={() => setAlignItems('flex-start')} active={alignItems === 'flex-start'}><AlignLeft size={16} style={{transform: 'rotate(90deg)'}} /></ControlButton>
              <ControlButton onClick={() => setAlignItems('center')} active={alignItems === 'center'}><AlignCenter size={16} style={{transform: 'rotate(90deg)'}} /></ControlButton>
              <ControlButton onClick={() => setAlignItems('flex-end')} active={alignItems === 'flex-end'}><Grid size={16} style={{transform: 'rotate(90deg)'}} /></ControlButton>
            </div>
            <h3 style={controlTitleStyles}>Gap</h3>
            <div style={controlGroupStyles}>
              <Shrink size={16}/>
              <input type="range" min="0" max="48" value={gap} onChange={(e) => setGap(Number(e.target.value))} style={{flex: 1}} />
              <Expand size={16}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayoutTechniques;