import { Link } from "react-router-dom";

export default function NavBar({ theme = {} }) {
  const border = theme.border || "#ddd";
  const text = theme.text || "#111827";
  const bg = theme.card || "transparent";

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        borderBottom: `1px solid ${border}`,
        fontFamily: "Arial",
        background: bg,
        color: text,
      }}
    >
      <h2>🎓 PlacePrep AI</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: text }}>
          Home
        </Link>

        <Link to="/dashboard" style={{ textDecoration: "none", color: text }}>
          Dashboard
        </Link>

        <Link to="/login" style={{ textDecoration: "none", color: text }}>
          Login
        </Link>

        <Link to="/register" style={{ textDecoration: "none", color: text }}>
          Register
        </Link>
      </div>
    </nav>
  );
}