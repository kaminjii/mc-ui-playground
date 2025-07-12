import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Minus, ArrowRight, ArrowDown, ArrowRightFromLine, ArrowLeftFromLine,
  AlignHorizontalJustifyStart, AlignHorizontalJustifyCenter, AlignHorizontalJustifyEnd,
  AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd,
  RotateCcw, Move, WrapText, Maximize, BookOpen, Code, Info, Play, Copy, Check,
  ArrowUpDown, ArrowLeftRight, Grid, MousePointer, Shuffle, Sparkles
} from 'lucide-react';
import { theme } from '../../../theme';

const ControlButton = ({ onClick, title, icon, active = false, disabled = false, label }) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const buttonStyle = {
    height: '36px',
    minWidth: '36px',
    padding: label ? '0 12px' : '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: `2px solid ${active ? theme.colors.primary : theme.colors.border.medium}`,
    backgroundColor: active ? theme.colors.primary : theme.colors.background.primary,
    color: active ? theme.colors.text.inverse : theme.colors.text.primary,
    borderRadius: theme.borderRadius.md,
    transition: 'all 0.2s ease',
    boxShadow: active ? `0 2px 8px ${theme.colors.primary}40` : theme.shadows.sm,
    transform: isPressed ? 'scale(0.95)' : active ? 'translateY(-1px)' : 'translateY(0)',
    opacity: disabled ? 0.5 : 1,
    fontSize: '12px',
    fontWeight: '500',
    position: 'relative',
    overflow: 'hidden'
  };

  const rippleStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%) scale(0)',
    background: active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 107, 53, 0.3)',
    transition: 'transform 0.3s ease',
    pointerEvents: 'none'
  };

  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <div style={rippleStyle} />
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
};

