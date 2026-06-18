import { useNavigate } from "react-router-dom";

export default function Home({ theme = {} }) {
  const navigate = useNavigate();

  const isDark = theme.mode === "dark" || theme.isDark || false;

  return (
    <div style={containerStyle(isDark, theme)}>
      <div style={bgDecor1(isDark)} />
      <div style={bgDecor2(isDark)} />
      <div style={bgDecor3(isDark)} />

      {/* HERO */}
      <div style={heroStyle(isDark, theme)}>
        <h1 style={titleStyle(isDark, theme)}>🎓 PlacePrep AI</h1>
        <p style={subtitleStyle(isDark, theme)}>Your all-in-one Placement Preparation Platform</p>
        <p style={descStyle(isDark, theme)}>
          Master Aptitude • Coding • Interviews • Resume Building • Progress Tracking
        </p>

        <div style={btnRowStyle}>
          <button onClick={() => navigate("/register")} style={primaryBtnStyle(isDark, theme)} className="hero-btn">
            Get Started Free
          </button>
          <button onClick={() => navigate("/login")} style={secondaryBtnStyle(isDark, theme)} className="hero-btn">
            Login
          </button>
        </div>
      </div>

      {/* STATS */}
      <div style={statsSectionStyle(isDark, theme)}>
        <div style={statsGridStyle}>
          <div style={statItemStyle(isDark, theme)}><h3>5000+</h3><p>Students Placed</p></div>
          <div style={statItemStyle(isDark, theme)}><h3>150+</h3><p>Companies</p></div>
          <div style={statItemStyle(isDark, theme)}><h3>95%</h3><p>Success Rate</p></div>
          <div style={statItemStyle(isDark, theme)}><h3>10k+</h3><p>Questions</p></div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={sectionHeaderStyle(isDark)}>
        <h2 style={sectionTitle(isDark, theme)}>🚀 Powerful Features</h2>
        <p style={sectionSubtitle(isDark, theme)}>Everything you need to land your dream job</p>
      </div>

      <div style={featureGridStyle}>
        {[
          { icon: "🧠", title: "Aptitude", desc: "Practice logical reasoning, quantitative aptitude & verbal ability", path: "/aptitude" },
          { icon: "💻", title: "Coding", desc: "Solve real interview problems with instant feedback", path: "/coding" },
          { icon: "🎤", title: "Mock Interviews", desc: "HR & Technical interview preparation with AI evaluation", path: "/interview" },
          { icon: "📄", title: "Resume Builder", desc: "Create ATS-friendly resumes with smart suggestions", path: "/resume" },
        ].map((f, i) => (
          <div key={i} style={featureCardStyle(isDark, theme)} className="feature-card" onClick={() => navigate(f.path)}>
            <div style={iconStyle}>{f.icon}</div>
            <h3 style={featureTitle(isDark, theme)}>{f.title}</h3>
            <p style={featureDesc(isDark, theme)}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* TESTIMONIALS */}
      <div style={sectionHeaderStyle(isDark)}>
        <h2 style={sectionTitle(isDark, theme)}>💬 What Our Students Say</h2>
      </div>

      <div style={testimonialGridStyle}>
        {[
          { text: "Got placed at Google within 3 months of using PlacePrep AI...", author: "Priya Sharma, SDE @ Google" },
          { text: "The coding questions helped me improve drastically...", author: "Arjun Patel, Software Engineer @ Microsoft" },
          { text: "Best platform for placement prep...", author: "Neha Gupta, Analyst @ Goldman Sachs" },
        ].map((t, i) => (
          <div key={i} style={testimonialCardStyle(isDark, theme)}>
            <p style={testimonialText(isDark, theme)}>"{t.text}"</p>
            <div style={authorStyle(isDark, theme)}>{t.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================== STRONG CONTRAST DARK MODE ==================== */

const containerStyle = (isDark, theme) => ({
  padding: "40px 30px",
  marginLeft: "240px",
  minHeight: "100vh",
  fontFamily: "'Inter', system-ui, Arial, sans-serif",
  background: theme.bg || (isDark ? "linear-gradient(135deg, #0f172a 0%, #1e2937 100%)" : "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)"),
  color: theme.text || (isDark ? "#f8fafc" : "#1e2937"),
  position: "relative",
  overflow: "hidden",
});

const bgDecor1 = (isDark) => ({ position: "absolute", top: "15%", left: "10%", width: "300px", height: "300px", background: isDark ? "radial-gradient(circle, rgba(103,232,249,0.12) 0%, transparent 70%)" : "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0, pointerEvents: "none" });
const bgDecor2 = (isDark) => ({ position: "absolute", top: "60%", right: "15%", width: "400px", height: "400px", background: isDark ? "radial-gradient(circle, rgba(244,114,182,0.1) 0%, transparent 70%)" : "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0, pointerEvents: "none" });
const bgDecor3 = (isDark) => ({ position: "absolute", bottom: "20%", left: "25%", width: "250px", height: "250px", background: isDark ? "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)" : "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0, pointerEvents: "none" });

const heroStyle = (isDark, theme) => ({
  textAlign: "center",
  background: theme.card || (isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(255,255,255,0.95)"),
  backdropFilter: "blur(16px)",
  padding: "80px 40px",
  borderRadius: "24px",
  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
  maxWidth: "1000px",
  margin: "0 auto 80px",
  border: `1px solid ${theme.border || (isDark ? "#334155" : "#e2e8f0")}`,
  position: "relative",
  zIndex: 1,
});

const titleStyle = (isDark, theme) => ({
  fontSize: "3.4rem",
  fontWeight: "700",
  marginBottom: "16px",
  background: theme.headerGradient || (isDark ? "linear-gradient(90deg, #67e8f9, #c084fc)" : "linear-gradient(90deg, #1e40af, #6d28d9)"),
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

const subtitleStyle = (isDark, theme) => ({
  fontSize: "1.45rem",
  color: theme.text || (isDark ? "#f1f5f9" : "#1e2937"),
  marginBottom: "12px",
  fontWeight: "500",
});

const descStyle = (isDark, theme) => ({
  fontSize: "1.12rem",
  color: theme.textSecondary || (isDark ? "#cbd5e1" : "#64748b"),
  maxWidth: "620px",
  margin: "0 auto 32px",
});

const statsSectionStyle = (isDark, theme) => ({
  background: theme.card || (isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(255,255,255,0.85)"),
  backdropFilter: "blur(12px)",
  padding: "40px 20px",
  borderRadius: "20px",
  marginBottom: "80px",
  border: `1px solid ${theme.border || (isDark ? "#475569" : "#e2e8f0")}`,
  position: "relative",
  zIndex: 1,
});

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "18px",
  maxWidth: "1000px",
  margin: "0 auto",
  textAlign: "center",
};

const statItemStyle = (isDark, theme) => ({
  padding: "16px",
  color: theme.text || (isDark ? "#f1f5f9" : "#1e2937"),
});

const sectionHeaderStyle = () => ({ textAlign: "center", marginBottom: "40px", zIndex: 1, position: "relative" });

const sectionTitle = (isDark, theme) => ({
  fontSize: "2.2rem",
  fontWeight: "700",
  color: theme.text || (isDark ? "#f1f5f9" : "#1e2937"),
});

const sectionSubtitle = (isDark, theme) => ({
  color: theme.textSecondary || (isDark ? "#cbd5e1" : "#64748b"),
  fontSize: "1.1rem",
});

const featureGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "24px",
  maxWidth: "1100px",
  margin: "0 auto 80px",
  position: "relative",
  zIndex: 1,
};

const featureCardStyle = (isDark, theme) => ({
  background: theme.card || (isDark ? "rgba(15, 23, 42, 0.95)" : "white"),
  padding: "32px 24px",
  borderRadius: "20px",
  border: `1px solid ${theme.border || (isDark ? "#475569" : "#e2e8f0")}`,
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
  transition: "all 0.4s ease",
  cursor: "pointer",
  textAlign: "center",
  zIndex: 1,
});

const featureTitle = (isDark, theme) => ({
  fontSize: "1.35rem",
  fontWeight: "600",
  color: theme.text || (isDark ? "#f1f5f9" : "#1e2937"),
  margin: "12px 0",
});

const featureDesc = (isDark, theme) => ({
  color: theme.textSecondary || (isDark ? "#cbd5e1" : "#64748b"),
  lineHeight: "1.55",
});

const testimonialCardStyle = (isDark, theme) => ({
  background: theme.card || (isDark ? "rgba(15, 23, 42, 0.95)" : "white"),
  padding: "32px",
  borderRadius: "20px",
  border: `1px solid ${theme.border || (isDark ? "#475569" : "#e2e8f0")}`,
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
});

const testimonialGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
  maxWidth: "1100px",
  margin: "0 auto",
  position: "relative",
  zIndex: 1,
};

const testimonialText = (isDark, theme) => ({
  color: theme.text || (isDark ? "#f1f5f9" : "#1e2937"),
  lineHeight: "1.6",
});

const authorStyle = (isDark, theme) => ({
  marginTop: "20px",
  fontWeight: "600",
  color: theme.primary || (isDark ? "#67e8f9" : "#3b82f6"),
});

const iconStyle = { fontSize: "2.8rem", marginBottom: "16px" };

const btnRowStyle = { display: "flex", justifyContent: "center", gap: "18px", flexWrap: "wrap" };

const primaryBtnStyle = () => ({
  padding: "14px 34px",
  fontSize: "1.1rem",
  fontWeight: "600",
  border: "none",
  borderRadius: "12px",
  background: "linear-gradient(90deg, #3b82f6, #6366f1)",
  color: "white",
  cursor: "pointer",
  boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
  transition: "all 0.3s ease",
});

const secondaryBtnStyle = (isDark, theme) => ({
  padding: "14px 34px",
  fontSize: "1.1rem",
  fontWeight: "600",
  border: `2px solid ${theme.primary || "#3b82f6"}`,
  borderRadius: "12px",
  background: "transparent",
  color: theme.primary || (isDark ? "#67e8f9" : "#1e40af"),
  cursor: "pointer",
  transition: "all 0.3s ease",
});

/* Hover Effects */
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  .hero-btn:hover { transform: translateY(-4px); }
  .feature-card:hover { transform: translateY(-12px) scale(1.04); box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25); }
`;
document.head.appendChild(styleSheet);
