// src/components/sections/ImageVsSvg/ImageVsSvg.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { theme } from "../../../theme";
import Card from "../../ui/Card/Card";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { MousePointerClick, Code, Accessibility } from "lucide-react";
import MastercardLogoSvg from "./mastercard-logo.svg?react";
import mastercardLogoPng from "../../../assets/mastercard-logo.png";

const ImageVsSvg = () => {
  const [zoom, setZoom] = useState(1);

  const sectionStyles = {
    padding: `${theme.spacing["3xl"]} 0`,
    backgroundColor: theme.colors.background.secondary,
  };
  const containerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: `0 ${theme.spacing.xl}`,
  };
  const headerStyles = {
    textAlign: "center",
    marginBottom: theme.spacing["3xl"],
  };
  const titleStyles = {
    fontSize: theme.typography.fontSize["4xl"],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.md,
  };
  const subtitleStyles = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    maxWidth: "750px",
    margin: "0 auto",
    lineHeight: 1.6,
  };
  const comparisonGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing.xl,
    alignItems: "center",
    marginBottom: theme.spacing["3xl"],
  };
  const imageContainerStyles = {
    width: "100%",
    height: "300px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    position: "relative",
    border: `1px solid ${theme.colors.border.light}`,
  };
  const imageStyles = {
    width: `${100 * zoom}%`,
    height: `${100 * zoom}%`,
    transition: "width 0.3s ease, height 0.3s ease",
    imageRendering: "pixelated",
  };
  const svgStyles = {
    width: `${100 * zoom}%`,
    height: `${100 * zoom}%`,
    transition: "width 0.3s ease, height 0.3s ease",
  };
  const controlsStyles = {
    gridColumn: "1 / -1",
    textAlign: "center",
    marginTop: theme.spacing.xl,
  };

  const codeCardStyles = {
    padding: 0,
    overflow: "hidden",
    backgroundColor: "rgb(40, 44, 52)",
    height: "100%",
  };

  const syntaxHighlighterStyle = {
    ...atomOneDark,
    hljs: {
      ...atomOneDark.hljs,
      background: "transparent",
      padding: theme.spacing.lg,
      fontSize: theme.typography.fontSize.sm,
      lineHeight: "1.7",
      height: "100%",
    },
  };

  const svgCodeExample = `<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24"
>
  <title>Close Icon</title>
  <path d="m12 10.586 4.95-4.95 1.414 1.414-4.95 4.95..." />
</svg>`;

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>Image vs. SVG</h2>
          <p style={subtitleStyles}>
            A demonstration of resolution independence. Raster images (PNG, JPG)
            are made of pixels and lose quality when scaled. Vector images (SVG)
            are defined by math and remain crisp at any size.
          </p>
        </header>

        <div style={comparisonGrid}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: theme.spacing.md,
                fontWeight: theme.typography.fontWeight.semibold,
              }}
            >
              PNG (Raster)
            </h3>
            <Card
              style={{ padding: theme.spacing.md, margin: theme.spacing.md }}
            >
              <div style={imageContainerStyles}>
                <img
                  src={mastercardLogoPng}
                  alt="Mastercard Logo PNG"
                  style={imageStyles}
                />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: theme.spacing.md,
                fontWeight: theme.typography.fontWeight.semibold,
              }}
            >
              SVG (Vector)
            </h3>
            <Card
              style={{ padding: theme.spacing.md, margin: theme.spacing.md }}
            >
              <div style={imageContainerStyles}>
                <MastercardLogoSvg style={svgStyles} />
              </div>
            </Card>
          </motion.div>

          <div style={controlsStyles}>
            <label
              htmlFor="zoom-slider"
              style={{
                display: "block",
                marginBottom: theme.spacing.md,
                color: theme.colors.text.secondary,
              }}
            >
              Zoom Level: {Math.round(zoom * 100)}%
            </label>
            <input
              id="zoom-slider"
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </div>
        </div>

        <div
          style={{ textAlign: "center", marginBottom: theme.spacing["2xl"] }}
        >
          <h3
            style={{
              fontSize: theme.typography.fontSize["2xl"],
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            How to Use MADE Icons
          </h3>
          <p style={{ ...subtitleStyles, maxWidth: "800px" }}>
            The simplest way to use icons from the MADE library is to copy their
            SVG markup directly and treat them as inline components.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: theme.spacing.xl,
            alignItems: "stretch",
          }}
        >
          <Card
            interactive
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h4
              style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.bold,
                marginBottom: theme.spacing.lg,
              }}
            >
              The Workflow
            </h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: theme.spacing.lg,
              }}
            >
              <MousePointerClick
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: theme.spacing.md, flexShrink: 0 }}
              />
              <p>
                Navigate to the MADE icon library and find your desired icon.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: theme.spacing.lg,
              }}
            >
              <Code
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: theme.spacing.md, flexShrink: 0 }}
              />
              <p>
                Right-click the icon, choose "Inspect," then copy the entire
                `&lt;svg&gt;` element.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Accessibility
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: theme.spacing.md, flexShrink: 0 }}
              />
              <p>
                Paste the SVG into your JSX. Add a `&lt;title&gt;` tag inside
                the SVG to describe it for screen readers.
              </p>
            </div>
          </Card>
          <Card style={codeCardStyles}>
            <SyntaxHighlighter language="jsx" style={syntaxHighlighterStyle}>
              {svgCodeExample}
            </SyntaxHighlighter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ImageVsSvg;
