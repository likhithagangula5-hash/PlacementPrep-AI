import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ theme = {} }) {
  const navigate = useNavigate();
  const isDark = getIsDark(theme);
  const stats = getDashboardStats();

  const [user] = useState(() => getStoredUser());
  const [aptitudeHighScore] = useState(stats.aptitudeHighScore);
  const [codingHighScore] = useState(stats.codingHighScore);
  const [accuracy] = useState(stats.accuracy);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const barData = [
    { name: "Aptitude", score: aptitudeHighScore },
    { name: "Coding", score: codingHighScore },
  ];

  const pieData = [
    { name: "Correct", value: accuracy },
    { name: "Wrong", value: 100 - accuracy },
  ];

  const chartColors = [theme.primary || "#3b82f6", theme.danger || "#ef4444"];
  const axisStroke = theme.border || (isDark ? "#334155" : "#e2e8f0");

  return (
    <div style={containerStyle(isDark, theme)}>
      <div style={backgroundOverlay(isDark)} />

      <div style={contentWrapper}>
        <h1 style={headerStyle(isDark, theme)}>
          {"\u{1F4CA} Student Performance Dashboard"}
        </h1>

        {user && (
          <div style={userBoxStyle(isDark, theme)}>
            {"\u{1F464} Welcome back, "}
            <b>{user.email}</b>
          </div>
        )}

        <div style={grid}>
          <div style={cardStyle(isDark, theme)} className="stat-card">
            <div style={cardHeader(theme)}>{"\u{1F3C6} Aptitude"}</div>
            <div style={scoreStyle(isDark, theme)}>{aptitudeHighScore}</div>
            <div style={subText(theme)}>Highest Score</div>
          </div>

          <div style={cardStyle(isDark, theme)} className="stat-card">
            <div style={cardHeader(theme)}>{"\u{1F4BB} Coding"}</div>
            <div style={scoreStyle(isDark, theme)}>{codingHighScore}</div>
            <div style={subText(theme)}>Highest Score</div>
          </div>

          <div style={cardStyle(isDark, theme)} className="stat-card">
            <div style={cardHeader(theme)}>{"\u{1F3AF} Accuracy"}</div>
            <div style={scoreStyle(isDark, theme)}>{accuracy}%</div>
            <div style={subText(theme)}>Overall Performance</div>
          </div>
        </div>

        <div style={chartGrid}>
          <div style={chartBoxStyle(isDark, theme)} className="chart-card">
            <h3 style={chartTitle(theme)}>{"\u{1F4C8} Score Comparison"}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: getSubtext(theme) }}
                  axisLine={{ stroke: axisStroke }}
                  tickLine={{ stroke: axisStroke }}
                />
                <YAxis
                  tick={{ fill: getSubtext(theme) }}
                  axisLine={{ stroke: axisStroke }}
                  tickLine={{ stroke: axisStroke }}
                />
                <Tooltip
                  contentStyle={tooltipStyle(isDark, theme)}
                  labelStyle={tooltipLabelStyle(theme)}
                  itemStyle={tooltipItemStyle(theme)}
                />
                <Bar
                  dataKey="score"
                  radius={[12, 12, 0, 0]}
                  fill={theme.primary || "#3b82f6"}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={chartBoxStyle(isDark, theme)} className="chart-card">
            <h3 style={chartTitle(theme)}>{"\u{1F3AF} Accuracy Breakdown"}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={110}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={chartColors[index]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={40}
                  wrapperStyle={legendStyle(theme)}
                  formatter={(value) => (
                    <span style={legendTextStyle(theme)}>{value}</span>
                  )}
                />
                <Tooltip
                  contentStyle={tooltipStyle(isDark, theme)}
                  labelStyle={tooltipLabelStyle(theme)}
                  itemStyle={tooltipItemStyle(theme)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <style>{`
        .stat-card,
        .chart-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat-card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 20px 25px -5px ${isDark ? "rgba(59, 130, 246, 0.25)" : "rgba(59, 130, 246, 0.15)"};
        }

        .chart-card:hover {
          transform: translateY(-8px);
        }
      `}</style>
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

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("loggedInUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const getDashboardStats = () => {
  const aptitudeHighScore = Number(localStorage.getItem("highScore")) || 0;
  const aptitudeAttempts = Number(localStorage.getItem("quizAttempts")) || 0;
  const codingHighScore = Number(localStorage.getItem("codingHighScore")) || 0;
  const codingAttempts = Number(localStorage.getItem("codingAttempts")) || 0;

  const totalAttempts = aptitudeAttempts + codingAttempts;
  const totalScore = aptitudeHighScore + codingHighScore;
  const accuracy = totalAttempts > 0
    ? Math.round((totalScore / (totalAttempts * 5)) * 100)
    : 0;

  return {
    aptitudeHighScore,
    codingHighScore,
    accuracy,
  };
};

const containerStyle = (isDark, theme) => ({
  padding: "30px",
  marginLeft: "240px",
  minHeight: "100vh",
  fontFamily: "'Inter', system-ui, Arial, sans-serif",
  position: "relative",
  overflow: "hidden",
  background: theme.bg || (isDark
    ? "linear-gradient(135deg, #0f172a 0%, #1e2937 100%)"
    : "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)"),
  color: theme.text || (isDark ? "#e2e8f0" : "#1e2937"),
});

const backgroundOverlay = (isDark) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: isDark
    ? "radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(244, 114, 182, 0.06) 0%, transparent 50%)"
    : "radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)",
  pointerEvents: "none",
  zIndex: 0,
});

const contentWrapper = {
  position: "relative",
  zIndex: 1,
};

const headerStyle = (isDark, theme) => ({
  fontSize: "2.5rem",
  fontWeight: "700",
  marginBottom: "25px",
  background: theme.headerGradient || (isDark
    ? "linear-gradient(90deg, #67e8f9, #c084fc)"
    : "linear-gradient(90deg, #1e40af, #6d28d9)"),
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

const userBoxStyle = (isDark, theme) => ({
  background: theme.card || (isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)"),
  backdropFilter: "blur(12px)",
  padding: "16px 24px",
  borderRadius: "16px",
  marginBottom: "30px",
  border: `1px solid ${theme.border || (isDark ? "rgba(255,255,255,0.1)" : "rgba(148,163,184,0.2)")}`,
  color: theme.text || (isDark ? "#e2e8f0" : "#1e2937"),
});

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
};

const cardStyle = (isDark, theme) => ({
  background: theme.card || (isDark ? "rgba(30, 41, 59, 0.85)" : "white"),
  backdropFilter: "blur(12px)",
  padding: "26px",
  borderRadius: "16px",
  border: `1px solid ${theme.border || (isDark ? "rgba(148,163,184,0.15)" : "#e2e8f0")}`,
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
});

const cardHeader = (theme) => ({
  fontSize: "1.05rem",
  color: getSubtext(theme),
  marginBottom: "10px",
});

const scoreStyle = (isDark, theme) => ({
  fontSize: "3rem",
  fontWeight: "700",
  color: theme.primary || (isDark ? "#67e8f9" : "#1e40af"),
  margin: "10px 0",
  transition: "all 0.3s ease",
});

const subText = (theme) => ({
  color: getSubtext(theme),
  fontSize: "0.95rem",
});

const chartGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
  gap: "24px",
};

const chartBoxStyle = (isDark, theme) => ({
  background: theme.card || (isDark ? "rgba(30, 41, 59, 0.85)" : "white"),
  backdropFilter: "blur(12px)",
  padding: "26px",
  borderRadius: "16px",
  border: `1px solid ${theme.border || (isDark ? "rgba(148,163,184,0.15)" : "#e2e8f0")}`,
  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
});

const chartTitle = (theme) => ({
  marginBottom: "22px",
  color: theme.text || "#1e2937",
  fontSize: "1.35rem",
  fontWeight: "600",
});

const tooltipStyle = (isDark, theme) => ({
  backgroundColor: theme.card || (isDark ? "#111827" : "#ffffff"),
  border: `1px solid ${theme.border || (isDark ? "#334155" : "#e2e8f0")}`,
  borderRadius: "8px",
  color: theme.text || (isDark ? "#e5e7eb" : "#1e2937"),
});

const tooltipLabelStyle = (theme) => ({
  color: theme.text || "#1e2937",
  fontWeight: 600,
});

const tooltipItemStyle = (theme) => ({
  color: theme.text || "#1e2937",
});

const legendStyle = (theme) => ({
  color: theme.text || "#1e2937",
});

const legendTextStyle = (theme) => ({
  color: theme.text || "#1e2937",
});
