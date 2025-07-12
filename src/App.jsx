// src/App.jsx
import React from "react";
import { motion } from "framer-motion";
import Header from "./components/layout/Header/Header";
import Hero from "./components/layout/Hero/Hero";
import ReactEvolution from "./components/sections/ReactEvolution/ReactEvolution";
import FlexboxPlayground from "./components/sections/FlexboxPlayground/FlexboxPlayground";
import SpacingPlayground from "./components/sections/SpacingPlayground/SpacingPlayground";
import PropDrilling from "./components/sections/PropDrilling/PropDrilling";
import AdvancedReact from "./components/sections/AdvancedReact/AdvancedReact";
import ImageVsSvg from "./components/sections/ImageVsSvg/ImageVsSvg";
import Footer from "./components/layout/Footer/Footer";
import { theme } from "./theme";
import TokenExplorer from "./components/sections/ColorTokens/ColorTokens";
import ClassVsFunctional from "./components/sections/ClassVsFunctional/ClassVsFunctional";
import BuildTools from "./components/sections/BuildTools/BuildTools";
import DesignSystems from "./components/sections/DesignSystems/DesignSystems";
import PackageManagerComparison from "./components/sections/PackageManagerComparison/PackageManagerComparison";

// Wrapper to add a consistent "fade-in-up" animation
const AnimatedSection = ({ children, fullWidth = false }) => (
  <motion.div
    style={{ gridColumn: fullWidth ? "1 / -1" : "auto" }}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  const appContainerStyles = {
    position: "relative",
    zIndex: 1,
    backgroundColor: theme.colors.background.primary,
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={appContainerStyles}>
        <Header />
        <main>
          <Hero />

          {/* Part 1: The "Why" - Evolution of Modern Frontend */}
          <AnimatedSection>
            <ReactEvolution />
          </AnimatedSection>
          <AnimatedSection>
            <PackageManagerComparison />
            <BuildTools />
          </AnimatedSection>
          <AnimatedSection>
            <ClassVsFunctional />
          </AnimatedSection>

          {/* Part 2: The "What" - Our Design System */}
          <AnimatedSection>
            <DesignSystems />
          </AnimatedSection>
          <AnimatedSection>
            <TokenExplorer />
          </AnimatedSection>
          <AnimatedSection>
            <ImageVsSvg />
          </AnimatedSection>

          {/* Part 3: The "How" - Interactive Demos */}
          <AnimatedSection>
            <SpacingPlayground />
          </AnimatedSection>
          <AnimatedSection>
            <FlexboxPlayground />
          </AnimatedSection>

          {/* Part 4: Advanced Concepts */}
          <AnimatedSection>
            <PropDrilling />
          </AnimatedSection>
          <AnimatedSection>
            <AdvancedReact />
          </AnimatedSection>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
