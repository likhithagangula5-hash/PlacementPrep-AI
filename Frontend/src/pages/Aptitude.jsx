import { useEffect, useState } from "react";

const CATEGORIES = [
  {
    id: "math",
    label: "🔢 Mathematics",
    desc: "Arithmetic, algebra, percentages",
    questions: [
      { question: "What is 15 + 25?", options: ["30", "35", "40", "45"], answer: "40" },
      { question: "What is 12 × 8?", options: ["86", "96", "88", "98"], answer: "96" },
      { question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], answer: "12" },
      { question: "If CP = ₹500 and SP = ₹600, profit % is:", options: ["10%", "15%", "20%", "25%"], answer: "20%" },
      { question: "What is 25% of 200?", options: ["40", "50", "60", "75"], answer: "50" },
      { question: "Simplify: 3² + 4²", options: ["14", "25", "49", "7"], answer: "25" },
      { question: "What is the square root of 169?", options: ["11", "12", "13", "14"], answer: "13" },
      { question: "A train travels 300 km in 5 hours. Speed?", options: ["50 km/h", "55 km/h", "60 km/h", "65 km/h"], answer: "60 km/h" },
      { question: "LCM of 4 and 6 is:", options: ["8", "12", "16", "24"], answer: "12" },
      { question: "What is 0.5 × 0.5?", options: ["0.1", "0.25", "0.5", "1.0"], answer: "0.25" },
    ],
  },
  {
    id: "logical",
    label: "🧩 Logical Reasoning",
    desc: "Patterns, sequences, analogies",
    questions: [
      { question: "Which number comes next: 2, 4, 8, 16, ?", options: ["18", "24", "30", "32"], answer: "32" },
      { question: "Find the odd one out: Apple, Mango, Carrot, Banana", options: ["Apple", "Mango", "Carrot", "Banana"], answer: "Carrot" },
      { question: "If CAT = 24, DOG = ?", options: ["26", "27", "28", "30"], answer: "26" },
      { question: "Next in series: Z, X, V, T, ?", options: ["P", "Q", "R", "S"], answer: "R" },
      { question: "A is taller than B. B is taller than C. Who is shortest?", options: ["A", "B", "C", "Cannot say"], answer: "C" },
      { question: "Which number comes next: 1, 4, 9, 16, ?", options: ["20", "24", "25", "30"], answer: "25" },
      { question: "Pointing to a photo: 'He is the son of my father's only son.' Who is in the photo?", options: ["Brother", "Son", "Father", "Nephew"], answer: "Son" },
      { question: "If Monday is day 1, what day is the 15th day?", options: ["Monday", "Sunday", "Saturday", "Tuesday"], answer: "Monday" },
      { question: "Complete: Book : Library :: Painting : ?", options: ["Artist", "Museum", "Canvas", "Colour"], answer: "Museum" },
      { question: "Which comes next: AZ, BY, CX, ?", options: ["DV", "DW", "EW", "EV"], answer: "DW" },
    ],
  },
  {
    id: "verbal",
    label: "📝 Verbal Ability",
    desc: "Synonyms, antonyms, grammar",
    questions: [
      { question: "Choose the synonym of 'Rapid'.", options: ["Slow", "Quick", "Late", "Calm"], answer: "Quick" },
      { question: "Antonym of 'Ancient':", options: ["Old", "Historic", "Modern", "Vintage"], answer: "Modern" },
      { question: "Fill in: She ___ to school every day.", options: ["go", "goes", "gone", "going"], answer: "goes" },
      { question: "Synonym of 'Benevolent':", options: ["Cruel", "Kind", "Angry", "Lazy"], answer: "Kind" },
      { question: "Choose the correctly spelled word:", options: ["Accomodate", "Accommodate", "Acommodate", "Acomodate"], answer: "Accommodate" },
      { question: "Antonym of 'Transparent':", options: ["Clear", "Bright", "Opaque", "Shiny"], answer: "Opaque" },
      { question: "Choose the synonym of 'Diligent':", options: ["Lazy", "Hardworking", "Careless", "Slow"], answer: "Hardworking" },
      { question: "'She is good ___ painting.'", options: ["in", "at", "on", "for"], answer: "at" },
      { question: "Synonym of 'Eloquent':", options: ["Silent", "Fluent", "Rude", "Shy"], answer: "Fluent" },
      { question: "Antonym of 'Expand':", options: ["Grow", "Enlarge", "Contract", "Widen"], answer: "Contract" },
    ],
  },
  {
    id: "data",
    label: "📊 Data Interpretation",
    desc: "Tables, charts, percentages",
    questions: [
      { question: "A store sold 200 items in Jan and 250 in Feb. % increase?", options: ["20%", "25%", "30%", "50%"], answer: "25%" },
      { question: "Average of 10, 20, 30, 40, 50 is:", options: ["25", "30", "35", "40"], answer: "30" },
      { question: "If 60% of students passed, 40 failed. Total students?", options: ["80", "100", "120", "150"], answer: "100" },
      { question: "Ratio of 3:5. If smaller part = 90, larger part = ?", options: ["100", "120", "150", "180"], answer: "150" },
      { question: "Sales: Jan=500, Feb=600, Mar=700. Average monthly sales?", options: ["550", "600", "650", "700"], answer: "600" },
      { question: "A pie chart shows 25% for Sports. In a class of 200, students in Sports?", options: ["40", "50", "60", "75"], answer: "50" },
      { question: "Data: 5, 8, 9, 10, 12. Median is:", options: ["8", "9", "10", "12"], answer: "9" },
      { question: "Revenue doubled from ₹50,000. New revenue?", options: ["₹75,000", "₹1,00,000", "₹1,25,000", "₹1,50,000"], answer: "₹1,00,000" },
      { question: "Mode of: 3, 5, 3, 7, 5, 3, 8 is:", options: ["3", "5", "7", "8"], answer: "3" },
      { question: "If discount = 20% on ₹800, selling price?", options: ["₹600", "₹620", "₹640", "₹660"], answer: "₹640" },
    ],
  },
];