// Enhanced Item Component with better controls
const FlexItem = ({ item, index, onRemove, onResize }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const itemStyle = {
    backgroundColor: theme.colors.background.card,
    border: `2px solid ${theme.colors.border.medium}`,
    borderRadius: theme.borderRadius.lg,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: isHovered ? theme.shadows.lg : theme.shadows.md,
    position: 'relative',
    transition: 'all 0.3s ease', // Updated transition
    minHeight: '100px',
    minWidth: '100px',
    cursor: 'pointer',
    overflow: 'hidden',
    background: `linear-gradient(135deg, ${theme.colors.background.card} 0%, ${theme.colors.background.secondary} 100%)`,
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    width: `${item.width}px`,
    height: `${item.height}px`
  };

  const overlayStyle = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    display: 'flex',
    gap: '4px',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.2s ease'
  };

  const resizeControlStyle = {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 0.2s ease',
    cursor: 'se-resize'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={itemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: theme.colors.primary,
        background: `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        {index + 1}
      </div>
      
      <div style={{
        fontSize: '12px',
        color: theme.colors.text.muted,
        textAlign: 'center',
        fontFamily: 'monospace'
      }}>
        {item.width}×{item.height}
      </div>

      <div style={overlayStyle}>
        <button
          onClick={() => onRemove(item.id)}
          style={{
            background: theme.colors.primary,
            border: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.colors.text.inverse,
            cursor: 'pointer',
            boxShadow: theme.shadows.md
          }}
        >
          <Minus size={12} />
        </button>
      </div>

      <div style={resizeControlStyle}>
        <Maximize size={16} color={theme.colors.text.muted} />
      </div>
    </motion.div>
  );
};

// Info Panel Component
const InfoPanel = ({ property, value, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div style={{
      background: theme.colors.background.card,
      border: `1px solid ${theme.colors.border.light}`,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: theme.shadows.sm
    }}
    onClick={() => setIsExpanded(!isExpanded)}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: isExpanded ? theme.spacing.sm : 0
      }}>
        <div style={{
          fontFamily: 'monospace',
          fontSize: '14px',
          fontWeight: 'bold',
          color: theme.colors.primary
        }}>
          {property}: {value}
        </div>
        <Info size={16} color={theme.colors.text.muted} />
      </div>
      {isExpanded && (
        <div style={{
          fontSize: '12px',
          color: theme.colors.text.secondary,
          lineHeight: 1.4
        }}>
          {description}
        </div>
      )}
    </div>
  );
};

// Main Component
const FlexboxPlayground = () => {
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('flex-start');
  const [align, setAlign] = useState('stretch');
  const [wrap, setWrap] = useState('nowrap');
  const [alignContent, setAlignContent] = useState('flex-start');
  const [gap, setGap] = useState(16);
  const [items, setItems] = useState([
    { id: 1, width: 120, height: 100 },
    { id: 2, width: 80, height: 140 },
    { id: 3, width: 160, height: 80 }
  ]);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const addItem = () => {
    const widths = [80, 100, 120, 140, 160];
    const heights = [80, 100, 120, 140, 160];
    const newItem = {
      id: Date.now(),
      width: widths[Math.floor(Math.random() * widths.length)],
      height: heights[Math.floor(Math.random() * heights.length)]
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  };

  const resetAll = () => {
    setDirection('row');
    setJustify('flex-start');
    setAlign('stretch');
    setWrap('nowrap');
    setAlignContent('flex-start');
    setGap(16);
    setItems([
      { id: 1, width: 120, height: 100 },
      { id: 2, width: 80, height: 140 },
      { id: 3, width: 160, height: 80 }
    ]);
  };

  const copyCode = () => {
    const css = `.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};${wrap === 'wrap' ? `\n  align-content: ${alignContent};` : ''}
  gap: ${gap}px;
}`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
    alignContent: alignContent,
    gap: `${gap}px`,
    minHeight: '500px',
    padding: theme.spacing.xl,
    background: `linear-gradient(135deg, ${theme.colors.background.secondary} 0%, ${theme.colors.background.primary} 100%)`,
    borderRadius: theme.borderRadius.xl,
    border: `3px dashed ${theme.colors.border.medium}`,
    position: 'relative',
    transition: 'all 0.3s ease', // Updated transition
  };

  const properties = {
    'flex-direction': {
      value: direction,
      description: 'Defines the direction of the main axis. Row makes it horizontal, column makes it vertical.'
    },
    'justify-content': {
      value: justify,
      description: 'Aligns items along the main axis. Controls spacing between and around items.'
    },
    'align-items': {
      value: align,
      description: 'Aligns items along the cross axis. Stretch makes items fill the container height/width.'
    },
    'flex-wrap': {
      value: wrap,
      description: 'Controls whether items wrap to new lines when container is too small.'
    },
    'gap': {
      value: `${gap}px`,
      description: 'Sets the space between flex items. Modern alternative to margins.'
    }
  };

  return (
    <div style={{
      background: theme.colors.background.secondary,
      color: theme.colors.text.primary,
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.xl
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Compact Controls */}
        <div style={{
          background: theme.colors.background.card,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadows.md,
          marginBottom: theme.spacing.lg
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: theme.spacing.lg,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            
            {/* Direction */}
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: theme.colors.text.secondary, minWidth: '70px' }}>
                Direction:
              </span>
              <div style={{ display: 'flex', gap: theme.spacing.xs }}>
                <ControlButton
                  onClick={() => setDirection('row')}
                  active={direction === 'row'}
                  title="Row - Horizontal layout"
                  icon={<ArrowRight size={14} />}
                />
                <ControlButton
                  onClick={() => setDirection('column')}
                  active={direction === 'column'}
                  title="Column - Vertical layout"
                  icon={<ArrowDown size={14} />}
                />
              </div>
            </div>

            {/* Justify Content */}
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: theme.colors.text.secondary, minWidth: '50px' }}>
                Justify:
              </span>
              <div style={{ display: 'flex', gap: theme.spacing.xs }}>
                <ControlButton
                  onClick={() => setJustify('flex-start')}
                  active={justify === 'flex-start'}
                  title="Start"
                  icon={<AlignHorizontalJustifyStart size={14} />}
                />
                <ControlButton
                  onClick={() => setJustify('center')}
                  active={justify === 'center'}
                  title="Center"
                  icon={<AlignHorizontalJustifyCenter size={14} />}
                />
                <ControlButton
                  onClick={() => setJustify('flex-end')}
                  active={justify === 'flex-end'}
                  title="End"
                  icon={<AlignHorizontalJustifyEnd size={14} />}
                />
                <ControlButton
                  onClick={() => setJustify('space-between')}
                  active={justify === 'space-between'}
                  title="Space Between"
                  icon={<ArrowRightFromLine size={14} />}
                />
                <ControlButton
                  onClick={() => setJustify('space-around')}
                  active={justify === 'space-around'}
                  title="Space Around"
                  icon={<ArrowLeftFromLine size={14} />}
                />
              </div>
            </div>

            {/* Align Items */}
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: theme.colors.text.secondary, minWidth: '40px' }}>
                Align:
              </span>
              <div style={{ display: 'flex', gap: theme.spacing.xs }}>
                <ControlButton
                  onClick={() => setAlign('stretch')}
                  active={align === 'stretch'}
                  title="Stretch"
                  icon={<Maximize size={14} />}
                />
                <ControlButton
                  onClick={() => setAlign('flex-start')}
                  active={align === 'flex-start'}
                  title="Start"
                  icon={<AlignVerticalJustifyStart size={14} />}
                />
                <ControlButton
                  onClick={() => setAlign('center')}
                  active={align === 'center'}
                  title="Center"
                  icon={<AlignVerticalJustifyCenter size={14} />}
                />
                <ControlButton
                  onClick={() => setAlign('flex-end')}
                  active={align === 'flex-end'}
                  title="End"
                  icon={<AlignVerticalJustifyEnd size={14} />}
                />
              </div>
            </div>

            {/* Wrap & Gap */}
            <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
              <ControlButton
                onClick={() => setWrap(wrap === 'nowrap' ? 'wrap' : 'nowrap')}
                active={wrap === 'wrap'}
                title="Toggle wrap"
                icon={<WrapText size={14} />}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
                <span style={{ fontSize: '12px', color: theme.colors.text.muted }}>Gap:</span>
                <input
                  type="range"
                  min="0"
                  max="48"
                  value={gap}
                  onChange={(e) => setGap(Number(e.target.value))}
                  style={{
                    width: '80px',
                    accentColor: theme.colors.primary
                  }}
                />
                <span style={{ fontSize: '12px', color: theme.colors.text.muted, minWidth: '30px' }}>
                  {gap}px
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: theme.spacing.xs }}>
              <ControlButton
                onClick={addItem}
                title="Add item"
                icon={<Plus size={14} />}
              />
              <ControlButton
                onClick={shuffleItems}
                title="Shuffle items"
                icon={<Shuffle size={14} />}
              />
              <ControlButton
                onClick={() => setShowCode(!showCode)}
                active={showCode}
                title="Show CSS"
                icon={<Code size={14} />}
              />
              <ControlButton
                onClick={copyCode}
                title="Copy CSS"
                icon={copied ? <Check size={14} /> : <Copy size={14} />}
              />
              <ControlButton
                onClick={resetAll}
                title="Reset"
                icon={<RotateCcw size={14} />}
              />
            </div>
          </div>
        </div>



        {/* Flexbox Container */}
        <div style={{
          background: theme.colors.background.card,
          padding: theme.spacing.lg,
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadows.md,
          marginBottom: theme.spacing.lg
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: theme.spacing.md,
            color: theme.colors.text.primary,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm
          }}>
            <Play size={16} color={theme.colors.primary} />
            Flexbox Container
          </h3>
          
          <motion.div
            layout
            style={containerStyle}
            animate={{
              borderColor: theme.colors.primary
            }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {items.map((item, index) => (
                <FlexItem
                  key={item.id}
                  item={item}
                  index={index}
                  onRemove={removeItem}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Code Display */}
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: theme.colors.background.dark,
                padding: theme.spacing.lg,
                borderRadius: theme.borderRadius.lg,
                boxShadow: theme.shadows.md,
                marginBottom: theme.spacing.lg
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: theme.spacing.md
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: theme.colors.text.inverse
                }}>
                  Generated CSS
                </h3>
                <button
                  onClick={copyCode}
                  style={{
                    background: theme.colors.primary,
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: theme.borderRadius.md,
                    color: theme.colors.text.inverse,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <pre style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.md,
                color: '#f8f8f2',
                fontSize: '13px',
                fontFamily: 'monospace',
                overflow: 'auto',
                margin: 0,
                lineHeight: 1.4
              }}>
                <code>{`.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};${wrap === 'wrap' ? `\n  align-content: ${alignContent};` : ''}
  gap: ${gap}px;
}`}</code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlexboxPlayground;