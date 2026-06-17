import { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DEFAULT_FORM = {
  name: "",
  email: "",
  phone: "",
  objective: "",
  education: "",
  skills: "",
  projects: "",
  experience: "",
  certifications: "",
  languages: "",
  achievements: "",
};

const FIELD_GROUPS = [
  {
    title: "Contact",
    fields: [
      { name: "name", label: "Full Name", placeholder: "e.g. Ananya Sharma", type: "text" },
      { name: "email", label: "Email Address", placeholder: "name@example.com", type: "email" },
      { name: "phone", label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
    ],
  },
  {
    title: "Profile",
    fields: [
      {
        name: "objective",
        label: "Career Objective",
        placeholder: "A focused 2-3 line summary of your target role, strengths, and career direction.",
        multiline: true,
      },
      {
        name: "education",
        label: "Education",
        placeholder: "Degree, college, graduation year, CGPA, relevant coursework.",
        multiline: true,
      },
    ],
  },
  {
    title: "Experience",
    fields: [
      {
        name: "skills",
        label: "Technical Skills",
        placeholder: "Java, Python, React, SQL, Data Structures, Git",
        multiline: true,
      },
      {
        name: "projects",
        label: "Projects",
        placeholder: "Project name - tech stack - measurable result or responsibility.",
        multiline: true,
      },
      {
        name: "experience",
        label: "Experience / Internship",
        placeholder: "Company, role, dates, responsibilities, impact.",
        multiline: true,
      },
    ],
  },
  {
    title: "Extras",
    fields: [
      {
        name: "certifications",
        label: "Certifications",
        placeholder: "Certification name, provider, year.",
        multiline: true,
      },
      {
        name: "languages",
        label: "Languages",
        placeholder: "English, Hindi, Kannada",
        multiline: true,
      },
      {
        name: "achievements",
        label: "Achievements",
        placeholder: "Awards, hackathons, leadership, measurable accomplishments.",
        multiline: true,
      },
    ],
  },
];

export default function Resume({ theme = {} }) {
  const previewRef = useRef(null);
  const isDark = getIsDark(theme);
  const [form, setForm] = useState(() => getInitialForm());
  const [isDownloading, setIsDownloading] = useState(false);

  const completedFields = useMemo(
    () => Object.values(form).filter((value) => value.trim().length > 0).length,
    [form]
  );
  const completionPct = Math.round((completedFields / Object.keys(DEFAULT_FORM).length) * 100);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(form));
  }, [form]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function downloadPDF() {
    const input = previewRef.current;
    if (!input) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${getFileName(form.name)}.pdf`);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div style={pageStyle(isDark, theme)} className="resume-builder-page">
      <section style={heroStyle(isDark, theme)}>
        <div>
          <p style={eyebrowStyle(theme)}>Placement Resume Studio</p>
          <h1 style={titleStyle(theme)}>Resume Builder</h1>
          <p style={subtitleStyle(theme)}>Create a sharp, recruiter-friendly resume for campus placements.</p>
        </div>

        <div style={scorePanelStyle(isDark, theme)}>
          <span style={scoreLabelStyle(theme)}>Profile Strength</span>
          <strong style={scoreValueStyle(theme)}>{completionPct}%</strong>
          <div style={progressTrackStyle(isDark, theme)}>
            <div style={progressFillStyle(theme, completionPct)} />
          </div>
        </div>
      </section>

      <div style={workspaceStyle} className="resume-workspace">
        <section style={editorPanelStyle(isDark, theme)} className="resume-panel">
          <div style={panelHeaderStyle}>
            <div>
              <h2 style={panelTitleStyle(theme)}>Details</h2>
              <p style={panelMetaStyle(theme)}>{completedFields} of {Object.keys(DEFAULT_FORM).length} fields complete</p>
            </div>
            <button
              onClick={downloadPDF}
              style={downloadButtonStyle(theme)}
              className="resume-action-button"
              disabled={isDownloading}
            >
              {isDownloading ? "Preparing PDF..." : "Download PDF"}
            </button>
          </div>

          {FIELD_GROUPS.map((group) => (
            <div key={group.title} style={formSectionStyle(theme)}>
              <div style={sectionHeaderStyle}>
                <h3 style={sectionTitleStyle(theme)}>{group.title}</h3>
                <span style={sectionCountStyle(theme)}>
                  {getCompletedInGroup(form, group.fields)}/{group.fields.length}
                </span>
              </div>

              <div style={fieldGridStyle(group.fields.length)}>
                {group.fields.map((field) => (
                  <label key={field.name} style={fieldStyle}>
                    <span style={labelStyle(theme)}>{field.label}</span>
                    {field.multiline ? (
                      <textarea
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        style={textareaStyle(isDark, theme)}
                      />
                    ) : (
                      <input
                        name={field.name}
                        type={field.type}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        style={inputStyle(isDark, theme)}
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>

        <aside style={previewPanelStyle(isDark, theme)} className="resume-panel resume-preview-panel">
          <div style={previewHeaderStyle}>
            <div>
              <h2 style={panelTitleStyle(theme)}>Live Preview</h2>
              <p style={panelMetaStyle(theme)}>A4 printable layout</p>
            </div>
          </div>

          <div style={paperShellStyle(isDark, theme)}>
            <div ref={previewRef} style={resumePaperStyle}>
              <ProfessionalResumePreview data={form} />
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .resume-builder-page input::placeholder,
        .resume-builder-page textarea::placeholder {
          color: var(--subtext);
          opacity: 0.72;
        }

        .resume-builder-page input:focus,
        .resume-builder-page textarea:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 16%, transparent);
        }

        .resume-builder-page textarea {
          resize: vertical;
        }

        .resume-action-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px color-mix(in srgb, var(--primary) 28%, transparent);
        }

        .resume-action-button:disabled {
          cursor: not-allowed;
          opacity: 0.72;
        }

        @media (max-width: 1180px) {
          .resume-workspace {
            grid-template-columns: 1fr !important;
          }

          .resume-preview-panel {
            position: static !important;
          }
        }

        @media (max-width: 720px) {
          .resume-builder-page {
            padding: 22px 14px !important;
          }

          .resume-panel {
            padding: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}

function ProfessionalResumePreview({ data }) {
  const contactItems = [
    data.email || "email@example.com",
    data.phone || "+91 98765 43210",
  ];

  return (
    <article style={previewContentStyle}>
      <header style={resumeHeaderStyle}>
        <h1 style={resumeNameStyle}>{data.name || "Your Name"}</h1>
        <p style={resumeContactStyle}>{contactItems.join(" | ")}</p>
      </header>

      <PreviewSection title="Profile" value={data.objective} fallback="Write a concise career objective that matches your target role." />
      <PreviewSection title="Education" value={data.education} fallback="Your degree, college, graduation year, CGPA, and relevant coursework." />
      <PreviewSection title="Technical Skills" value={data.skills} fallback="List your programming languages, tools, frameworks, and core CS skills." variant="skills" />
      <PreviewSection title="Projects" value={data.projects} fallback="Add projects with tech stack, your role, and measurable outcomes." />
      <PreviewSection title="Experience / Internship" value={data.experience} fallback="Add internships, responsibilities, tools used, and business impact." />
      <PreviewSection title="Certifications" value={data.certifications} fallback="Add relevant certifications and issuing platforms." />
      <PreviewSection title="Languages" value={data.languages} fallback="Add languages you can speak or write professionally." variant="inline" />
      <PreviewSection title="Achievements" value={data.achievements} fallback="Add awards, hackathons, leadership roles, or notable accomplishments." />
    </article>
  );
}

function PreviewSection({ title, value, fallback, variant }) {
  const content = value.trim();

  return (
    <section style={resumeSectionStyle}>
      <h2 style={resumeSectionTitleStyle}>{title}</h2>
      {variant === "skills"
        ? renderSkills(content, fallback)
        : renderTextBlock(content, fallback, variant)}
    </section>
  );
}

function renderTextBlock(value, fallback, variant) {
  if (!value) {
    return <p style={resumeMutedTextStyle}>{fallback}</p>;
  }

  const lines = value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (variant === "inline" || lines.length <= 1) {
    return <p style={resumeBodyTextStyle}>{value}</p>;
  }

  return (
    <ul style={resumeListStyle}>
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

function renderSkills(value, fallback) {
  if (!value) {
    return <p style={resumeMutedTextStyle}>{fallback}</p>;
  }

  const skills = value.split(/[,;\n]/).map((skill) => skill.trim()).filter(Boolean);
  if (!skills.length) {
    return <p style={resumeBodyTextStyle}>{value}</p>;
  }

  return (
    <div style={skillsListStyle}>
      {skills.map((skill) => (
        <span key={skill} style={skillPillStyle}>{skill}</span>
      ))}
    </div>
  );
}

function getInitialForm() {
  try {
    const saved = JSON.parse(localStorage.getItem("resumeData"));
    return saved ? { ...DEFAULT_FORM, ...saved } : DEFAULT_FORM;
  } catch {
    return DEFAULT_FORM;
  }
}

function getIsDark(theme) {
  return (
    theme.mode === "dark" ||
    theme.isDark ||
    theme.bg === "#0b0f19" ||
    theme.bg === "#0f172a"
  );
}

function getSubtext(theme) {
  return theme.subtext || theme.textSecondary || "#64748b";
}

function getCompletedInGroup(form, fields) {
  return fields.filter((field) => form[field.name].trim().length > 0).length;
}

function getFileName(name) {
  const safeName = name.trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  return safeName || "resume";
}

const pageStyle = (isDark, theme) => ({
  minHeight: "100vh",
  width: "100%",
  padding: "30px",
  boxSizing: "border-box",
  background: theme.bg || (isDark ? "#0b0f19" : "#f8fafc"),
  color: theme.text || (isDark ? "#e5e7eb" : "#111827"),
  fontFamily: "'Inter', system-ui, Arial, sans-serif",
});

const heroStyle = (isDark, theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "24px",
  padding: "28px",
  marginBottom: "24px",
  border: `1px solid ${theme.border || (isDark ? "#1f2937" : "#e5e7eb")}`,
  borderRadius: "12px",
  background: theme.card || (isDark ? "#111827" : "#ffffff"),
  boxShadow: isDark ? "0 18px 40px rgba(0, 0, 0, 0.24)" : "0 18px 40px rgba(15, 23, 42, 0.08)",
  flexWrap: "wrap",
});

const eyebrowStyle = (theme) => ({
  color: theme.primary || "#2563eb",
  fontSize: "0.82rem",
  fontWeight: "700",
  letterSpacing: 0,
  margin: "0 0 8px",
  textTransform: "uppercase",
});

const titleStyle = (theme) => ({
  color: theme.text || "#111827",
  fontSize: "2.4rem",
  lineHeight: 1.1,
  margin: "0 0 10px",
});

const subtitleStyle = (theme) => ({
  color: getSubtext(theme),
  fontSize: "1rem",
  margin: 0,
});

const scorePanelStyle = (isDark, theme) => ({
  minWidth: "220px",
  padding: "16px",
  borderRadius: "10px",
  border: `1px solid ${theme.border || (isDark ? "#1f2937" : "#e5e7eb")}`,
  background: isDark ? "#0f172a" : "#f8fafc",
});

const scoreLabelStyle = (theme) => ({
  display: "block",
  color: getSubtext(theme),
  fontSize: "0.86rem",
  marginBottom: "6px",
});

const scoreValueStyle = (theme) => ({
  display: "block",
  color: theme.text || "#111827",
  fontSize: "1.9rem",
  lineHeight: 1,
  marginBottom: "12px",
});

const progressTrackStyle = (isDark, theme) => ({
  height: "8px",
  borderRadius: "999px",
  background: isDark ? "#1f2937" : "#e5e7eb",
  overflow: "hidden",
  border: `1px solid ${theme.border || (isDark ? "#263244" : "#dbe3ef")}`,
});

const progressFillStyle = (theme, completionPct) => ({
  width: `${completionPct}%`,
  height: "100%",
  background: theme.primary || "#2563eb",
  borderRadius: "999px",
  transition: "width 0.25s ease",
});

const workspaceStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(340px, 0.92fr) minmax(440px, 1.08fr)",
  gap: "24px",
  alignItems: "start",
};

const editorPanelStyle = (isDark, theme) => ({
  padding: "24px",
  borderRadius: "12px",
  border: `1px solid ${theme.border || (isDark ? "#1f2937" : "#e5e7eb")}`,
  background: theme.card || (isDark ? "#111827" : "#ffffff"),
  boxShadow: isDark ? "0 18px 40px rgba(0, 0, 0, 0.22)" : "0 18px 40px rgba(15, 23, 42, 0.08)",
});

const previewPanelStyle = (isDark, theme) => ({
  ...editorPanelStyle(isDark, theme),
  position: "sticky",
  top: "24px",
});

const panelHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  marginBottom: "18px",
  flexWrap: "wrap",
};

const previewHeaderStyle = {
  ...panelHeaderStyle,
  marginBottom: "16px",
};

const panelTitleStyle = (theme) => ({
  color: theme.text || "#111827",
  fontSize: "1.25rem",
  margin: "0 0 4px",
});

const panelMetaStyle = (theme) => ({
  color: getSubtext(theme),
  fontSize: "0.92rem",
  margin: 0,
});

const downloadButtonStyle = (theme) => ({
  border: "none",
  borderRadius: "8px",
  background: theme.primary || "#2563eb",
  color: "#ffffff",
  cursor: "pointer",
  fontSize: "0.96rem",
  fontWeight: "700",
  padding: "12px 16px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
});

const formSectionStyle = (theme) => ({
  borderTop: `1px solid ${theme.border || "#e5e7eb"}`,
  paddingTop: "20px",
  marginTop: "20px",
});

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "14px",
};

const sectionTitleStyle = (theme) => ({
  color: theme.text || "#111827",
  fontSize: "1rem",
  margin: 0,
});

const sectionCountStyle = (theme) => ({
  color: theme.primary || "#2563eb",
  fontSize: "0.82rem",
  fontWeight: "700",
});

const fieldGridStyle = (count) => ({
  display: "grid",
  gridTemplateColumns: count >= 3 ? "repeat(auto-fit, minmax(180px, 1fr))" : "1fr",
  gap: "14px",
});

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
};

const labelStyle = (theme) => ({
  color: theme.text || "#111827",
  fontSize: "0.9rem",
  fontWeight: "700",
});

const inputStyle = (isDark, theme) => ({
  width: "100%",
  padding: "12px 13px",
  borderRadius: "8px",
  border: `1px solid ${theme.border || (isDark ? "#1f2937" : "#e5e7eb")}`,
  background: isDark ? "#0f172a" : "#ffffff",
  color: theme.text || (isDark ? "#e5e7eb" : "#111827"),
  fontSize: "0.96rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
});

const textareaStyle = (isDark, theme) => ({
  ...inputStyle(isDark, theme),
  minHeight: "98px",
  lineHeight: 1.5,
});

const paperShellStyle = (isDark, theme) => ({
  padding: "18px",
  borderRadius: "10px",
  background: isDark ? "#0f172a" : "#f1f5f9",
  border: `1px solid ${theme.border || (isDark ? "#1f2937" : "#e5e7eb")}`,
  overflowX: "auto",
});

const resumePaperStyle = {
  width: "794px",
  minHeight: "1123px",
  margin: "0 auto",
  background: "#ffffff",
  color: "#111827",
  boxSizing: "border-box",
  boxShadow: "0 18px 36px rgba(15, 23, 42, 0.18)",
};

const previewContentStyle = {
  padding: "52px 58px",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "13.5px",
  lineHeight: 1.55,
};

const resumeHeaderStyle = {
  borderBottom: "3px solid #2563eb",
  paddingBottom: "18px",
  marginBottom: "24px",
};

const resumeNameStyle = {
  color: "#0f172a",
  fontSize: "34px",
  lineHeight: 1.1,
  margin: "0 0 8px",
  textTransform: "uppercase",
};

const resumeContactStyle = {
  color: "#475569",
  margin: 0,
  fontSize: "13px",
};

const resumeSectionStyle = {
  marginBottom: "18px",
};

const resumeSectionTitleStyle = {
  color: "#1d4ed8",
  borderBottom: "1px solid #cbd5e1",
  fontSize: "13px",
  letterSpacing: 0,
  margin: "0 0 8px",
  paddingBottom: "4px",
  textTransform: "uppercase",
};

const resumeBodyTextStyle = {
  color: "#1e293b",
  margin: 0,
  whiteSpace: "pre-line",
};

const resumeMutedTextStyle = {
  ...resumeBodyTextStyle,
  color: "#94a3b8",
  fontStyle: "italic",
};

const resumeListStyle = {
  color: "#1e293b",
  margin: 0,
  paddingLeft: "18px",
};

const skillsListStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
};

const skillPillStyle = {
  border: "1px solid #bfdbfe",
  background: "#eff6ff",
  color: "#1e3a8a",
  borderRadius: "999px",
  padding: "3px 8px",
  fontSize: "12px",
};
