import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Star } from 'lucide-react';
import Card from '../../ui/Card/Card';
import CodeBlock from '../../ui/CodeBlock/CodeBlock';
import Button from '../../ui/Button/Button';
import { theme } from '../../../theme';

const ReactEvolution = () => {
  const [selectedEra, setSelectedEra] = useState('modern');
  
  const eras = {
    early: {
      title: 'Early React (2013-2016)',
      description: 'Class components, manual state management, and the birth of the virtual DOM revolution.',
      features: ['Class Components', 'componentDidMount', 'setState()', 'Mixins', 'React.createClass'],
      code: `class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
  }
  
  componentDidMount() {
    // Lifecycle methods everywhere!
    this.fetchTodos();
  }
  
  render() {
    return <div>{/* JSX was revolutionary */}</div>;
  }
}`
    },
    hooks: {
      title: 'Hooks Era (2018-2020)',
      description: 'React Hooks changed everything - functional components could finally manage state and side effects.',
      features: ['useState', 'useEffect', 'useContext', 'Custom Hooks', 'Functional Components'],
      code: `function TodoApp() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  
  useEffect(() => {
    fetchTodos().then(setItems);
  }, []);
  
  return <div>{/* Much cleaner! */}</div>;
}`
    },
    modern: {
      title: 'Modern React (2021+)',
      description: 'Concurrent features, Suspense, Server Components, and the future of React development.',
      features: ['Concurrent Mode', 'Suspense', 'Server Components', 'Automatic Batching', 'useTransition'],
      code: `function TodoApp() {
  const [isPending, startTransition] = useTransition();
  const todos = useSuspense(fetchTodos);
  
  const updateSearch = (query) => {
    startTransition(() => {
      // Non-urgent updates
      setSearchQuery(query);
    });
  };
  
  return <Suspense fallback={<Loading />}>
    <TodoList todos={todos} />
  </Suspense>;
}`
    }
  };

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
    background: `linear-gradient(135deg, ${theme.colors.accent.blue}, ${theme.colors.accent.purple})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
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
    marginBottom: theme.spacing['3xl']
  };

  const selectorContainerStyles = {
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius['2xl'],
    display: 'flex',
    gap: theme.spacing.sm
  };

  const contentGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: theme.spacing['2xl'],
    marginBottom: theme.spacing['3xl']
  };

  const prosConsGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: theme.spacing['2xl']
  };

  return (
    <div style={sectionStyles}>
      <div style={headerStyles}>
        <h3 style={titleStyles}>The Evolution of React</h3>
        <p style={descriptionStyles}>
          From revolutionary virtual DOM to concurrent features, React has continuously evolved to solve real-world development challenges.
        </p>
      </div>

      {/* Era selector */}
      <div style={selectorStyles}>
        <div style={selectorContainerStyles}>
          {Object.entries(eras).map(([key, era]) => (
            <Button
              key={key}
              variant={selectedEra === key ? 'primary' : 'ghost'}
              size="md"
              onClick={() => setSelectedEra(key)}
            >
              {era.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Era content */}
      <Card variant="elevated">
        <div style={contentGridStyles}>
          <div>
            <h4 style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing.lg,
              color: theme.colors.text.primary
            }}>
              {eras[selectedEra].title}
            </h4>
            <p style={{
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.xl,
              fontSize: theme.typography.fontSize.lg,
              lineHeight: theme.typography.lineHeight.relaxed
            }}>
              {eras[selectedEra].description}
            </p>
            
            <div>
              <h5 style={{
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg
              }}>
                Key Features:
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
                {eras[selectedEra].features.map((feature, index) => (
                  <div 
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing.md,
                      padding: theme.spacing.md,
                      backgroundColor: theme.colors.background.secondary,
                      borderRadius: theme.borderRadius.lg,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <CheckCircle size={20} style={{ color: theme.colors.status.success }} />
                    <span style={{ fontFamily: theme.typography.fontFamily.mono, fontSize: theme.typography.fontSize.sm }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <CodeBlock language="javascript">
              {eras[selectedEra].code}
            </CodeBlock>
          </div>
        </div>
      </Card>

      {/* React Pros and Cons */}
      <div style={prosConsGridStyles}>
        <Card 
          style={{
            background: `linear-gradient(135deg, ${theme.colors.status.success}10, ${theme.colors.status.success}05)`,
            border: `1px solid ${theme.colors.status.success}30`
          }}
        >
          <h4 style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.status.success,
            marginBottom: theme.spacing.xl,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.md
          }}>
            <CheckCircle size={28} />
            Why Developers Love React
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
            {[
              'Component-based architecture promotes reusability',
              'Virtual DOM enables predictable performance',
              'Massive ecosystem and community support',
              'Excellent developer tools and debugging',
              'Declarative programming model',
              'Strong backing from Meta (Facebook)'
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: theme.spacing.md }}>
                <Star size={16} style={{ color: theme.colors.status.success, marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: theme.colors.status.success, fontWeight: theme.typography.fontWeight.medium }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card 
          style={{
            background: `linear-gradient(135deg, ${theme.colors.status.error}10, ${theme.colors.status.error}05)`,
            border: `1px solid ${theme.colors.status.error}30`
          }}
        >
          <h4 style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.status.error,
            marginBottom: theme.spacing.xl,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.md
          }}>
            <AlertTriangle size={28} />
            Common Developer Concerns
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
            {[
              'Steep learning curve for complex concepts',
              'Rapid ecosystem changes and deprecations',
              'Bundle size concerns with large applications',
              'Over-engineering simple projects',
              'JSX syntax barrier for some developers',
              'State management complexity at scale'
            ].map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: theme.spacing.md }}>
                <XCircle size={16} style={{ color: theme.colors.status.error, marginTop: '2px', flexShrink: 0 }} />
                <span style={{ color: theme.colors.status.error, fontWeight: theme.typography.fontWeight.medium }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReactEvolution;