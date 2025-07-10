import React, { useState } from 'react';
import { Wind, Server, Package, CheckCircle, XCircle, HardDrive } from 'lucide-react';
import Card from '../../ui/Card/Card';
import CodeBlock from '../../ui/CodeBlock/CodeBlock';
import Button from '../../ui/Button/Button';
import { theme } from '../../../theme';

const ProjectArchitecture = () => {
  const [selectedTool, setSelectedTool] = useState('vite');

  const buildTools = {
    vite: {
      icon: <Wind size={24} style={{ color: theme.colors.accent.purple }} />,
      title: 'Vite',
      subtitle: 'Lightning Fast Build Tool',
      description: 'Next-generation frontend tooling with instant server start and lightning-fast HMR.',
      features: [
        'Native ES modules in development',
        'Lightning-fast Hot Module Replacement',
        'Optimized production builds with Rollup',
        'Built-in TypeScript support',
        'Plugin ecosystem (Vue, React, Svelte)'
      ],
      codeExample: `// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild'
  },
  server: {
    port: 3000,
    hot: true
  }
})`,
      metrics: {
        devStart: '⚡ 300ms',
        hmr: '⚡ 50ms',
        buildTime: '🚀 30s'
      }
    },
    nextjs: {
      icon: <Server size={24} style={{ color: theme.colors.text.primary }} />,
      title: 'Next.js',
      subtitle: 'Full-Stack React Framework',
      description: 'Production-ready framework with SSR, SSG, API routes, and automatic optimizations.',
      features: [
        'Server-Side Rendering (SSR)',
        'Static Site Generation (SSG)',
        'API routes and serverless functions',
        'Automatic code splitting',
        'Built-in image optimization'
      ],
      codeExample: `// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] })
  }
}

// pages/index.js
export async function getStaticProps() {
  const data = await fetchData();
  return { 
    props: { data },
    revalidate: 60 // ISR
  }
}`,
      metrics: {
        seo: '🎯 Perfect',
        performance: '🚀 Optimized',
        deployment: '☁️ Vercel'
      }
    },
    webpack: {
      icon: <Package size={24} style={{ color: theme.colors.accent.blue }} />,
      title: 'Webpack',
      subtitle: 'Battle-Tested Bundler',
      description: 'Highly configurable module bundler that powers many popular frameworks.',
      features: [
        'Advanced code splitting strategies',
        'Extensive plugin ecosystem',
        'Tree shaking and optimization',
        'Asset management and loaders',
        'Development and production modes'
      ],
      codeExample: `// webpack.config.js
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}`,
      metrics: {
        flexibility: '🔧 Maximum',
        ecosystem: '📦 Huge',
        complexity: '⚠️ High'
      }
    }
  };

  const packageManagers = [
    {
      name: 'NPM',
      icon: <Package style={{ color: theme.colors.status.error }} />,
      description: 'The original and most widely adopted',
      performance: { speed: 60, diskUsage: 30, reliability: 90 },
      features: ['Workspaces', 'Package-lock', 'Scripts', 'Audit'],
      pros: ['Ubiquitous', 'Reliable', 'Great docs'],
      cons: ['Slower installs', 'Disk space heavy']
    },
    {
      name: 'Yarn',
      icon: <Package style={{ color: theme.colors.accent.blue }} />,
      description: 'Enhanced performance and developer experience',
      performance: { speed: 85, diskUsage: 60, reliability: 95 },
      features: ['Zero-installs', 'Plug\'n\'Play', 'Berry', 'Workspaces'],
      pros: ['Fast installs', 'Advanced features', 'Great caching'],
      cons: ['Learning curve', 'Node_modules complexity']
    },
    {
      name: 'PNPM',
      icon: <HardDrive style={{ color: theme.colors.secondary }} />,
      description: 'Efficient disk usage with content-addressable storage',
      performance: { speed: 95, diskUsage: 95, reliability: 90 },
      features: ['Symlinks', 'Global store', 'Strict deps', 'Monorepos'],
      pros: ['Minimal disk usage', 'Very fast', 'Strict isolation'],
      cons: ['Symlink compatibility', 'Smaller ecosystem']
    }
  ];

  const sectionStyles = {
    padding: `${theme.spacing['4xl']} 0`,
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyles = {
    marginBottom: theme.spacing['3xl']
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text.primary
  };

  const descriptionStyles = {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.secondary,
    maxWidth: '900px',
    lineHeight: theme.typography.lineHeight.relaxed
  };

  return (
    <div style={sectionStyles}>
      {/* Build Tools Section */}
      <div style={headerStyles}>
        <h3 style={titleStyles}>Build Tools & Frameworks</h3>
        <p style={descriptionStyles}>
          The foundation of any modern web application starts with choosing the right build tool. 
          Each option represents different philosophies and trade-offs.
        </p>
      </div>

      {/* Tool selector */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: theme.spacing.lg,
        marginBottom: theme.spacing['2xl']
      }}>
        {Object.entries(buildTools).map(([key, tool]) => (
          <div
            key={key}
            onClick={() => setSelectedTool(key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.md,
              padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
              borderRadius: theme.borderRadius['2xl'],
              fontWeight: theme.typography.fontWeight.semibold,
              transition: 'all 0.3s ease',
              backgroundColor: selectedTool === key ? theme.colors.background.primary : theme.colors.background.secondary,
              border: selectedTool === key ? `2px solid ${theme.colors.primary}` : `2px solid ${theme.colors.border.light}`,
              transform: selectedTool === key ? 'scale(1.02)' : 'scale(1)',
              boxShadow: selectedTool === key ? theme.shadows.lg : theme.shadows.sm,
              cursor: 'pointer'
            }}
          >
            {tool.icon}
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text.primary
              }}>
                {tool.title}
              </div>
              <div style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary
              }}>
                {tool.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tool details */}
      <Card variant="elevated">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: theme.spacing['2xl']
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.lg,
              marginBottom: theme.spacing.xl
            }}>
              {buildTools[selectedTool].icon}
              <div>
                <h4 style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text.primary
                }}>
                  {buildTools[selectedTool].title}
                </h4>
                <p style={{
                  color: theme.colors.text.secondary
                }}>
                  {buildTools[selectedTool].subtitle}
                </p>
              </div>
            </div>

            <p style={{
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.xl,
              fontSize: theme.typography.fontSize.lg,
              lineHeight: theme.typography.lineHeight.relaxed
            }}>
              {buildTools[selectedTool].description}
            </p>

            <div style={{ marginBottom: theme.spacing.xl }}>
              <h5 style={{
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.md
              }}>
                Key Features:
              </h5>
              {buildTools[selectedTool].features.map((feature, index) => (
                <div 
                  key={feature}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.md,
                    padding: theme.spacing.md,
                    backgroundColor: theme.colors.background.secondary,
                    borderRadius: theme.borderRadius.lg,
                    marginBottom: theme.spacing.sm
                  }}
                >
                  <CheckCircle size={16} style={{ color: theme.colors.status.success }} />
                  <span style={{
                    color: theme.colors.text.primary,
                    fontSize: theme.typography.fontSize.sm
                  }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: theme.spacing.lg
            }}>
              {Object.entries(buildTools[selectedTool].metrics).map(([key, value]) => (
                <div key={key} style={{
                  textAlign: 'center',
                  padding: theme.spacing.md,
                  backgroundColor: theme.colors.background.secondary,
                  borderRadius: theme.borderRadius.lg
                }}>
                  <div style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.primary
                  }}>
                    {value}
                  </div>
                  <div style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.text.secondary,
                    textTransform: 'capitalize'
                  }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <CodeBlock language="javascript">
              {buildTools[selectedTool].codeExample}
            </CodeBlock>
          </div>
        </div>
      </Card>

      {/* Package Managers */}
      <div style={{
        marginTop: theme.spacing['5xl']
      }}>
        <h3 style={titleStyles}>Package Manager Evolution</h3>
        <p style={{
          ...descriptionStyles,
          marginBottom: theme.spacing['2xl']
        }}>
          Package managers have evolved from simple dependency installers to sophisticated workspace and performance optimization tools.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: theme.spacing['2xl']
        }}>
          {packageManagers.map((pm) => (
            <Card 
              key={pm.name} 
              variant="elevated" 
              interactive
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.md,
                marginBottom: theme.spacing.lg
              }}>
                {pm.icon}
                <h4 style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text.primary
                }}>
                  {pm.name}
                </h4>
              </div>
              
              <p style={{
                color: theme.colors.text.secondary,
                marginBottom: theme.spacing.lg,
                fontSize: theme.typography.fontSize.base
              }}>
                {pm.description}
              </p>

              {/* Performance bars */}
              <div style={{
                marginBottom: theme.spacing.lg,
                flex: 1
              }}>
                {Object.entries(pm.performance).map(([metric, value]) => (
                  <div key={metric} style={{ marginBottom: theme.spacing.md }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: theme.typography.fontSize.sm,
                      marginBottom: theme.spacing.sm,
                      color: theme.colors.text.secondary
                    }}>
                      <span style={{ textTransform: 'capitalize' }}>
                        {metric.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span>{value}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: theme.colors.background.tertiary,
                      borderRadius: theme.borderRadius.full,
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${value}%`,
                        background: `linear-gradient(90deg, ${theme.colors.status.success}, ${theme.colors.accent.blue})`,
                        borderRadius: theme.borderRadius.full,
                        transition: 'width 1s ease-out'
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div style={{ marginBottom: theme.spacing.lg }}>
                <h5 style={{
                  fontWeight: theme.typography.fontWeight.semibold,
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.text.secondary,
                  marginBottom: theme.spacing.sm
                }}>
                  Key Features:
                </h5>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: theme.spacing.sm
                }}>
                  {pm.features.map((feature) => (
                    <span 
                      key={feature} 
                      style={{
                        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                        backgroundColor: theme.colors.background.secondary,
                        borderRadius: theme.borderRadius.md,
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.text.secondary
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pros/Cons */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: theme.spacing.sm
              }}>
                {pm.pros.map((pro) => (
                  <div key={pro} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    fontSize: theme.typography.fontSize.sm
                  }}>
                    <CheckCircle size={14} style={{ color: theme.colors.status.success }} />
                    <span style={{ color: theme.colors.status.success }}>{pro}</span>
                  </div>
                ))}
                {pm.cons.map((con) => (
                  <div key={con} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    fontSize: theme.typography.fontSize.sm
                  }}>
                    <XCircle size={14} style={{ color: theme.colors.status.error }} />
                    <span style={{ color: theme.colors.status.error }}>{con}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectArchitecture;