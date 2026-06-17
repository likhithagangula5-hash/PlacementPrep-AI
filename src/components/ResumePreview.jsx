export default function ResumePreview({ data, theme = {} }) {
  const textColor = theme.text || "#000";
  
  return (
    <div style={{ fontSize: "14px", lineHeight: "1.5", color: textColor }}>
      {/* HEADER */}
      <h1 style={{ marginBottom: "5px", color: textColor }}>
        {data.name || "Your Name"}
      </h1>

      <p style={{ margin: 0, color: textColor }}>
        📧 {data.email || "email@example.com"} | 📱{" "}
        {data.phone || "XXXXXXXXXX"}
      </p>

      <hr style={{ margin: "10px 0", borderColor: theme.border || "#ccc" }} />

      {/* OBJECTIVE */}
      <h3 style={{ color: textColor }}>🎯 Objective</h3>
      <p style={{ color: textColor }}>{data.objective || "Write your career objective here..."}</p>

      {/* EDUCATION */}
      <h3 style={{ color: textColor }}>🎓 Education</h3>
      <p style={{ color: textColor }}>{data.education || "Your education details..."}</p>

      {/* SKILLS */}
      <h3 style={{ color: textColor }}>🛠️ Skills</h3>
      <p style={{ color: textColor }}>{data.skills || "Your technical skills..."}</p>

      {/* PROJECTS */}
      <h3 style={{ color: textColor }}>🚀 Projects</h3>
      <p style={{ color: textColor }}>{data.projects || "Your projects..."}</p>

      {/* EXPERIENCE */}
      <h3 style={{ color: textColor }}>💼 Experience / Internship</h3>
      <p style={{ color: textColor }}>{data.experience || "Your experience..."}</p>

      {/* CERTIFICATIONS */}
      <h3 style={{ color: textColor }}>📜 Certifications</h3>
      <p style={{ color: textColor }}>{data.certifications || "Your certifications..."}</p>

      {/* LANGUAGES */}
      <h3 style={{ color: textColor }}>🌐 Languages</h3>
      <p style={{ color: textColor }}>{data.languages || "Languages you know..."}</p>

      {/* ACHIEVEMENTS */}
      <h3 style={{ color: textColor }}>🏆 Achievements</h3>
      <p style={{ color: textColor }}>{data.achievements || "Your achievements..."}</p>
    </div>
  );
}