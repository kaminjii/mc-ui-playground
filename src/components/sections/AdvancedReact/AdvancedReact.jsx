import React, { useState, useEffect, useContext, useCallback, useMemo, createContext } from 'react';
import { Lightbulb, CheckCircle, Code, Layers, Loader2, Play, Pause, RotateCcw } from 'lucide-react';
import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';
import CodeBlock from '../../ui/CodeBlock/CodeBlock';
import { theme } from '../../../theme';

// Demo contexts
const StateDemoContext = createContext();

const AdvancedReact = () => {
  const sectionStyles = {
    padding: `${theme.spacing['4xl']} 0`,
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyles = {
    textAlign: 'center',
    marginBottom: theme.spacing['4xl']
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

  return (
    <div style={sectionStyles}>
      <div style={headerStyles}>
        <h3 style={titleStyles}>Advanced React Patterns</h3>
        <p style={descriptionStyles}>
          Master modern React patterns and performance optimization techniques used in production applications.
        </p>
      </div>
      
      <StateManagementDemo />
      <CustomHookDemo />
      <MemoizationDemo />
    </div>
  );
};

// Flash component for showing re-renders
const FlashBox = ({ children, rerenderKey, className = "" }) => {
  const [isFlashing, setFlashing] = useState(false);
  
  useEffect(() => {
    setFlashing(true);
    const timer = setTimeout(() => setFlashing(false), 600);
    return () => clearTimeout(timer);
  }, [rerenderKey]);

  const flashStyles = {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    border: '2px solid',
    transition: 'all 0.5s ease',
    backgroundColor: isFlashing ? '#FEF3C7' : theme.colors.background.secondary + '80',
    borderColor: isFlashing ? '#F59E0B' : theme.colors.border.light,
    boxShadow: isFlashing ? theme.shadows.xl : theme.shadows.sm,
    transform: isFlashing ? 'scale(1.02)' : 'scale(1)'
  };

  return (
    <div style={flashStyles} className={className}>
      {children}
    </div>
  );
};

const StateManagementDemo = () => {
  const [drilledCount, setDrilledCount] = useState(0);
  const [contextCount, setContextCount] = useState(0);

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: theme.spacing['2xl'],
    alignItems: 'start',
    marginBottom: theme.spacing['3xl']
  };

  return (
    <div style={{ marginBottom: theme.spacing['5xl'] }}>
      <h4 style={{
        fontSize: theme.typography.fontSize['2xl'],
        fontWeight: theme.typography.fontWeight.bold,
        marginBottom: theme.spacing.lg,
        color: theme.colors.text.primary
      }}>
        State Management: Prop Drilling vs Context
      </h4>
      <p style={{
        fontSize: theme.typography.fontSize.lg,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing['2xl'],
        lineHeight: theme.typography.lineHeight.relaxed
      }}>
        Watch how re-renders propagate differently in prop drilling vs context patterns.
      </p>
      
      <div style={gridStyles}>
        <div>
          <h5 style={{
            fontWeight: theme.typography.fontWeight.semibold,
            textAlign: 'center',
            marginBottom: theme.spacing.lg,
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.status.error
          }}>
            ❌ Prop Drilling
          </h5>
          <FlashBox rerenderKey={drilledCount}>
            <div style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
              <p style={{
                fontWeight: theme.typography.fontWeight.bold,
                marginBottom: theme.spacing.sm
              }}>
                Parent Component
              </p>
              <Button 
                onClick={() => setDrilledCount(c => c + 1)}
                size="sm"
              >
                Count: {drilledCount}
              </Button>
            </div>
            <DrilledChild count={drilledCount} />
          </FlashBox>
        </div>

        <div>
          <h5 style={{
            fontWeight: theme.typography.fontWeight.semibold,
            textAlign: 'center',
            marginBottom: theme.spacing.lg,
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.status.success
          }}>
            ✅ Context API
          </h5>
          <StateDemoContext.Provider value={{ count: contextCount, setCount: setContextCount }}>
            <FlashBox rerenderKey={contextCount}>
              <div style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
                <p style={{
                  fontWeight: theme.typography.fontWeight.bold,
                  marginBottom: theme.spacing.sm
                }}>
                  Provider Component
                </p>
                <Button 
                  onClick={() => setContextCount(c => c + 1)}
                  size="sm"
                >
                  Count: {contextCount}
                </Button>
              </div>
              <ContextChild />
            </FlashBox>
          </StateDemoContext.Provider>
        </div>
      </div>

      <Card style={{
        background: `linear-gradient(135deg, ${theme.colors.accent.blue}10, ${theme.colors.accent.blue}05)`,
        border: `1px solid ${theme.colors.accent.blue}20`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.sm
        }}>
          <Lightbulb size={20} style={{ color: theme.colors.accent.blue }} />
          <h6 style={{
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.accent.blue
          }}>
            Key Insight
          </h6>
        </div>
        <p style={{ color: theme.colors.text.primary }}>
          Notice how prop drilling causes all intermediate components to flash (re-render), 
          while Context only updates components that consume the context value.
        </p>
      </Card>
    </div>
  );
};

const DrilledChild = ({ count }) => (
  <FlashBox rerenderKey={count}>
    <p style={{ textAlign: 'center', marginBottom: theme.spacing.sm }}>
      Intermediate Child (Re-renders unnecessarily)
    </p>
    <DrilledGrandchild count={count} />
  </FlashBox>
);

const DrilledGrandchild = ({ count }) => (
  <FlashBox rerenderKey={count}>
    <p style={{ textAlign: 'center', marginBottom: theme.spacing.sm }}>Grandchild</p>
    <p style={{
      textAlign: 'center',
      fontSize: theme.typography.fontSize['2xl'],
      fontWeight: theme.typography.fontWeight.bold
    }}>
      {count}
    </p>
  </FlashBox>
);

const ContextChild = () => (
  <div style={{
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    border: `2px solid ${theme.colors.border.light}`,
    backgroundColor: theme.colors.background.secondary
  }}>
    <p style={{ textAlign: 'center', marginBottom: theme.spacing.sm }}>
      Intermediate Child (Skips re-render)
    </p>
    <ContextGrandchild />
  </div>
);

const ContextGrandchild = () => {
  const { count } = useContext(StateDemoContext);
  
  return (
    <FlashBox rerenderKey={count}>
      <p style={{ textAlign: 'center', marginBottom: theme.spacing.sm }}>Context Consumer</p>
      <p style={{
        textAlign: 'center',
        fontSize: theme.typography.fontSize['2xl'],
        fontWeight: theme.typography.fontWeight.bold
      }}>
        {count}
      </p>
    </FlashBox>
  );
};

// Custom Hook Demo
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
};

