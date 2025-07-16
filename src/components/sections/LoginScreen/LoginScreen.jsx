import React, { useState } from "react";
import { theme } from "../../../theme";
import Card from "../../ui/Card/Card";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

const LoginScreen = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const CORRECT_PASSWORD = "admin123"; // Replace with your actual password

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setError("");
      onLoginSuccess();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const containerStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: theme.colors.background.dark,
  };

  return (
    <div style={containerStyles}>
      <Card variant="glass" style={{ width: "100%", maxWidth: "400px" }}>
        <form
          onSubmit={handleSubmit}
          style={{ padding: theme.spacing.xl, textAlign: "center" }}
        >
          <h2
            style={{
              color: theme.colors.text.inverse,
              marginBottom: theme.spacing.lg,
            }}
          >
            Enter Password
          </h2>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: theme.spacing.md }}
          />
          <Button type="submit" variant="primary" style={{ width: "100%" }}>
            Login
          </Button>
          {error && (
            <p
              style={{
                color: theme.colors.danger,
                marginTop: theme.spacing.md,
              }}
            >
              {error}
            </p>
          )}
        </form>
      </Card>
    </div>
  );
};

export default LoginScreen;
