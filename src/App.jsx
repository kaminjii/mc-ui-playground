import React, { useState, useEffect } from 'react';
import { 
  Rocket, Code, Globe, GitBranchPlus, Palette, 
  Grid, HardDrive, Layers 
} from 'lucide-react';

// Layout Components
import Header from './components/layout/Header/Header';
import Hero from './components/layout/Hero/Hero';
import Footer from './components/layout/Footer/Footer';

// Section Components
import ReactEvolution from './components/sections/ReactEvolution/ReactEvolution';
import SPAvsMPA from './components/sections/SPAvsMPA/SPAvsMPA';
import ProjectArchitecture from './components/sections/ProjectArchitecture/ProjectArchitecture';
import DesignSystems from './components/sections/DesignSystems/DesignSystems';
import LayoutTechniques from './components/sections/LayoutTechniques/LayoutTechniques';
// import ComponentLibrary from './components/sections/ComponentLibrary/ComponentLibrary';
import AdvancedReact from './components/sections/AdvancedReact/AdvancedReact';

// Theme
import { theme } from './theme';

function App() {
  const [currentSection, setCurrentSection] = useState('react-evolution');

  const sections = {
    'react-evolution': { 
      title: 'React Evolution', 
      component: <ReactEvolution />, 
      icon: <Rocket />, 
      dark: false 
    },
    'spa-vs-mpa': { 
      title: 'SPA vs MPA', 
      component: <SPAvsMPA />, 
      icon: <Globe />, 
      dark: false 
    },
    'project-architecture': { 
      title: 'Project Architecture', 
      component: <ProjectArchitecture />, 
      icon: <GitBranchPlus />, 
      dark: false 
    },
    'design-systems': { 
      title: 'Design Systems', 
      component: <DesignSystems />, 
      icon: <Palette />, 
      dark: false 
    },
    'layout-techniques': { 
      title: 'Layout Techniques', 
      component: <LayoutTechniques />, 
      icon: <Grid />, 
      dark: false 
    },
    // 'component-library': { 
    //   title: 'Component Library', 
    //   component: <ComponentLibrary />, 
    //   icon: <HardDrive />, 
    //   dark: false 
    // },
    'advanced-react': { 
      title: 'Advanced React', 
      component: <AdvancedReact />, 
      icon: <Layers />, 
      dark: false 
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.keys(sections).forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const appStyles = {
    backgroundColor: theme.colors.background.primary,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.primary,
    minHeight: '100vh'
  };

  const sectionStyles = (index, dark) => ({
    padding: `${theme.spacing['4xl']} ${theme.spacing.lg}`,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: dark 
      ? theme.colors.background.dark 
      : (index % 2 === 1 ? theme.colors.background.primary : theme.colors.background.secondary),
    color: dark ? theme.colors.text.inverse : theme.colors.text.primary
  });

  const containerStyles = {
    maxWidth: '1280px',
    margin: '0 auto',
    width: '100%'
  };

  const sectionHeaderStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing['3xl']
  };

  const iconContainerStyles = (dark) => ({
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius['2xl'],
    backgroundColor: dark ? 'rgba(255,255,255,0.1)' : theme.colors.background.primary,
    boxShadow: theme.shadows.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  const sectionTitleStyles = {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.lineHeight.tight,
    fontFamily: theme.typography.fontFamily.secondary
  };

  return (
    <div style={appStyles}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        html {
          scroll-behavior: smooth;
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      
      <Hero />
      
      <Header 
        sections={sections}
        currentSection={currentSection}
        onSectionClick={scrollToSection}
      />

      <main>
        {Object.entries(sections).map(([key, { title, component, icon, dark }], index) => (
          <section 
            key={key} 
            id={key} 
            style={sectionStyles(index, dark)}
          >
            <div style={containerStyles}>
              <div style={sectionHeaderStyles}>
                <div style={iconContainerStyles(dark)}>
                  <span style={{ color: theme.colors.primary }}>
                    {React.cloneElement(icon, { strokeWidth: 2.5, size: 32 })}
                  </span>
                </div>
                <h2 style={sectionTitleStyles}>{title}</h2>
              </div>
              <div style={{ marginLeft: 'clamp(0px, 5vw, 80px)' }}>
                {component}
              </div>
            </div>
          </section>
        ))}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
