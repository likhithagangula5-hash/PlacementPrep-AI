import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Aptitude from "./pages/Aptitude";
import Coding from "./pages/Coding";
import Interview from "./pages/Interview";
import Resume from "./pages/Resume";
import Home from "./pages/Home";
import AIInterview from "./pages/AIInterview";
import Admin from "./pages/Admin";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage immediately to avoid flash
    return localStorage.getItem("theme") === "dark";
  });

  function toggleTheme() {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  }

  const theme = darkMode
    ? {
        bg: "#0b0f19",
        card: "#111827",
        text: "#e5e7eb",
        subtext: "#9ca3af",
        border: "#1f2937",
        primary: "#3b82f6",
        danger: "#ef4444",
        success: "#10b981",
      }
    : {
        bg: "#f8fafc",
        card: "#ffffff",
        text: "#111827",
        subtext: "#6b7280",
        border: "#e5e7eb",
        primary: "#2563eb",
        danger: "#dc2626",
        success: "#059669",
      };

  // Sync theme to CSS variables — single source of truth
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, val]) => {
      root.style.setProperty(`--${key}`, val);
    });
    // Also set dark/light class for any CSS that needs it
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div
        style={{
          background: theme.bg,
          minHeight: "100vh",
          color: theme.text,
          display: "flex",
        }}
      >
        <Sidebar darkMode={darkMode} toggleTheme={toggleTheme} theme={theme} />

        {/* Overlay for mobile when sidebar is open */}
        <div
          id="main-content"
          style={{
            marginLeft: "240px",
            flex: 1,
            minWidth: 0,
            transition: "margin-left 0.3s ease",
          }}
        >
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/login" element={<Login theme={theme} />} />
            <Route path="/register" element={<Register theme={theme} />} />
            <Route path="/dashboard" element={<Dashboard theme={theme} />} />
            <Route path="/aptitude" element={<Aptitude theme={theme} />} />
            <Route path="/coding" element={<Coding theme={theme} />} />
            <Route path="/interview" element={<Interview theme={theme} />} />
            <Route path="/resume" element={<Resume theme={theme} />} />
            {/* Fixed: was duplicated — now only AIInterview handles /ai-interview */}
            <Route path="/ai-interview" element={<AIInterview theme={theme} />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          #main-content {
            margin-left: 0 !important;
            padding-top: 56px;
          }
        }
        @media (min-width: 1024px) {
          #hamburger { display: none !important; }
        }
      `}</style>
    </BrowserRouter>
  );
}