const CustomHookDemo = () => {
  const counter = useCounter(0);

  return (
    <div style={{ marginBottom: theme.spacing['5xl'] }}>
      <h4 style={{
        fontSize: theme.typography.fontSize['2xl'],
        fontWeight: theme.typography.fontWeight.bold,
        marginBottom: theme.spacing.lg,
        color: theme.colors.text.primary
      }}>
        Custom Hooks: Reusable Logic
      </h4>
      <p style={{
        fontSize: theme.typography.fontSize.lg,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing['2xl'],
        lineHeight: theme.typography.lineHeight.relaxed
      }}>
        Extract stateful logic into reusable custom hooks for better code organization.
      </p>

      <Card variant="elevated">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: theme.spacing['2xl']
        }}>
          <div>
            <h5 style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing.lg,
              color: theme.colors.text.primary
            }}>
              useCounter Hook
            </h5>
            
            <CodeBlock language="javascript">
{`const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => 
    setCount(c => c + 1), []);
  const decrement = useCallback(() => 
    setCount(c => c - 1), []);
  const reset = useCallback(() => 
    setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
};`}
            </CodeBlock>
          </div>

          <div>
            <div style={{
              padding: theme.spacing.xl,
              backgroundColor: theme.colors.background.secondary,
              borderRadius: theme.borderRadius.xl,
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: theme.typography.fontSize['4xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg
              }}>
                {counter.count}
              </div>
              <div style={{
                display: 'flex',
                gap: theme.spacing.md,
                justifyContent: 'center'
              }}>
                <Button onClick={counter.decrement} size="sm">-</Button>
                <Button onClick={counter.reset} variant="secondary" size="sm">Reset</Button>
                <Button onClick={counter.increment} size="sm">+</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Memoization Demo
const MemoizationDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);

  // Expensive calculation
  const expensiveCalculation = useMemo(() => {
    console.log('🔄 Expensive calculation running...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result.toFixed(2);
  }, [count]);

  // Memoized component
  const MemoizedItemList = React.memo(({ items }) => {
    console.log('📝 ItemList re-rendering');
    return (
      <div>
        <h6 style={{
          fontWeight: theme.typography.fontWeight.semibold,
          marginBottom: theme.spacing.md
        }}>
          Item List ({items.length} items)
        </h6>
        {items.map((item, index) => (
          <div key={index} style={{
            padding: theme.spacing.sm,
            backgroundColor: theme.colors.background.secondary,
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.sm,
            marginBottom: theme.spacing.sm
          }}>
            {item}
          </div>
        ))}
      </div>
    );
  });

  const addItem = useCallback(() => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`]);
  }, []);

  return (
    <div style={{ marginBottom: theme.spacing['5xl'] }}>
      <h4 style={{
        fontSize: theme.typography.fontSize['2xl'],
        fontWeight: theme.typography.fontWeight.bold,
        marginBottom: theme.spacing.lg,
        color: theme.colors.text.primary
      }}>
        Memoization & Performance
      </h4>
      <p style={{
        fontSize: theme.typography.fontSize.lg,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing['2xl'],
        lineHeight: theme.typography.lineHeight.relaxed
      }}>
        Use useMemo, React.memo, and useCallback to optimize performance in React applications.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: theme.spacing['2xl']
      }}>
        {/* Controls */}
        <Card variant="elevated">
          <h5 style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
            marginBottom: theme.spacing.lg,
            color: theme.colors.text.primary
          }}>
            Controls
          </h5>
          
          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={{
              display: 'block',
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.sm
            }}>
              Count (triggers expensive calculation)
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md
            }}>
              <Button onClick={() => setCount(c => c - 1)} size="sm">-</Button>
              <span style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                minWidth: '3rem',
                textAlign: 'center'
              }}>
                {count}
              </span>
              <Button onClick={() => setCount(c => c + 1)} size="sm">+</Button>
            </div>
          </div>

          <div style={{ marginBottom: theme.spacing.lg }}>
            <label style={{
              display: 'block',
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.sm
            }}>
              Name (doesn't trigger calculation)
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Type something..."
              style={{
                width: '100%',
                padding: theme.spacing.md,
                border: `1px solid ${theme.colors.border.medium}`,
                borderRadius: theme.borderRadius.lg,
                fontSize: theme.typography.fontSize.base
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.sm
            }}>
              Items (memoized component)
            </label>
            <Button onClick={addItem} size="sm">
              Add Item
            </Button>
          </div>
        </Card>

        {/* Results */}
        <Card variant="elevated">
          <h5 style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
            marginBottom: theme.spacing.lg,
            color: theme.colors.text.primary
          }}>
            Results
          </h5>
          
          <div style={{ marginBottom: theme.spacing.lg }}>
            <div style={{
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.accent.blue + '10',
              borderRadius: theme.borderRadius.lg,
              marginBottom: theme.spacing.lg
            }}>
              <h6 style={{
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.accent.blue,
                marginBottom: theme.spacing.sm
              }}>
                useMemo Result
              </h6>
              <p style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.accent.blue,
                fontFamily: theme.typography.fontFamily.mono
              }}>
                {expensiveCalculation}
              </p>
              <p style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginTop: theme.spacing.sm
              }}>
                Only recalculates when count changes
              </p>
            </div>

            <div style={{
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.status.success + '10',
              borderRadius: theme.borderRadius.lg,
              marginBottom: theme.spacing.lg
            }}>
              <h6 style={{
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.status.success,
                marginBottom: theme.spacing.sm
              }}>
                Current State
              </h6>
              <p><strong>Count:</strong> {count}</p>
              <p><strong>Name:</strong> {name || 'Empty'}</p>
            </div>

            <div style={{
              padding: theme.spacing.lg,
              backgroundColor: theme.colors.accent.purple + '10',
              borderRadius: theme.borderRadius.lg
            }}>
              <MemoizedItemList items={items} />
              <p style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
                marginTop: theme.spacing.sm
              }}>
                Component only re-renders when items change
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ marginTop: theme.spacing['2xl'] }}>
        <CodeBlock language="javascript">
{`// useMemo - expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(dependency);
}, [dependency]);

// React.memo - component memoization  
const MemoizedComponent = React.memo(({ items }) => {
  return <div>{items.map(item => <div key={item}>{item}</div>)}</div>;
});

// useCallback - stable function references
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);`}
        </CodeBlock>
      </div>
    </div>
  );
};

export default AdvancedReact;