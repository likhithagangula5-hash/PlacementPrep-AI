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
    gap: "10px",
    padding: "11px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    color: isActive ? "#ffffff" : (theme.text || "#e5e7eb"),
    background: isActive ? (theme.primary || "#2563eb") : "transparent",
    marginBottom: "4px",
    fontSize: "14px",
    fontWeight: isActive ? "600" : "400",
    transition: "background 0.15s ease, color 0.15s ease",
    minHeight: "44px", /* touch-friendly */
  });

  const sidebarBg = theme.card || "#111827";
  const borderColor = theme.border || "rgba(255,255,255,0.08)";

  return (
    <>
      {/* ── Hamburger button (mobile only) ── */}
      <button
        id="hamburger"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        style={{
          position: "fixed",
          top: "12px",
          left: "12px",
          zIndex: 1100,
          background: theme.primary || "#2563eb",
          color: "#fff",
          border: "none",
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "20px",
          lineHeight: 1,
          boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* ── Backdrop overlay (mobile only, when sidebar open) ── */}
      {isOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* ── Sidebar panel ── */}
      <div
        id="sidebar-container"
        style={{
          width: "240px",
          height: "100vh",
          height: "100dvh", /* dynamic viewport height — fixes mobile browser chrome */
          position: "fixed",
          left: 0,
          top: 0,
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          background: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
          zIndex: 1000,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
          boxSizing: "border-box",
          overflowY: "auto",
          overflowX: "hidden",
          /* iOS momentum scroll */
          WebkitOverflowScrolling: "touch",
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
              end={to === "/"}
              style={linkStyle}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: theme toggle + logout */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            paddingTop: "16px",
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          <button
            onClick={toggleTheme}
            style={{
              padding: "11px 14px",
              minHeight: "44px",
              borderRadius: "8px",
              border: `1px solid ${borderColor}`,
              background: "transparent",
              color: theme.text || "#fff",
              cursor: "pointer",
              fontSize: "14px",
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
              padding: "11px 14px",
              minHeight: "44px",
              borderRadius: "8px",
              border: "none",
              background: theme.danger || "#ef4444",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              textAlign: "left",
            }}
          >
            🔒 Logout
          </button>
        </div>
      </div>

      {/* ── CSS: desktop always shows sidebar, mobile slides in/out ── */}
      <style>{`
        /* Desktop: sidebar always visible, no hamburger */
        @media (min-width: 1024px) {
          #hamburger { display: none !important; }
          #sidebar-container {
            transform: translateX(0) !important;
          }
        }

        /* Mobile: hamburger visible, sidebar slides */
        @media (max-width: 1023px) {
          #hamburger { display: flex !important; }
        }

        /* Hover effect for nav links */
        #sidebar-container a:hover {
          background: ${
            theme.primary
              ? theme.primary + "22"
              : "rgba(59,130,246,0.13)"
          } !important;
        }

        /* Theme toggle hover */
        #sidebar-container button:first-of-type:hover {
          background: ${borderColor} !important;
        }
      `}</style>
    </>
  );
}