const TIME_PER_QUESTION = 30;

export default function Aptitude({ theme = {} }) {
  const bg      = theme.bg      || "#0b0f19";
  const card    = theme.card    || "#111827";
  const border  = theme.border  || "#1f2937";
  const primary = theme.primary || "#3b82f6";
  const text     = theme.text   || "#e5e7eb";
  const subtext  = theme.subtext || "#9ca3af";
  const success  = theme.success || "#10b981";
  const danger   = theme.danger  || "#ef4444";

  // Screen: "home" | "quiz" | "result"
  const [screen, setScreen] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [answers, setAnswers] = useState([]); // track all answers for review

  const questions = selectedCategory?.questions || [];

  // Timer
  useEffect(() => {
    if (screen !== "quiz" || showResult) return;
    if (timeLeft === 0) {
      // Auto-submit as wrong on timeout
      handleAnswer(null);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, screen, showResult]);

  function startQuiz(category) {
    setSelectedCategory(category);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setTimeLeft(TIME_PER_QUESTION);
    setAnswers([]);
    setScreen("quiz");
  }

  function handleAnswer(option) {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);

    const correct = option === questions[current].answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => [
      ...prev,
      { question: questions[current].question, selected: option, correct: questions[current].answer, isCorrect: correct },
    ]);
  }

  function nextQuestion() {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      // Save stats
      const prev = Number(localStorage.getItem("quizAttempts")) || 0;
      const high = Number(localStorage.getItem("highScore")) || 0;
      localStorage.setItem("quizAttempts", prev + 1);
      localStorage.setItem("highScore", Math.max(high, score + (selected === questions[current].answer ? 1 : 0)));
      setScreen("result");
    }
  }

  const timerColor = timeLeft <= 10 ? danger : timeLeft <= 20 ? "#f59e0b" : primary;
  const timerPct   = (timeLeft / TIME_PER_QUESTION) * 100;

  // ── HOME SCREEN ──────────────────────────────────────────────────────────────
  if (screen === "home") {
    const attempts  = Number(localStorage.getItem("quizAttempts")) || 0;
    const highScore = Number(localStorage.getItem("highScore")) || 0;

    return (
      <div style={{ padding: "28px 24px", background: bg, minHeight: "100vh", color: text, maxWidth: "800px", margin: "0 auto", boxSizing: "border-box" }}>
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ margin: "0 0 6px", color: text, fontSize: "22px" }}>🧠 Aptitude Test</h2>
          <p style={{ margin: 0, color: subtext, fontSize: "14px" }}>
            Choose a category and test your placement readiness
          </p>
        </div>

        {/* Stats bar */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
          {[
            { label: "Total Attempts", value: attempts, icon: "🎯" },
            { label: "High Score", value: `${highScore} / 10`, icon: "🏆" },
            { label: "Categories", value: CATEGORIES.length, icon: "📚" },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, minWidth: "120px", background: card, border: `1px solid ${border}`, borderRadius: "10px", padding: "14px 16px" }}>
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: text }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: subtext }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "14px" }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => startQuiz(cat)}
              style={{
                background: card,
                border: `1px solid ${border}`,
                borderRadius: "12px",
                padding: "20px",
                cursor: "pointer",
                transition: "border-color 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{cat.label.split(" ")[0]}</div>
              <div style={{ fontWeight: "600", color: text, fontSize: "15px", marginBottom: "4px" }}>{cat.label.split(" ").slice(1).join(" ")}</div>
              <div style={{ color: subtext, fontSize: "12px", marginBottom: "12px" }}>{cat.desc}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: subtext }}>{cat.questions.length} questions · 30s each</span>
                <span style={{ fontSize: "12px", color: primary, fontWeight: "600" }}>Start →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── RESULT SCREEN ─────────────────────────────────────────────────────────────
  if (screen === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const grade = pct >= 80 ? { label: "Excellent!", color: success } : pct >= 60 ? { label: "Good Job!", color: primary } : pct >= 40 ? { label: "Keep Practising", color: "#f59e0b" } : { label: "Needs Work", color: danger };

    return (
      <div style={{ padding: "28px 24px", background: bg, minHeight: "100vh", color: text, maxWidth: "800px", margin: "0 auto", boxSizing: "border-box" }}>
        {/* Score card */}
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: "16px", padding: "28px", textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>
            {pct >= 80 ? "🎉" : pct >= 60 ? "👍" : pct >= 40 ? "📚" : "💪"}
          </div>
          <h2 style={{ margin: "0 0 4px", color: grade.color, fontSize: "24px" }}>{grade.label}</h2>
          <p style={{ color: subtext, fontSize: "14px", margin: "0 0 20px" }}>{selectedCategory?.label}</p>
          <div style={{ fontSize: "48px", fontWeight: "700", color: text, lineHeight: 1 }}>{score}<span style={{ fontSize: "24px", color: subtext }}>/{questions.length}</span></div>
          <div style={{ fontSize: "14px", color: subtext, marginTop: "4px" }}>{pct}% correct</div>
        </div>

        {/* Answer review */}
        <h3 style={{ color: text, fontSize: "15px", marginBottom: "12px" }}>Review Answers</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          {answers.map((a, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${a.isCorrect ? success : danger}22`, borderLeft: `3px solid ${a.isCorrect ? success : danger}`, borderRadius: "10px", padding: "12px 16px" }}>
              <div style={{ fontSize: "13px", color: subtext, marginBottom: "4px" }}>Q{i + 1}. {a.question}</div>
              <div style={{ fontSize: "13px" }}>
                {a.isCorrect
                  ? <span style={{ color: success }}>✓ {a.correct}</span>
                  : <><span style={{ color: danger }}>✗ {a.selected || "Timed out"} </span><span style={{ color: success }}>→ {a.correct}</span></>
                }
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => startQuiz(selectedCategory)} style={{ flex: 1, padding: "12px", background: primary, border: "none", borderRadius: "8px", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "14px" }}>
            🔄 Retry Same Category
          </button>
          <button onClick={() => setScreen("home")} style={{ flex: 1, padding: "12px", background: "transparent", border: `1px solid ${border}`, borderRadius: "8px", color: text, fontWeight: "600", cursor: "pointer", fontSize: "14px" }}>
            ← Back to Categories
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ SCREEN ───────────────────────────────────────────────────────────────
  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  return (
    <div style={{ padding: "28px 24px", background: bg, minHeight: "100vh", color: text, maxWidth: "700px", margin: "0 auto", boxSizing: "border-box" }}>

      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <div style={{ fontSize: "12px", color: subtext }}>{selectedCategory?.label}</div>
          <div style={{ fontSize: "13px", color: text, fontWeight: "600" }}>Question {current + 1} of {questions.length}</div>
        </div>
        {/* Timer */}
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: `3px solid ${timerColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", color: timerColor, transition: "border-color 0.3s, color 0.3s" }}>
            {timeLeft}
          </div>
        </div>
        <div style={{ fontSize: "14px", fontWeight: "700", color: primary }}>Score: {score}</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: "4px", background: border, borderRadius: "2px", marginBottom: "24px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: primary, borderRadius: "2px", transition: "width 0.4s ease" }} />
      </div>

      {/* Question card */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: "14px", padding: "24px", marginBottom: "16px" }}>
        <h3 style={{ margin: "0 0 24px", color: text, fontSize: "17px", lineHeight: "1.5" }}>{q.question}</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {q.options.map((opt, i) => {
            let bgColor = "transparent";
            let borderColor = border;
            let textColor = text;

            if (showResult) {
              if (opt === q.answer) {
                bgColor = `${success}22`;
                borderColor = success;
                textColor = success;
              } else if (opt === selected) {
                bgColor = `${danger}22`;
                borderColor = danger;
                textColor = danger;
              }
            }

            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={showResult}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "13px 16px",
                  background: bgColor,
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: "10px",
                  color: textColor,
                  cursor: showResult ? "not-allowed" : "pointer",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.15s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => { if (!showResult) e.currentTarget.style.borderColor = primary; }}
                onMouseLeave={(e) => { if (!showResult) e.currentTarget.style.borderColor = border; }}
              >
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", border: `1.5px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0, color: textColor }}>
                  {["A","B","C","D"][i]}
                </span>
                {opt}
                {showResult && opt === q.answer && <span style={{ marginLeft: "auto" }}>✓</span>}
                {showResult && opt === selected && opt !== q.answer && <span style={{ marginLeft: "auto" }}>✗</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next button */}
      {showResult && (
        <button
          onClick={nextQuestion}
          style={{ width: "100%", padding: "13px", background: primary, border: "none", borderRadius: "10px", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}
        >
          {current + 1 < questions.length ? "Next Question →" : "See Results 🎉"}
        </button>
      )}

      {/* Quit */}
      <button
        onClick={() => setScreen("home")}
        style={{ display: "block", margin: "12px auto 0", background: "none", border: "none", color: subtext, cursor: "pointer", fontSize: "13px" }}
      >
        ✕ Quit Quiz
      </button>
    </div>
  );
}