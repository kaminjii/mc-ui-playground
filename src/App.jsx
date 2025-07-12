// src/App.jsx
import React from "react";
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
import PresentationFlow from "./components/sections/ColorTokens/ColorTokens";
import ClassVsFunctional from "./components/sections/ClassVsFunctional/ClassVsFunctional";
import BuildTools from "./components/sections/BuildTools/BuildTools";

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
          <ReactEvolution />
          {/* --- NEW AND IMPROVED SECTIONS --- */}
          <FlexboxPlayground />
          <PresentationFlow />
          <SpacingPlayground />
          {/* --- END NEW SECTIONS --- */}
          <PropDrilling />
          <AdvancedReact />
          <ClassVsFunctional />
          <ImageVsSvg />
          <BuildTools />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
