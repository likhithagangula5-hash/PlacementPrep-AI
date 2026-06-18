import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "🏠 Home" },
  { to: "/dashboard", label: "📊 Dashboard" },
  { to: "/aptitude", label: "🧠 Aptitude" },
  { to: "/coding", label: "💻 Coding" },
  { to: "/interview", label: "🎤 Interview" },
  { to: "/resume", label: "📄 Resume" },
  { to: "/ai-interview", label: "🤖 AI Interview" },
];

export default function Sidebar({ darkMode, toggleTheme, theme = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    closeMenu();
    navigate("/login");
  }

  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 12px",
    borderRadius: "8px",
    textDecoration: "none",
    color: isActive ? "#ffffff" : (theme.text || "#e5e7eb"),
    background: isActive
      ? (theme.primary || "#2563eb")
      : "transparent",
    marginBottom: "2px",
    fontSize: "13px",
    fontWeight: isActive ? "600" : "400",
    transition: "background 0.15s ease, color 0.15s ease",
  });

  const sidebarBg = theme.card || "#111827";
  const borderColor = theme.border || "rgba(255,255,255,0.08)";

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        id="hamburger"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Toggle navigation"
        style={{
          display: "none", // controlled by CSS media query
          position: "fixed",
          top: "14px",
          left: "14px",
          zIndex: 1100,
          background: theme.primary || "#2563eb",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "18px",
          lineHeight: 1,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          onClick={closeMenu}
          style={{
            display: "none", // shown via media query below
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          id="sidebar-backdrop"
        />
      )}

      {/* Sidebar */}
      <div
        id="sidebar-container"
        style={{
          width: "240px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          background: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
          zIndex: 1000,
          // On desktop: always visible. On mobile: slide in/out
          transition: "transform 0.3s ease",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        {/* Brand */}
        <div style={{ marginBottom: "24px", paddingLeft: "4px" }}>
          <span style={{ fontSize: "18px", fontWeight: "700", color: theme.text || "#fff" }}>
            🎓 PlacePrep AI
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1 }}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}          // exact match for Home only
              style={linkStyle}
              onClick={closeMenu}      // FIX: was missing on AI Interview link
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "16px", borderTop: `1px solid ${borderColor}` }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: "9px 14px",
              borderRadius: "8px",
              border: `1px solid ${borderColor}`,
              background: "transparent",
              color: theme.text || "#fff",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500",
              textAlign: "left",
              transition: "background 0.15s",
            }}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: "9px 14px",
              borderRadius: "8px",
              border: "none",
              background: theme.danger || "#ef4444",
              color: "#fff",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              textAlign: "left",
            }}
          >
            🔒 Logout
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          #hamburger { display: inline-block !important; }
          #sidebar-backdrop { display: block !important; }
          #sidebar-container {
            transform: ${isOpen ? "translateX(0)" : "translateX(-100%)"};
          }
        }
        @media (min-width: 1024px) {
          #hamburger { display: none !important; }
          #sidebar-container { transform: translateX(0) !important; }
        }

        /* Hover effect for nav links */
        #sidebar-container a:hover {
          background: ${theme.primary ? theme.primary + "22" : "rgba(59,130,246,0.13)"} !important;
        }

        /* Theme button hover */
        #sidebar-container button:first-of-type:hover {
          background: ${borderColor} !important;
        }
      `}</style>
    </>
  );
}
