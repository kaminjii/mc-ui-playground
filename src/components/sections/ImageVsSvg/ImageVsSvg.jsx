// src/components/sections/ImageVsSvg/ImageVsSvg.jsx
import React from "react";
import {
  Image,
  Code,
  CheckCircle,
  XCircle,
  Download,
  Search,
  MousePointerClick,
} from "lucide-react";
import { theme } from "../../../theme";
import CodeBlock from "../../ui/CodeBlock/CodeBlock";

const ImageVsSvg = () => {
  const svgExampleCode = `<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <title>Accessible Icon Name<title>
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" fill="currentColor"/>
</svg>`;

  // --- Styles ---
  const sectionStyles = {
    padding: `${theme.spacing["3xl"]} 0`,
    position: "relative",
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
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: 1.6,
  };
  const cardStyles = {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    border: `1px solid ${theme.colors.border.light}`,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };
  const conceptTitleStyles = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.md,
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
  };
  const featureListStyles = {
    listStyle: "none",
    padding: 0,
    margin: `${theme.spacing.lg} 0 0 0`,
    flexGrow: 1,
  };
  const featureItemStyles = {
    display: "flex",
    alignItems: "start",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
  };
  const demoBoxStyles = {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    border: `1px solid ${theme.colors.border.medium}`,
    marginTop: "auto",
    textAlign: "center",
  };
  const instructionStepStyles = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  };
  const stepIconStyles = {
    flexShrink: 0,
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: theme.colors.primary,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <header style={headerStyles}>
          <h2 style={titleStyles}>Image vs. SVG: Choosing the Right Format</h2>
          <p style={subtitleStyles}>
            Understanding the trade-offs between raster images (like PNG, JPG)
            and vector graphics (SVG) for icons and illustrations.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: theme.spacing.xl,
            alignItems: "stretch",
          }}
        >
          {/* Image Tags */}
          <div style={cardStyles}>
            <h3 style={conceptTitleStyles}>
              <Image size={24} /> Raster Images (`&lt;img&gt;`)
            </h3>
            <div style={demoBoxStyles}>
              <img
                src="https://placehold.co/100x100/EB001B/white?text=IMG"
                alt="Placeholder for a raster image"
                style={{ borderRadius: theme.borderRadius.md }}
              />
            </div>
            <ul style={featureListStyles}>
              <li style={featureItemStyles}>
                <XCircle
                  size={20}
                  color={theme.colors.error}
                  style={{ flexShrink: 0 }}
                />
                <span>
                  <strong>Pixelation:</strong> Loses quality and becomes blurry
                  when scaled up.
                </span>
              </li>
              <li style={featureItemStyles}>
                <XCircle
                  size={20}
                  color={theme.colors.error}
                  style={{ flexShrink: 0 }}
                />
                <span>
                  <strong>Styling:</strong> Cannot be easily styled with CSS
                  (e.g., changing color).
                </span>
              </li>
              <li style={featureItemStyles}>
                <XCircle
                  size={20}
                  color={theme.colors.error}
                  style={{ flexShrink: 0 }}
                />
                <span>
                  <strong>Performance:</strong> Can be less performant due to
                  HTTP requests for each image.
                </span>
              </li>
            </ul>
          </div>

          {/* SVG */}
          <div style={cardStyles}>
            <h3 style={conceptTitleStyles}>
              <Code size={24} /> Inline SVG (`&lt;svg&gt;`)
            </h3>
            <div style={demoBoxStyles}>
              <svg
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill={theme.colors.primary}
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Example SVG Icon</title>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
              </svg>
            </div>
            <ul style={featureListStyles}>
              <li style={featureItemStyles}>
                <CheckCircle
                  size={20}
                  color={theme.colors.success}
                  style={{ flexShrink: 0 }}
                />
                <span>
                  <strong>Scalable:</strong> Infinitely scalable without any
                  loss of quality.
                </span>
              </li>
              <li style={featureItemStyles}>
                <CheckCircle
                  size={20}
                  color={theme.colors.success}
                  style={{ flexShrink: 0 }}
                />
                <span>
                  <strong>Stylable:</strong> Can be directly styled with CSS
                  (color, stroke, fill).
                </span>
              </li>
              <li style={featureItemStyles}>
                <CheckCircle
                  size={20}
                  color={theme.colors.success}
                  style={{ flexShrink: 0 }}
                />
                <span>
                  <strong>Performant:</strong> Embedded directly in the HTML,
                  reducing HTTP requests.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* How to use MADE Icons */}
        <div style={{ ...cardStyles, marginTop: theme.spacing.xl }}>
          <h3 style={conceptTitleStyles}>How to Use MADE SVG Icons</h3>
          <p
            style={{
              ...subtitleStyles,
              textAlign: "left",
              margin: `0 0 ${theme.spacing.lg} 0`,
            }}
          >
            Follow these steps to correctly implement an accessible SVG icon
            from the MADE library into your application.
          </p>

          <div style={instructionStepStyles}>
            <div style={stepIconStyles}>
              <Search size={20} />
            </div>
            <p>
              Go to the MADE Icon Library at{" "}
              <a
                href="#"
                style={{ color: theme.colors.primary, fontWeight: "bold" }}
              >
                &lt;temp link&gt;
              </a>{" "}
              and find the icon you need.
            </p>
          </div>
          <div style={instructionStepStyles}>
            <div style={stepIconStyles}>
              <Download size={20} />
            </div>
            <p>
              Click the{" "}
              <strong style={{ color: theme.colors.primary }}>Download</strong>{" "}
              button for the desired icon. This will download an `.svg` file.
            </p>
          </div>
          <div style={instructionStepStyles}>
            <div style={stepIconStyles}>
              <MousePointerClick size={20} />
            </div>
            <p>
              Open the downloaded `.svg` file in your browser. Right-click on
              the icon and select "Inspect Element".
            </p>
          </div>
          <div style={instructionStepStyles}>
            <div style={stepIconStyles}>
              <Code size={20} />
            </div>
            <p>
              Copy the entire `&lt;svg&gt;` element from the developer tools and
              paste it into your React component.
            </p>
          </div>
          <div style={instructionStepStyles}>
            <div style={stepIconStyles}>
              <CheckCircle size={20} />
            </div>
            <div>
              <p>
                Add a `&lt;title&gt;` tag inside the `&lt;svg&gt;` for
                accessibility. This title will be read by screen readers.
              </p>
              <CodeBlock theme="light">{svgExampleCode}</CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageVsSvg;
