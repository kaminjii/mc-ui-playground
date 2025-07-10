import React, { useState } from 'react';
import { Globe, Server, CheckCircle, XCircle, AlertTriangle, Star, Play, Loader2 } from 'lucide-react';
import Card from '../../ui/Card/Card';
import Button from '../../ui/Button/Button';
import { theme } from '../../../theme';

const SPAvsMPA = () => {
  const [activeTab, setActiveTab] = useState('spa');
  
  const architectures = {
    spa: {
      title: 'Single Page Application (SPA)',
      description: 'Load once, navigate forever. SPAs load a single HTML page and dynamically update content.',
      icon: <Globe size={20} />,
      examples: ['Gmail', 'Twitter', 'Figma', 'Notion'],
      flow: [
        { step: 'Initial Load', description: 'Download entire JavaScript bundle', time: '2-4s', color: theme.colors.status.warning },
        { step: 'Navigation', description: 'Client-side routing (instant)', time: '0ms', color: theme.colors.status.success },
        { step: 'Data Fetch', description: 'API calls for new content', time: '100-500ms', color: theme.colors.accent.blue },
        { step: 'Render', description: 'Update DOM with new content', time: '10-50ms', color: theme.colors.accent.purple }
      ],
      pros: [
        'Instant navigation after initial load',
        'Rich, app-like user experience',
        'Efficient caching strategies',
        'Reduced server load',
        'Offline capabilities possible'
      ],
      cons: [
        'Large initial bundle size',
        'SEO challenges without SSR',
        'Slower time to first meaningful paint',
        'Complex state management',
        'Browser history management complexity'
      ]
    },
    mpa: {
      title: 'Multi Page Application (MPA)',
      description: 'Traditional approach where each route loads a complete new page from the server.',
      icon: <Server size={20} />,
      examples: ['Wikipedia', 'GitHub', 'Most e-commerce sites', 'News websites'],
      flow: [
        { step: 'Request', description: 'Browser requests new page', time: '50-200ms', color: theme.colors.accent.blue },
        { step: 'Server Process', description: 'Server renders HTML', time: '100-800ms', color: theme.colors.status.warning },
        { step: 'Download', description: 'Full page download', time: '500-2000ms', color: theme.colors.status.error },
        { step: 'Parse & Render', description: 'Browser renders page', time: '100-300ms', color: theme.colors.accent.purple }
      ],
      pros: [
        'Excellent SEO out of the box',
        'Fast initial page load',
        'Simple browser caching',
        'Better for content-heavy sites',
        'Easier to implement analytics'
      ],
      cons: [
        'Full page reloads on navigation',
        'Repetitive UI downloads',
        'Less interactive user experience',
        'Higher server load',
        'Harder to implement offline features'
      ]
    }
  };

  const RouteVisualization = ({ type }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const steps = architectures[type].flow;
    
    const runAnimation = () => {
      setIsAnimating(true);
      setCurrentStep(0);
      
      steps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index + 1);
        }, index * 800);
      });
      
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentStep(0);
      }, steps.length * 800 + 1000);
    };

    return (
      <div style={{
        backgroundColor: theme.colors.background.secondary,
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.xl
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.lg
        }}>
          <h5 style={{
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary
          }}>
            Navigation Flow
          </h5>
          <Button
            variant="ghost"
            size="sm"
            onClick={runAnimation}
            disabled={isAnimating}
          >
            {isAnimating ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            {isAnimating ? 'Running...' : 'Run Demo'}
          </Button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          {steps.map((step, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.lg,
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                transition: 'all 0.5s ease',
                backgroundColor: currentStep > index ? theme.colors.background.primary : theme.colors.background.tertiary,
                transform: currentStep > index ? 'scale(1.02)' : 'scale(1)',
                boxShadow: currentStep > index ? theme.shadows.md : 'none'
              }}
            >
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                backgroundColor: currentStep > index ? step.color : theme.colors.border.medium
              }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: theme.typography.fontWeight.medium,
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.primary
                }}>
                  {step.step}
                </div>
                <div style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.text.secondary
                }}>
                  {step.description}
                </div>
              </div>
              <div style={{
                fontSize: theme.typography.fontSize.sm,
                fontFamily: theme.typography.fontFamily.mono,
                padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                borderRadius: theme.borderRadius.md,
                backgroundColor: currentStep > index ? `${step.color}20` : theme.colors.background.secondary,
                color: currentStep > index ? step.color : theme.colors.text.tertiary
              }}>
                {step.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
    background: `linear-gradient(135deg, ${theme.colors.status.success}, ${theme.colors.accent.blue})`,
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

  return (
    <div style={sectionStyles}>
      <div style={headerStyles}>
        <h3 style={titleStyles}>SPA vs MPA Architecture</h3>
        <p style={descriptionStyles}>
          Two fundamentally different approaches to web application architecture, each with distinct trade-offs.
        </p>
      </div>

      {/* Architecture selector */}
      <div style={selectorStyles}>
        <div style={selectorContainerStyles}>
          {Object.entries(architectures).map(([key, arch]) => (
            <Button
              key={key}
              variant={activeTab === key ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.md
              }}
            >
              {arch.icon}
              <span>{arch.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Architecture details */}
      <Card variant="elevated">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: theme.spacing['2xl'],
          marginBottom: theme.spacing['3xl']
        }}>
          <div>
            <h4 style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing.lg,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md,
              color: theme.colors.text.primary
            }}>
              {architectures[activeTab].icon}
              {architectures[activeTab].title}
            </h4>
            <p style={{
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.xl,
              fontSize: theme.typography.fontSize.lg,
              lineHeight: theme.typography.lineHeight.relaxed
            }}>
              {architectures[activeTab].description}
            </p>
            
            <div style={{ marginBottom: theme.spacing.xl }}>
              <h5 style={{
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.md
              }}>
                Popular Examples:
              </h5>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: theme.spacing.sm
              }}>
                {architectures[activeTab].examples.map((example, index) => (
                  <span 
                    key={example}
                    style={{
                      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
                      backgroundColor: theme.colors.background.secondary,
                      borderRadius: theme.borderRadius.full,
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.text.secondary
                    }}
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <RouteVisualization type={activeTab} />
        </div>

        {/* Pros and Cons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: theme.spacing['2xl']
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
            <h5 style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.status.success,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm
            }}>
              <CheckCircle size={24} />
              Advantages
            </h5>
            {architectures[activeTab].pros.map((pro, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.md,
                  padding: theme.spacing.md,
                  backgroundColor: theme.colors.status.success + '10',
                  borderRadius: theme.borderRadius.lg,
                  border: `1px solid ${theme.colors.status.success}20`
                }}
              >
                <Star size={16} style={{ color: theme.colors.status.success }} />
                <span style={{ color: theme.colors.status.success, fontWeight: theme.typography.fontWeight.medium }}>
                  {pro}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
            <h5 style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.status.error,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm
            }}>
              <XCircle size={24} />
              Challenges
            </h5>
            {architectures[activeTab].cons.map((con, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.md,
                  padding: theme.spacing.md,
                  backgroundColor: theme.colors.status.error + '10',
                  borderRadius: theme.borderRadius.lg,
                  border: `1px solid ${theme.colors.status.error}20`
                }}
              >
                <AlertTriangle size={16} style={{ color: theme.colors.status.error }} />
                <span style={{ color: theme.colors.status.error, fontWeight: theme.typography.fontWeight.medium }}>
                  {con}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SPAvsMPA;