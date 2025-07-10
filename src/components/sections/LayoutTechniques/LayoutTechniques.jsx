import React, { useState, useMemo } from 'react';
import { Grid, RotateCcw, Shuffle } from 'lucide-react';
import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';
import { theme } from '../../../theme';

const LayoutTechniques = () => {
  const [itemCount, setItemCount] = useState(8);
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('flex-start');
  const [useRandomSizes, setUseRandomSizes] = useState(true);
  const [gap, setGap] = useState(16);

  const items = useMemo(
    () =>
      Array.from({ length: itemCount }, (_, i) => ({
        id: i,
        width: useRandomSizes ? Math.floor(Math.random() * 80) + 60 : 80,
        height: useRandomSizes ? Math.floor(Math.random() * 100) + 50 : 80,
      })),
    [itemCount, useRandomSizes]
  );

  const sectionStyles = {
    padding: `${theme.spacing['4xl']} 0`,
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyles = {
    marginBottom: theme.spacing['3xl']
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text.primary
  };

  const descriptionStyles = {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing['2xl'],
    lineHeight: theme.typography.lineHeight.relaxed
  };

  const controlsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg
  };

  const controlStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm
  };

  const labelStyles = {
    fontWeight: theme.typography.fontWeight.medium,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary
  };

  const inputStyles = {
    width: '100%',
    padding: theme.spacing.sm,
    border: `1px solid ${theme.colors.border.medium}`,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.primary,
    fontSize: theme.typography.fontSize.sm
  };

  const flexboxContainerStyles = {
    minHeight: '250px',
    overflowX: 'auto',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.lg,
    border: `2px dashed ${theme.colors.border.medium}`
  };

  const flexboxStyles = {
    display: 'flex',
    height: '100%',
    width: 'max-content',
    justifyContent,
    alignItems,
    gap: `${gap}px`,
    flexWrap: 'nowrap',
    minWidth: '100%'
  };

  const gridContainerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: theme.spacing.lg,
    minHeight: '300px',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.lg,
    border: `2px dashed ${theme.colors.border.medium}`
  };

  const gridItemStyles = (colSpan) => ({
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    border: `2px solid ${theme.colors.border.light}`,
    gridColumn: `span ${colSpan}`
  });

  return (
    <div style={sectionStyles}>
      {/* Flexbox Section */}
      <div style={headerStyles}>
        <h3 style={titleStyles}>Flexbox Layout</h3>
        <p style={descriptionStyles}>
          A one-dimensional layout model for aligning items. Perfect for component-level layouts like aligning buttons in a header.
        </p>

        <Card variant="elevated">
          <div style={controlsGridStyles}>
            <div style={controlStyles}>
              <label style={labelStyles}>Items: {itemCount}</label>
              <input
                type="range"
                min="2"
                max="20"
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                style={inputStyles}
              />
            </div>
            <div style={controlStyles}>
              <label style={labelStyles}>Gap: {gap}px</label>
              <input
                type="range"
                min="0"
                max="40"
                step="4"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                style={inputStyles}
              />
            </div>
            <div style={controlStyles}>
              <label style={labelStyles}>Justify Content</label>
              <select
                value={justifyContent}
                onChange={(e) => setJustifyContent(e.target.value)}
                style={inputStyles}
              >
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
                <option value="space-evenly">space-evenly</option>
              </select>
            </div>
            <div style={controlStyles}>
              <label style={labelStyles}>Align Items</label>
              <select
                value={alignItems}
                onChange={(e) => setAlignItems(e.target.value)}
                style={inputStyles}
              >
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
                <option value="center">center</option>
                <option value="stretch">stretch</option>
                <option value="baseline">baseline</option>
              </select>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md,
              justifyContent: 'center'
            }}>
              <input
                type="checkbox"
                id="random_size"
                checked={useRandomSizes}
                onChange={(e) => setUseRandomSizes(e.target.checked)}
                style={{ marginRight: theme.spacing.sm }}
              />
              <label htmlFor="random_size" style={labelStyles}>
                Random Sizes
              </label>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setItemCount(8);
                  setJustifyContent('flex-start');
                  setAlignItems('flex-start');
                  setGap(16);
                  setUseRandomSizes(true);
                }}
              >
                <RotateCcw size={16} />
                Reset
              </Button>
            </div>
          </div>

          <div style={flexboxContainerStyles}>
            <div style={flexboxStyles}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: theme.borderRadius.lg,
                    color: theme.colors.text.inverse,
                    fontWeight: theme.typography.fontWeight.bold,
                    fontSize: theme.typography.fontSize.lg,
                    flexShrink: 0,
                    backgroundColor: theme.colors.primary,
                    width: `${item.width}px`,
                    height: alignItems === 'stretch' ? '100%' : `${item.height}px`,
                    minHeight: '60px'
                  }}
                >
                  {item.id + 1}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* CSS Grid Section */}
      <div style={{
        marginTop: theme.spacing['5xl']
      }}>
        <h3 style={titleStyles}>CSS Grid Layout</h3>
        <p style={descriptionStyles}>
          A two-dimensional layout model for page-level structure. It excels at creating complex, responsive grids with rows and columns.
        </p>

        <Card variant="elevated">
          <div style={gridContainerStyles}>
            <div style={gridItemStyles(3)}>
              <div style={{ textAlign: 'center' }}>
                <Grid size={24} style={{ marginBottom: theme.spacing.sm, color: theme.colors.primary }} />
                <div>Sidebar</div>
                <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary }}>
                  3 columns
                </div>
              </div>
            </div>
            <div style={gridItemStyles(9)}>
              <div style={{ textAlign: 'center' }}>
                <div>Main Content Area</div>
                <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary }}>
                  9 columns
                </div>
              </div>
            </div>
            <div style={gridItemStyles(6)}>
              <div style={{ textAlign: 'center' }}>
                <div>Half Width</div>
                <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary }}>
                  6 columns
                </div>
              </div>
            </div>
            <div style={gridItemStyles(6)}>
              <div style={{ textAlign: 'center' }}>
                <div>Half Width</div>
                <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary }}>
                  6 columns
                </div>
              </div>
            </div>
            <div style={gridItemStyles(4)}>
              <div style={{ textAlign: 'center' }}>
                <div>Card</div>
                <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.secondary }}>
                  4 columns
                </div>
              </div>
            </div>
          </div>

          {/* Grid explanation */}
          <div style={{
            marginTop: theme.spacing.xl,
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.background.secondary,
            borderRadius: theme.borderRadius.lg
          }}>
            <h5 style={{
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.md
            }}>
              Grid Layout Benefits:
            </h5>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: theme.spacing.lg
            }}>
              {[
                'Two-dimensional control (rows and columns)',
                'Perfect for page-level layouts',
                'Responsive without media queries',
                'Easy alignment and spacing',
                'Overlapping elements support',
                'Implicit grid auto-placement'
              ].map((benefit, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.sm
                }}>
                  <Grid size={16} style={{ color: theme.colors.primary }} />
                  <span style={{
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.sm
                  }}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Layout Comparison */}
      <div style={{
        marginTop: theme.spacing['3xl']
      }}>
        <Card 
          style={{
            background: `linear-gradient(135deg, ${theme.colors.accent.blue}10, ${theme.colors.accent.purple}05)`,
            border: `1px solid ${theme.colors.accent.blue}20`
          }}
        >
          <h4 style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            marginBottom: theme.spacing.xl,
            color: theme.colors.text.primary,
            textAlign: 'center'
          }}>
            When to Use Each Layout Method
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: theme.spacing['2xl']
          }}>
            <div style={{
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.background.primary,
              borderRadius: theme.borderRadius.lg,
              border: `2px solid ${theme.colors.accent.blue}30`
            }}>
              <h5 style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.accent.blue,
                marginBottom: theme.spacing.lg,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm
              }}>
                <div style={{
                  width: '20px',
                  height: '4px',
                  backgroundColor: theme.colors.accent.blue,
                  borderRadius: theme.borderRadius.sm
                }} />
                Flexbox
              </h5>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.md
              }}>
                {[
                  'Navigation bars and headers',
                  'Button groups and toolbars',
                  'Form layouts and input groups',
                  'Card layouts (same height)',
                  'Centering content vertically',
                  'Distributing space between items'
                ].map((useCase, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.sm
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: theme.colors.accent.blue,
                      borderRadius: '50%'
                    }} />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.background.primary,
              borderRadius: theme.borderRadius.lg,
              border: `2px solid ${theme.colors.accent.purple}30`
            }}>
              <h5 style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.accent.purple,
                marginBottom: theme.spacing.lg,
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm
              }}>
                <Grid size={20} style={{ color: theme.colors.accent.purple }} />
                CSS Grid
              </h5>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.md
              }}>
                {[
                  'Page layouts and sections',
                  'Dashboard and admin panels',
                  'Image galleries and portfolios',
                  'Magazine-style layouts',
                  'Complex responsive designs',
                  'Overlapping content areas'
                ].map((useCase, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.sm
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      backgroundColor: theme.colors.accent.purple,
                      borderRadius: '50%'
                    }} />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LayoutTechniques