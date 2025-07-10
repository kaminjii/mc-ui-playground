import React, { useState, useMemo } from 'react';
import { Palette, Code, CheckCircle, ArrowRight, ArrowDown } from 'lucide-react';
import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';
import { theme } from '../../../theme';

const DesignSystems = () => {
  const [selectedToken, setSelectedToken] = useState('color');
  const [pickedColor, setPickedColor] = useState('#EB001B');

  // Mastercard-inspired color tokens
  const colorTokens = [
    { name: '--mc-red-primary', hex: '#EB001B', usage: 'Primary brand color, CTAs' },
    { name: '--mc-orange-primary', hex: '#FF5F00', usage: 'Secondary brand color' },
    { name: '--mc-yellow-accent', hex: '#F79E1B', usage: 'Accent color, highlights' },
    { name: '--mc-blue-primary', hex: '#0066CC', usage: 'Information, links' },
    { name: '--mc-purple-accent', hex: '#6C1D7F', usage: 'Premium features' },
    { name: '--mc-green-success', hex: '#00A651', usage: 'Success states' },
    { name: '--mc-gray-50', hex: '#F7F7F7', usage: 'Background surfaces' },
    { name: '--mc-gray-100', hex: '#E6E6E6', usage: 'Borders, dividers' },
    { name: '--mc-gray-600', hex: '#666666', usage: 'Secondary text' },
    { name: '--mc-gray-900', hex: '#1A1A1A', usage: 'Primary text' }
  ];

  const tokenCategories = {
    color: {
      title: 'Color Tokens',
      description: 'Semantic color values that maintain consistency across all brand touchpoints.',
      examples: [
        { name: 'Primary', value: theme.colors.primary, usage: 'CTAs, primary actions' },
        { name: 'Secondary', value: theme.colors.secondary, usage: 'Secondary actions' },
        { name: 'Success', value: theme.colors.status.success, usage: 'Success messages' },
        { name: 'Error', value: theme.colors.status.error, usage: 'Error states' }
      ]
    },
    spacing: {
      title: 'Spacing Tokens',
      description: 'Consistent spacing values create visual rhythm and improve layout predictability.',
      examples: [
        { name: 'XS', value: theme.spacing.xs, usage: 'Icon padding, micro spacing' },
        { name: 'SM', value: theme.spacing.sm, usage: 'Form field spacing' },
        { name: 'MD', value: theme.spacing.md, usage: 'Component padding' },
        { name: 'LG', value: theme.spacing.lg, usage: 'Section spacing' },
        { name: 'XL', value: theme.spacing.xl, usage: 'Layout margins' }
      ]
    },
    typography: {
      title: 'Typography Tokens',
      description: 'Font sizes, weights, and line heights that create clear information hierarchy.',
      examples: [
        { name: 'Display', value: theme.typography.fontSize['5xl'], usage: 'Page headlines' },
        { name: 'Heading', value: theme.typography.fontSize['2xl'], usage: 'Section titles' },
        { name: 'Body', value: theme.typography.fontSize.base, usage: 'Primary content' },
        { name: 'Caption', value: theme.typography.fontSize.sm, usage: 'Helper text' }
      ]
    }
  };

  const findClosestToken = (inputHex) => {
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const colorDistance = (rgb1, rgb2) => 
      Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2));

    const inputRgb = hexToRgb(inputHex);
    if (!inputRgb) return null;

    let closest = null;
    let minDistance = Infinity;

    colorTokens.forEach(token => {
      const tokenRgb = hexToRgb(token.hex);
      if (tokenRgb) {
        const distance = colorDistance(inputRgb, tokenRgb);
        if (distance < minDistance) {
          minDistance = distance;
          closest = token;
        }
      }
    });

    return closest;
  };

  const closestToken = useMemo(() => findClosestToken(pickedColor), [pickedColor]);

  const sectionStyles = {
    padding: `${theme.spacing['4xl']} 0`,
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyles = {
    textAlign: 'center',
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
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: theme.typography.lineHeight.relaxed
  };

  const selectorStyles = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing['3xl'],
    flexWrap: 'wrap',
    gap: theme.spacing.md
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing['3xl']
  };

  const colorMatcherStyles = {
    background: `linear-gradient(135deg, ${theme.colors.background.secondary}, ${theme.colors.accent.blue}10)`,
    borderRadius: theme.borderRadius['2xl'],
    padding: theme.spacing['3xl'],
    border: `1px solid ${theme.colors.border.light}`,
    marginTop: theme.spacing['3xl']
  };

  const colorPickerGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing['2xl'],
    alignItems: 'center',
    maxWidth: '800px',
    margin: '0 auto'
  };

  return (
    <div style={sectionStyles}>
      <div style={headerStyles}>
        <h3 style={titleStyles}>Design Tokens: The Foundation</h3>
        <p style={descriptionStyles}>
          Design tokens are the atomic elements of a design system - named entities that store visual design attributes. 
          They're the single source of truth that ensures consistency across all platforms and products.
        </p>
      </div>

      {/* Token category selector */}
      <div style={selectorStyles}>
        {Object.entries(tokenCategories).map(([key, category]) => (
          <Button
            key={key}
            variant={selectedToken === key ? 'primary' : 'ghost'}
            onClick={() => setSelectedToken(key)}
          >
            {category.title}
          </Button>
        ))}
      </div>

      {/* Token details */}
      <Card variant="elevated">
        <h4 style={{
          fontSize: theme.typography.fontSize['2xl'],
          fontWeight: theme.typography.fontWeight.bold,
          marginBottom: theme.spacing.lg,
          color: theme.colors.text.primary
        }}>
          {tokenCategories[selectedToken].title}
        </h4>
        <p style={{
          color: theme.colors.text.secondary,
          marginBottom: theme.spacing['2xl'],
          fontSize: theme.typography.fontSize.lg,
          lineHeight: theme.typography.lineHeight.relaxed
        }}>
          {tokenCategories[selectedToken].description}
        </p>

        <div style={gridStyles}>
          {tokenCategories[selectedToken].examples.map((token, index) => (
            <Card 
              key={token.name}
              style={{
                padding: theme.spacing.lg,
                border: `1px solid ${theme.colors.border.light}`,
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = theme.shadows.lg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme.shadows.sm;
              }}
            >
              {selectedToken === 'color' && (
                <div 
                  style={{
                    width: '100%',
                    height: '64px',
                    borderRadius: theme.borderRadius.lg,
                    backgroundColor: token.value,
                    marginBottom: theme.spacing.lg,
                    boxShadow: theme.shadows.sm
                  }}
                />
              )}
              {selectedToken === 'spacing' && (
                <div style={{
                  marginBottom: theme.spacing.lg,
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.md
                }}>
                  <div 
                    style={{
                      backgroundColor: theme.colors.primary,
                      borderRadius: theme.borderRadius.sm,
                      width: token.value,
                      height: '8px'
                    }}
                  />
                  <span style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.text.secondary,
                    fontFamily: theme.typography.fontFamily.mono
                  }}>
                    {token.value}
                  </span>
                </div>
              )}
              {selectedToken === 'typography' && (
                <div 
                  style={{
                    marginBottom: theme.spacing.lg,
                    fontSize: token.value,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.primary
                  }}
                >
                  Sample Text
                </div>
              )}
              
              <h5 style={{
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.sm
              }}>
                {token.name}
              </h5>
              <p style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing.sm,
                fontFamily: theme.typography.fontFamily.mono
              }}>
                {token.value}
              </p>
              <p style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.text.tertiary
              }}>
                {token.usage}
              </p>
            </Card>
          ))}
        </div>
      </Card>

      {/* Interactive color matcher */}
      {selectedToken === 'color' && (
        <div style={colorMatcherStyles}>
          <h4 style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            marginBottom: theme.spacing.xl,
            textAlign: 'center',
            color: theme.colors.text.primary
          }}>
            Interactive Color Token Matcher
          </h4>
          <div style={colorPickerGridStyles}>
            <div style={{ textAlign: 'center' }}>
              <label style={{
                display: 'block',
                fontWeight: theme.typography.fontWeight.semibold,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing.lg,
                color: theme.colors.text.primary
              }}>
                Pick Any Color
              </label>
              <input
                type="color"
                value={pickedColor}
                onChange={(e) => setPickedColor(e.target.value)}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: theme.borderRadius['2xl'],
                  border: `4px solid ${theme.colors.background.primary}`,
                  boxShadow: theme.shadows.xl,
                  cursor: 'pointer',
                  marginBottom: theme.spacing.lg,
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              />
              <Card style={{
                backgroundColor: theme.colors.background.primary,
                textAlign: 'center'
              }}>
                <p style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing.sm
                }}>
                  Your Color
                </p>
                <p style={{
                  fontFamily: theme.typography.fontFamily.mono,
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text.primary
                }}>
                  {pickedColor.toUpperCase()}
                </p>
              </Card>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: theme.spacing.xl
            }}>
              <ArrowRight 
                size={32} 
                style={{ 
                  color: theme.colors.text.tertiary,
                  display: 'none',
                  '@media (min-width: 768px)': { display: 'block' }
                }} 
              />
              <ArrowDown 
                size={32} 
                style={{ 
                  color: theme.colors.text.tertiary,
                  display: 'block',
                  '@media (min-width: 768px)': { display: 'none' }
                }} 
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <label style={{
                display: 'block',
                fontWeight: theme.typography.fontWeight.semibold,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing.lg,
                color: theme.colors.text.primary
              }}>
                Closest Brand Token
              </label>
              {closestToken && (
                <>
                  <div 
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: theme.borderRadius['2xl'],
                      backgroundColor: closestToken.hex,
                      border: `4px solid ${theme.colors.background.primary}`,
                      boxShadow: theme.shadows.xl,
                      margin: `0 auto ${theme.spacing.lg}`,
                      transition: 'all 0.5s ease'
                    }}
                  />
                  <Card style={{
                    backgroundColor: theme.colors.background.primary,
                    textAlign: 'center'
                  }}>
                    <p style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.secondary,
                      marginBottom: theme.spacing.sm
                    }}>
                      Closest Brand Token
                    </p>
                    <p style={{
                      fontFamily: theme.typography.fontFamily.mono,
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing.sm
                    }}>
                      {closestToken.hex.toUpperCase()}
                    </p>
                    <p style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.text.tertiary,
                      fontFamily: theme.typography.fontFamily.mono
                    }}>
                      {closestToken.name}
                    </p>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Benefits section */}
      <Card 
        style={{
          marginTop: theme.spacing['3xl'],
          background: `linear-gradient(135deg, ${theme.colors.accent.purple}10, ${theme.colors.accent.blue}05)`,
          border: `1px solid ${theme.colors.accent.purple}20`
        }}
      >
        <h5 style={{
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.accent.purple,
          marginBottom: theme.spacing.lg,
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          fontSize: theme.typography.fontSize.xl
        }}>
          <Code size={24} />
          Design Token Benefits
        </h5>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: theme.spacing.lg
        }}>
          {[
            'Single source of truth for design decisions',
            'Automated consistency across platforms',
            'Easy theme switching and customization',
            'Better collaboration between design and development',
            'Scalable design system maintenance'
          ].map((benefit, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md
            }}>
              <CheckCircle size={20} style={{ color: theme.colors.status.success }} />
              <span style={{
                color: theme.colors.text.primary,
                fontWeight: theme.typography.fontWeight.medium
              }}>
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DesignSystems;