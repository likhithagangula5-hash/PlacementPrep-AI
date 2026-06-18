import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ theme = {} }) {
  const navigate = useNavigate();
  const isDark = getIsDark(theme);

  const [email, setEmail] = useState(() => localStorage.getItem("rememberedEmail") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => Boolean(localStorage.getItem("rememberedEmail")));
  const [isLoading, setIsLoading] = useState(false);

   async function handleLogin() {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
  
    setIsLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert("Invalid credentials");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
       body: JSON.stringify({
       email,
       password,
     }),
    });

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      alert("Login successful!");
      navigate("/dashboard");
      setIsLoading(false);
    }, 1200);
  }

  return (
    <div style={containerStyle(isDark, theme)}>
      <div style={panelStyle(isDark, theme)}>
        <div style={headerStyle}>
          <h1 style={logoStyle(isDark, theme)}>{"\u{1F393} PlacePrep AI"}</h1>
          <h2 style={titleStyle(theme)}>Welcome Back</h2>
          <p style={subtitleStyle(theme)}>Sign in to continue your preparation</p>
        </div>

        <div style={formStyle}>
          <input
            className="auth-input"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle(isDark, theme)}
          />

          <div style={passwordFieldStyle}>
            <input
              className="auth-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle(isDark, theme)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={passwordToggleStyle(theme)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div style={rememberMeStyle(theme)}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={checkboxStyle(theme)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" style={linkStyle(theme)}>Forgot Password?</a>
          </div>

          <button
            onClick={handleLogin}
            style={primaryButtonStyle(theme)}
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </button>
        </div>

        <div style={footerStyle}>
          <p style={footerTextStyle(theme)}>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} style={highlightLinkStyle(theme)}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const getIsDark = (theme) => (
  theme.mode === "dark" ||
  theme.isDark ||
  theme.bg === "#0b0f19" ||
  theme.bg === "#0f172a"
);

const getSubtext = (theme) => theme.subtext || theme.textSecondary || "#64748b";

const containerStyle = (isDark, theme) => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 24px",
  boxSizing: "border-box",
  background: theme.bg || (isDark ? "#0b0f19" : "#f8fafc"),
  color: theme.text || (isDark ? "#e5e7eb" : "#111827"),
  fontFamily: "'Inter', system-ui, Arial, sans-serif",
});

const panelStyle = (isDark, theme) => ({
  width: "min(100%, 420px)",
  background: theme.card || (isDark ? "#111827" : "#ffffff"),
  padding: "46px 38px",
  borderRadius: "20px",
  boxShadow: isDark
    ? "0 24px 60px rgba(0, 0, 0, 0.35)"
    : "0 24px 60px rgba(15, 23, 42, 0.12)",
  border: `1px solid ${theme.border || (isDark ? "#1f2937" : "#e5e7eb")}`,
  boxSizing: "border-box",
});

const headerStyle = {
  textAlign: "center",
  marginBottom: "32px",
};

const logoStyle = (isDark, theme) => ({
  fontSize: "2.1rem",
  fontWeight: "700",
  margin: "0 0 8px",
  background: theme.headerGradient || (
    isDark
      ? "linear-gradient(90deg, #67e8f9, #c084fc)"
      : "linear-gradient(90deg, #1e40af, #6d28d9)"
  ),
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

const titleStyle = (theme) => ({
  fontSize: "1.75rem",
  fontWeight: "600",
  color: theme.text || "#111827",
  margin: "0 0 6px",
});

const subtitleStyle = (theme) => ({
  color: getSubtext(theme),
  fontSize: "1.02rem",
  margin: 0,
});

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const inputStyle = (isDark, theme) => ({
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: `1px solid ${theme.border || (isDark ? "#1f2937" : "#e5e7eb")}`,
  color: theme.text || (isDark ? "#e5e7eb" : "#111827"),
  background: isDark ? "#0f172a" : "#ffffff",
  fontSize: "1rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
});

const passwordFieldStyle = {
  position: "relative",
};

const passwordToggleStyle = (theme) => ({
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  border: "none",
  background: "transparent",
  color: theme.primary || "#2563eb",
  cursor: "pointer",
  fontSize: "0.9rem",
  fontWeight: "600",
  padding: "6px",
});

const rememberMeStyle = (theme) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "14px",
  color: getSubtext(theme),
  fontSize: "0.95rem",
});

const checkboxLabelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const checkboxStyle = (theme) => ({
  accentColor: theme.primary || "#2563eb",
});

const linkStyle = (theme) => ({
  color: theme.primary || "#2563eb",
  textDecoration: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
});

const primaryButtonStyle = (theme) => ({
  width: "100%",
  padding: "14px",
  fontSize: "1.05rem",
  fontWeight: "600",
  background: theme.primary || "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  marginTop: "8px",
  boxShadow: "0 10px 20px rgba(37, 99, 235, 0.28)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
});

const footerStyle = {
  marginTop: "24px",
  textAlign: "center",
};

const footerTextStyle = (theme) => ({
  color: getSubtext(theme),
  fontSize: "0.97rem",
  margin: 0,
});

const highlightLinkStyle = (theme) => ({
  color: theme.primary || "#2563eb",
  fontWeight: "600",
  cursor: "pointer",
  textDecoration: "underline",
});

const styleSheetId = "placeprep-auth-form-styles";

if (typeof document !== "undefined" && !document.getElementById(styleSheetId)) {
  const styleSheet = document.createElement("style");
  styleSheet.id = styleSheetId;
  styleSheet.innerHTML = `
    .auth-input::placeholder {
      color: var(--subtext);
      opacity: 0.78;
    }

    .auth-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent);
    }

    .auth-btn:hover:not(:disabled) {
      transform: translateY(-3px);
      box-shadow: 0 15px 25px -5px color-mix(in srgb, var(--primary) 36%, transparent);
    }

    .auth-btn:disabled {
      opacity: 0.72;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(styleSheet);
}
