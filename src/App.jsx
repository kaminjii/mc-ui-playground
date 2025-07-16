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

  const mainContentStyles = {
    display: "grid",
    gridTemplateColumns: `minmax(${theme.grid.margins}, 1fr) repeat(${
      theme.grid.columns
    }, minmax(0, calc((${theme.grid.container} - (${
      theme.grid.margins
    } * 2) - (${theme.grid.gutters} * ${theme.grid.columns - 1})) / ${
      theme.grid.columns
    }))) minmax(${theme.grid.margins}, 1fr)`,
    gridColumnGap: theme.grid.gutters,
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={appContainerStyles}>
        <Hero />
        <main style={mainContentStyles}>
          {/* All sections are now children of main and will flow correctly */}
          <AnimatedSection fullWidth>
            <ReactEvolution />
          </AnimatedSection>
          <AnimatedSection fullWidth>
            <PackageManagerComparison />
            <BuildTools />
          </AnimatedSection>
          <AnimatedSection fullWidth>
            <ClassVsFunctional />
          </AnimatedSection>
          <AnimatedSection fullWidth>
            <DesignSystems />
          </AnimatedSection>
          <AnimatedSection fullWidth>
            <TokenExplorer />
          </AnimatedSection>
          <AnimatedSection fullWidth>
            <ImageVsSvg />
          </AnimatedSection>
          <AnimatedSection fullWidth>
            <SpacingPlayground />
          </AnimatedSection>
          <AnimatedSection fullWidth>
            <FlexboxPlayground />
          </AnimatedSection>
          <AnimatedSection fullWidth>
            <PropDrilling />
          </AnimatedSection>
          <AnimatedSection fullWidth>
            <AdvancedReact />
          </AnimatedSection>
        </main>
      </div>
    </div>
  );
}

export default App;
