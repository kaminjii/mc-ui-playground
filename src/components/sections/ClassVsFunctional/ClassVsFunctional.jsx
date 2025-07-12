import React from "react";
import {
  CheckCircle,
  XCircle,
  ArrowDown,
  Code,
  Zap,
  Users,
} from "lucide-react";
import { theme } from "../../../theme";
import CodeBlock from "../../ui/CodeBlock/CodeBlock";

const ClassVsFunctional = () => {
  const classComponentCode = `interface State {
  count: number;
}

class Button extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Clicked {this.state.count} times
      </button>
    );
  }
}`;

  const functionalComponentCode = `const Button: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`;

  const sectionStyles = {
    padding: `${theme.spacing["4xl"]} 0`,
    maxWidth: "1000px",
    margin: "0 auto",
    paddingLeft: theme.spacing.xl,
    paddingRight: theme.spacing.xl,
  };

  const headerStyles = {
    textAlign: "center",
    marginBottom: theme.spacing["4xl"],
  };

  const titleStyles = {
    fontSize: theme.typography.fontSize["4xl"],
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing.lg,
    color: theme.colors.text.primary,
  };

  const subtitleStyles = {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.6,
  };

  const comparisonSectionStyles = {
    marginBottom: theme.spacing["4xl"],
  };

  const codeBlockContainerStyles = {
    marginBottom: theme.spacing.xl,
  };

  const labelStyles = (type) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor:
      type === "old"
        ? theme.colors.background.secondary
        : theme.colors.background.secondary,
    border: `1px solid ${theme.colors.border.medium}`,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: "600",
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    width: "fit-content",
  });

  const arrowContainerStyles = {
    display: "flex",
    justifyContent: "center",
    margin: `${theme.spacing.lg} 0`,
  };

  const arrowStyles = {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: "50%",
    border: `1px solid ${theme.colors.border.medium}`,
  };

  const benefitsStyles = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing["2xl"],
    marginTop: theme.spacing["2xl"],
  };

  const benefitColumnStyles = {
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.border.medium}`,
  };

  const benefitTitleStyles = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.md,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  };

  const benefitListStyles = {
    listStyle: "none",
    padding: 0,
    margin: 0,
  };

  const benefitItemStyles = {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  };

  const quickFactsStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: theme.spacing.xl,
    marginTop: theme.spacing["3xl"],
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.border.medium}`,
  };

  const factStyles = {
    textAlign: "center",
  };

  const factNumberStyles = {
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  };

  const factLabelStyles = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  };

  const classCons = [
    "More boilerplate code",
    "Binding methods to `this`",
    "Complex lifecycle methods",
    "Harder to reuse logic",
  ];

  const functionalPros = [
    "Less code to write",
    "No `this` binding issues",
    "Hooks for everything",
    "Easy to test and share logic",
  ];

  return (
    <section style={sectionStyles}>
      <header style={headerStyles}>
        <h2 style={titleStyles}>Class vs. Functional Components</h2>
        <p style={subtitleStyles}>
          React evolved from verbose class components to clean functional
          components with hooks. Here's the same button component, before and
          after.
        </p>
      </header>

      <div style={comparisonSectionStyles}>
        <div style={codeBlockContainerStyles}>
          <div style={labelStyles("old")}>
            <XCircle size={16} />
            The Old Way: Class Component
          </div>
          <CodeBlock language="typescript">{classComponentCode}</CodeBlock>
        </div>

        <div style={arrowContainerStyles}>
          <div style={arrowStyles}>
            <ArrowDown size={20} color={theme.colors.primary} />
          </div>
        </div>

        <div style={codeBlockContainerStyles}>
          <div style={labelStyles("new")}>
            <CheckCircle size={16} />
            The Modern Way: Functional Component
          </div>
          <CodeBlock language="typescript">{functionalComponentCode}</CodeBlock>
        </div>
      </div>

      <div style={benefitsStyles}>
        <div style={benefitColumnStyles}>
          <h3 style={benefitTitleStyles}>
            <XCircle size={20} color={theme.colors.text.secondary} />
            Class Component Issues
          </h3>
          <ul style={benefitListStyles}>
            {classCons.map((con, index) => (
              <li key={index} style={benefitItemStyles}>
                <XCircle size={14} color={theme.colors.text.tertiary} />
                {con}
              </li>
            ))}
          </ul>
        </div>

        <div style={benefitColumnStyles}>
          <h3 style={benefitTitleStyles}>
            <CheckCircle size={20} color={theme.colors.primary} />
            Functional Component Benefits
          </h3>
          <ul style={benefitListStyles}>
            {functionalPros.map((pro, index) => (
              <li key={index} style={benefitItemStyles}>
                <CheckCircle size={14} color={theme.colors.primary} />
                {pro}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={quickFactsStyles}>
        <div style={factStyles}>
          <div style={factNumberStyles}>60%</div>
          <div style={factLabelStyles}>Less Code</div>
        </div>
        <div style={factStyles}>
          <div style={factNumberStyles}>0</div>
          <div style={factLabelStyles}>Binding Issues</div>
        </div>
        <div style={factStyles}>
          <div style={factNumberStyles}>∞</div>
          <div style={factLabelStyles}>Reusability</div>
        </div>
      </div>
    </section>
  );
};

export default ClassVsFunctional;
