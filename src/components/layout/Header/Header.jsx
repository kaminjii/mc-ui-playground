// src/components/layout/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { theme } from "../../../theme";
import Button from "../../ui/Button/Button";

// A sub-component to handle its own hover state declaratively
const NavLink = ({ children, href }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navLinkStyles = {
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: isHovered ? theme.colors.primary : theme.colors.text.secondary, // Color is now driven by state
    textDecoration: "none",
    transition: "color 0.2s ease",
  };

  return (
    <a
      href={href}
      style={navLinkStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    padding: `${theme.spacing.md} 0`, // Vertical padding on the header itself
    zIndex: 1000,
    transition:
      "background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease",
    backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.7)" : "transparent",
    backdropFilter: isScrolled ? "blur(10px)" : "none",
    boxShadow: isScrolled ? `0 2px 10px rgba(0,0,0,0.05)` : "none",
  };

  // New container style to constrain the content and prevent overflow
  const containerStyles = {
    width: "100%",
    maxWidth: "1200px", // This should match your main content's max-width
    margin: "0 auto",
    padding: `0 ${theme.spacing.xl}`, // Horizontal padding is now on the container
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoStyles = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.primary,
  };

  const navStyles = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xl,
  };

  return (
    <header style={headerStyles}>
      <div style={containerStyles}>
        <div style={logoStyles}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                background: theme.colors.secondary,
                borderRadius: "50%",
              }}
            />
            {/* Assuming theme.colors.accent.yellow is correct from your theme file */}
            <div
              style={{
                width: "24px",
                height: "24px",
                background: theme.colors.accent.yellow,
                borderRadius: "50%",
                marginLeft: "-12px",
                opacity: 0.9,
              }}
            />
          </div>
          <span>Design Center</span>
        </div>
        <nav style={navStyles}>
          {["Mission", "Brand", "Stories", "Digital"].map((item) => (
            <NavLink key={item} href="#">
              {item}
            </NavLink>
          ))}
          <Button size="md" variant="primary">
            Contact
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
