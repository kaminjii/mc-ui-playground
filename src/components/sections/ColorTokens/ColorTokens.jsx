// src/components/sections/ColorTokens/ColorTokens.jsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Copy, Check, Palette } from "lucide-react";
import { theme } from "../../../theme";
import Input from "../../ui/Input/Input";

const colorTokens = [
  {
    name: "--made-color-visualization-03",
    hex: "#cf008a",
    usage: "Data Visualization Color",
  },
  {
    name: "--made-color-visualization-02",
    hex: "#ac00cf",
    usage: "Data Visualization Color",
  },
  {
    name: "--made-color-visualization-01",
    hex: "#0023cf",
    usage: "Data Visualization Color",
  },
  {
    name: "--made-color-text-default-on-dark",
    hex: "#ffffff",
    usage: "Color of body text on dark background.",
  },
  {
    name: "--made-color-feedback-success",
    hex: "#038a00",
    usage: "Color for success or positive state",
  },
  {
    name: "--made-color-feedback-error",
    hex: "#ee0000",
    usage: "Color for error state",
  },
  { name: "--made-color-red-error-07", hex: "#330505", usage: "Red error 7" },
  { name: "--made-color-red-error-06", hex: "#710808", usage: "Red error 6" },
  { name: "--made-color-red-error-05", hex: "#b00606", usage: "Red error 5" },
  { name: "--made-color-red-error-04", hex: "#ee0000", usage: "Red error 4" },
  { name: "--made-color-red-error-03", hex: "#ff5656", usage: "Red error 3" },
  { name: "--made-color-red-error-02", hex: "#ff9898", usage: "Red error 2" },
  { name: "--made-color-red-error-01", hex: "#fadede", usage: "Error Red 1" },
  {
    name: "--made-color-green-success-07",
    hex: "#042604",
    usage: "Success Green 7",
  },
  {
    name: "--made-color-green-success-06",
    hex: "#0b560a",
    usage: "Success Green 6",
  },
  {
    name: "--made-color-green-success-05",
    hex: "#097007",
    usage: "Success Green 5",
  },
  {
    name: "--made-color-green-success-04",
    hex: "#038a00",
    usage: "Success Green 4",
  },
  {
    name: "--made-color-green-success-03",
    hex: "#35b132",
    usage: "Success Green 3",
  },
  {
    name: "--made-color-green-success-02",
    hex: "#7cd87a",
    usage: "Success Green 2",
  },
  {
    name: "--made-color-green-success-01",
    hex: "#dff7df",
    usage: "Success Green 1",
  },
  { name: "--made-color-yellow-07", hex: "#332805", usage: "Yellow color 7" },
  { name: "--made-color-yellow-06", hex: "#664f0c", usage: "Yellow color 6" },
  { name: "--made-color-yellow-05", hex: "#b28c16", usage: "Yellow color 5" },
  { name: "--made-color-yellow-04", hex: "#ffc61e", usage: "Yellow color 4" },
  { name: "--made-color-yellow-03", hex: "#ffd863", usage: "Yellow color 3" },
  { name: "--made-color-yellow-02", hex: "#ffe8a5", usage: "Yellow color 2" },
  { name: "--made-color-yellow-01", hex: "#fff4d1", usage: "Yellow color 1" },
  { name: "--made-color-white", hex: "#ffffff", usage: "White" },
  { name: "--made-color-teal-07", hex: "#1d2d27", usage: "Teal color 7" },
  { name: "--made-color-teal-06", hex: "#23473d", usage: "Teal color 6" },
  { name: "--made-color-teal-05", hex: "#266555", usage: "Teal color 5" },
  { name: "--made-color-teal-04", hex: "#25836d", usage: "Teal color 4" },
  { name: "--made-color-teal-03", hex: "#4bab94", usage: "Teal color 3" },
  { name: "--made-color-teal-02", hex: "#88d3bf", usage: "Teal color 2" },
  { name: "--made-color-teal-01", hex: "#dcf5ef", usage: "Teal color 1" },
  { name: "--made-color-red-07", hex: "#541113", usage: "Red color 7" },
  { name: "--made-color-red-06", hex: "#7e191c", usage: "Red color 6" },
  { name: "--made-color-red-05", hex: "#a82226", usage: "Red color 5" },
  { name: "--made-color-red-04", hex: "#d7373c", usage: "Red color 4" },
  { name: "--made-color-red-03", hex: "#e66f65", usage: "Red color 3" },
  { name: "--made-color-red-02", hex: "#f4a79f", usage: "Red color 2" },
  { name: "--made-color-red-01", hex: "#f8ddde", usage: "Red color 1" },
  { name: "--made-color-orange-07", hex: "#331505", usage: "Orange color 7" },
  { name: "--made-color-orange-06", hex: "#662808", usage: "Orange color 6" },
  { name: "--made-color-orange-05", hex: "#9a3a0a", usage: "Orange color 5" },
  { name: "--made-color-orange-04", hex: "#cf4500", usage: "Orange color 4" },
  { name: "--made-color-orange-03", hex: "#f37338", usage: "Orange color 3" },
  { name: "--made-color-orange-02", hex: "#ffab82", usage: "Orange color 2" },
  { name: "--made-color-orange-01", hex: "#ffe1d1", usage: "Orange color 1" },
  { name: "--made-color-green-07", hex: "#1c2509", usage: "Green color 7" },
  { name: "--made-color-green-06", hex: "#324113", usage: "Green color 6" },
  { name: "--made-color-green-05", hex: "#496019", usage: "Green color 5" },
  { name: "--made-color-green-04", hex: "#628020", usage: "Green color 4" },
  { name: "--made-color-green-03", hex: "#87a740", usage: "Green color 3" },
  { name: "--made-color-green-02", hex: "#b6cd7e", usage: "Green color 2" },
  { name: "--made-color-green-01", hex: "#e8f1d5", usage: "Green color 1" },
  {
    name: "--made-color-gray-07",
    hex: "#141413",
    usage: "Canvas color - Gray 7",
  },
  {
    name: "--made-color-gray-06-5",
    hex: "#222221",
    usage: "Gray tints and shades - Gray 6.5",
  },
  {
    name: "--made-color-gray-06",
    hex: "#323231",
    usage: "Canvas color - Gray 6",
  },
  {
    name: "--made-color-gray-05-5",
    hex: "#444340",
    usage: "Gray tints and shades - Gray 5.5",
  },
  {
    name: "--made-color-gray-05",
    hex: "#555250",
    usage: "Canvas color - Gray 5",
  },
  {
    name: "--made-color-gray-04-5",
    hex: "#676561",
    usage: "Gray tints and shades - Gray 4.5",
  },
  {
    name: "--made-color-gray-04",
    hex: "#777470",
    usage: "Gray tints and shades - Gray 4",
  },
  {
    name: "--made-color-gray-03-5",
    hex: "#96918b",
    usage: "Gray tints and shades - Gray 3.5",
  },
  {
    name: "--made-color-gray-03",
    hex: "#b1ada6",
    usage: "Gray tints and shades - Gray 3",
  },
  {
    name: "--made-color-gray-02-5",
    hex: "#d1cdc7",
    usage: "Canvas color - Gray 2.5",
  },
  {
    name: "--made-color-gray-02",
    hex: "#e8e5e1",
    usage: "Canvas color - Gray 2",
  },
  {
    name: "--made-color-gray-01-5",
    hex: "#f3f0ee",
    usage: "Canvas color - Gray 1.5",
  },
  {
    name: "--made-color-gray-01-25",
    hex: "#faf7f5",
    usage: "Canvas color - Gray 1.25",
  },
  {
    name: "--made-color-gray-01",
    hex: "#fcfbfa",
    usage: "Canvas color - Gray 1",
  },
  { name: "--made-color-gold-07", hex: "#301c00", usage: "Gold color 7" },
  { name: "--made-color-gold-06", hex: "#583300", usage: "Gold color 6" },
  { name: "--made-color-gold-05", hex: "#995600", usage: "Gold color 5" },
  { name: "--made-color-gold-04", hex: "#f38b00", usage: "Gold color 4" },
  { name: "--made-color-gold-03", hex: "#f7ad4c", usage: "Gold color 3" },
  { name: "--made-color-gold-02", hex: "#f9d199", usage: "Gold color 2" },
  { name: "--made-color-gold-01", hex: "#fce8cc", usage: "Gold color 1" },
  { name: "--made-color-accent-07", hex: "#d7373c", usage: "Accent color 7" },
  { name: "--made-color-accent-06", hex: "#25836d", usage: "Accent color 6" },
  { name: "--made-color-accent-05", hex: "#628020", usage: "Accent color 5" },
  { name: "--made-color-accent-04", hex: "#ffc61e", usage: "Accent color 4" },
  { name: "--made-color-accent-03", hex: "#f38b00", usage: "Accent color 3" },
  { name: "--made-color-accent-02", hex: "#f37338", usage: "Accent color 2" },
  {
    name: "--made-color-accent-01-light",
    hex: "#d0805b",
    usage: "Accent color 1- Light",
  },
  {
    name: "--made-color-accent-01-default",
    hex: "#cf4500",
    usage: "Accent color 1",
  },
  {
    name: "--made-color-accent-01-darker",
    hex: "#331505",
    usage: "Accent color 1 - Darker",
  },
  {
    name: "--made-color-accent-01-dark",
    hex: "#852d01",
    usage: "Accent color 1 - Dark",
  },
  {
    name: "--made-color-brand-on-secondary",
    hex: "#ffffff",
    usage: "The text color on your secondary brand color",
  },
  {
    name: "--made-color-brand-on-primary",
    hex: "#ffffff",
    usage: "The text color on your primary brand color",
  },
];

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      title={`Copy ${textToCopy}`}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "4px",
        display: "inline-flex",
        alignItems: "center",
        color: copied ? theme.colors.primary : theme.colors.text.secondary,
        transition: "color 0.2s",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "copy"}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

const TokenExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedToken, setSelectedToken] = useState(colorTokens[0]);

  const filteredTokens = useMemo(() => {
    if (!searchTerm) return colorTokens;
    const lowercasedFilter = searchTerm.toLowerCase();
    return colorTokens.filter(
      (token) =>
        token.name.toLowerCase().includes(lowercasedFilter) ||
        token.hex.toLowerCase().includes(lowercasedFilter) ||
        token.usage.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm]);

  const sectionStyles = {
    padding: `${theme.spacing["3xl"]} 0`,
    backgroundColor: theme.colors.background.secondary,
    minHeight: "80vh",
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
    maxWidth: "650px",
    margin: "0 auto",
    lineHeight: 1.6,
  };
  const explorerLayoutStyles = {
    display: "grid",
    gridTemplateColumns: "minmax(300px, 1fr) 2fr",
    gap: theme.spacing.xl,
    height: "600px",
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows.lg,
    overflow: "hidden",
  };
  const listPanelStyles = {
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${theme.colors.border.light}`,
    height: "100%", // Ensure the panel takes full height of grid cell
  };
  const searchBarStyles = {
    padding: theme.spacing.lg,
    borderBottom: `1px solid ${theme.colors.border.light}`,
    flexShrink: 0, // Prevent search bar from shrinking
  };
  const tokenListStyles = {
    flex: "1 1 0px", // FIX: Use explicit flex-basis of 0
    overflowY: "auto",
    padding: theme.spacing.md,
  };
  const tokenListItemStyles = (isSelected) => ({
    display: "flex",
    alignItems: "center",
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.borderRadius.md,
    cursor: "pointer",
    marginBottom: theme.spacing.xs,
    backgroundColor: isSelected
      ? theme.colors.background.secondary
      : "transparent",
    transition: "background-color 0.2s",
  });
  const previewPanelStyles = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  };
  const detailContentStyles = {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.primary,
    overflowY: "auto", // FIX: Allow details to scroll if content is too long
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>Token Explorer</h2>
          <p style={subtitleStyles}>
            An interactive library of all color tokens. Click a token to see
            details and copy values.
          </p>
        </header>

        <div style={explorerLayoutStyles}>
          <div style={listPanelStyles}>
            <div style={searchBarStyles}>
              <Input
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search size={18} />}
              />
            </div>
            <div style={tokenListStyles}>
              {filteredTokens.map((token) => (
                <motion.div
                  key={token.name}
                  style={tokenListItemStyles(
                    selectedToken && selectedToken.name === token.name
                  )}
                  onClick={() => setSelectedToken(token)}
                  whileHover={{
                    backgroundColor: theme.colors.background.secondary,
                  }}
                  layout
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: token.hex,
                      borderRadius: "50%",
                      marginRight: theme.spacing.md,
                      border: `1px solid ${theme.colors.border.medium}`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.text.primary,
                      flex: 1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {token.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={previewPanelStyles}>
            <AnimatePresence mode="wait">
              {selectedToken ? (
                <motion.div
                  key={selectedToken.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: selectedToken.hex,
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: theme.typography.fontFamily.mono,
                        fontSize: theme.typography.fontSize["4xl"],
                        color: "rgba(0,0,0,0.1)",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedToken.hex.toUpperCase()}
                    </span>
                  </div>
                  <div style={detailContentStyles}>
                    <p
                      style={{
                        fontSize: theme.typography.fontSize.lg,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing.lg,
                      }}
                    >
                      {selectedToken.usage}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: theme.spacing.md,
                        backgroundColor: theme.colors.background.secondary,
                        borderRadius: theme.borderRadius.md,
                        marginBottom: theme.spacing.sm,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: theme.typography.fontFamily.mono,
                          color: theme.colors.text.primary,
                        }}
                      >
                        {selectedToken.name}
                      </span>
                      <CopyButton textToCopy={selectedToken.name} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: theme.spacing.md,
                        backgroundColor: theme.colors.background.secondary,
                        borderRadius: theme.borderRadius.md,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: theme.typography.fontFamily.mono,
                          color: theme.colors.text.primary,
                        }}
                      >
                        {selectedToken.hex.toUpperCase()}
                      </span>
                      <CopyButton textToCopy={selectedToken.hex} />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    color: theme.colors.text.tertiary,
                    padding: theme.spacing.xl,
                  }}
                >
                  <Palette
                    size={48}
                    style={{ marginBottom: theme.spacing.lg }}
                  />
                  <h3
                    style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.medium,
                    }}
                  >
                    Select a token
                  </h3>
                  <p>Choose a token from the list to see its details.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenExplorer;
