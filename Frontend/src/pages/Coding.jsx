import { useEffect, useState } from "react";

const CATEGORIES = [
  {
    id: "python",
    label: "🐍 Python",
    desc: "Syntax, functions, data structures",
    questions: [
      { question: "Which keyword is used to define a function in Python?", options: ["function", "def", "func", "define"], answer: "def" },
      { question: "What is the output of: print(type([]))?", options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"], answer: "<class 'list'>" },
      { question: "Which method adds an element to the end of a list?", options: ["add()", "insert()", "append()", "push()"], answer: "append()" },
      { question: "What does 'len()' return for the string 'Hello'?", options: ["4", "5", "6", "Error"], answer: "5" },
      { question: "Which symbol is used for single-line comments in Python?", options: ["//", "/*", "#", "--"], answer: "#" },
      { question: "What is the output of: 3 ** 2 in Python?", options: ["6", "8", "9", "Error"], answer: "9" },
      { question: "Which keyword is used to handle exceptions in Python?", options: ["catch", "except", "handle", "error"], answer: "except" },
      { question: "What does 'range(5)' produce?", options: ["[1,2,3,4,5]", "[0,1,2,3,4]", "[0,1,2,3,4,5]", "[1,2,3,4]"], answer: "[0,1,2,3,4]" },
      { question: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Tuple", "Set"], answer: "Tuple" },
      { question: "What is a lambda function?", options: ["A named function", "An anonymous function", "A recursive function", "A class method"], answer: "An anonymous function" },
    ],
  },
  {
    id: "oop",
    label: "🧱 OOP Concepts",
    desc: "Classes, inheritance, polymorphism",
    questions: [
      { question: "Which of the following is NOT an OOP concept?", options: ["Encapsulation", "Inheritance", "Compilation", "Polymorphism"], answer: "Compilation" },
      { question: "What is encapsulation?", options: ["Hiding data within a class", "Inheriting from parent", "Overriding methods", "Creating objects"], answer: "Hiding data within a class" },
      { question: "Which Java keyword is used for inheritance?", options: ["implements", "inherits", "extends", "super"], answer: "extends" },
      { question: "What is method overriding?", options: ["Same method name, different class", "Different method name, same class", "Same method, same class", "None of the above"], answer: "Same method name, different class" },
      { question: "Which concept allows one interface, many implementations?", options: ["Encapsulation", "Abstraction", "Polymorphism", "Inheritance"], answer: "Polymorphism" },
      { question: "What is a constructor?", options: ["A method to destroy objects", "A method called when object is created", "A static method", "An abstract method"], answer: "A method called when object is created" },
      { question: "Which keyword refers to the current object in Java?", options: ["self", "this", "current", "object"], answer: "this" },
      { question: "Abstract class in Java can be instantiated?", options: ["Yes", "No", "Only with interface", "Depends on JVM"], answer: "No" },
      { question: "What is multiple inheritance?", options: ["A class with multiple methods", "A class extending multiple classes", "Multiple objects of same class", "None"], answer: "A class extending multiple classes" },
      { question: "Which access modifier makes a member accessible only within its class?", options: ["public", "protected", "private", "default"], answer: "private" },
    ],
  },
  {
    id: "dsa",
    label: "📊 Data Structures",
    desc: "Arrays, stacks, queues, trees",
    questions: [
      { question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Array", "Linked List"], answer: "Stack" },
      { question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
      { question: "Time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: "O(log n)" },
      { question: "Which traversal visits root first?", options: ["Inorder", "Postorder", "Preorder", "Level order"], answer: "Preorder" },
      { question: "What is the worst case time complexity of bubble sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], answer: "O(n²)" },
      { question: "A full binary tree with 7 nodes has how many leaf nodes?", options: ["2", "3", "4", "5"], answer: "4" },
      { question: "Which data structure is used for BFS?", options: ["Stack", "Queue", "Tree", "Heap"], answer: "Queue" },
      { question: "Which data structure is used for DFS?", options: ["Queue", "Stack", "Array", "Linked List"], answer: "Stack" },
      { question: "What is the space complexity of merge sort?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], answer: "O(n)" },
      { question: "In a hash table, collision is resolved by:", options: ["Binary search", "Chaining or open addressing", "Sorting", "Recursion"], answer: "Chaining or open addressing" },
    ],
  },
  {
    id: "sql",
    label: "🗄️ SQL & Databases",
    desc: "Queries, joins, indexing",
    questions: [
      { question: "Which SQL command is used to retrieve data?", options: ["GET", "SELECT", "FETCH", "SHOW"], answer: "SELECT" },
      { question: "Which clause filters rows in SQL?", options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"], answer: "WHERE" },
      { question: "Which join returns all rows from both tables?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], answer: "FULL OUTER JOIN" },
      { question: "Which SQL command removes all rows from a table without deleting it?", options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"], answer: "TRUNCATE" },
      { question: "Primary key constraint ensures:", options: ["Unique values only", "Unique + Not Null", "Not Null only", "Foreign reference"], answer: "Unique + Not Null" },
      { question: "Which aggregate function returns the number of rows?", options: ["SUM()", "AVG()", "COUNT()", "MAX()"], answer: "COUNT()" },
      { question: "Which keyword is used to sort results in SQL?", options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE BY"], answer: "ORDER BY" },
      { question: "What does HAVING clause do?", options: ["Filters rows before grouping", "Filters groups after GROUP BY", "Sorts the result", "Joins tables"], answer: "Filters groups after GROUP BY" },
      { question: "Which normal form removes partial dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: "2NF" },
      { question: "Which SQL statement is used to add a new row?", options: ["ADD", "INSERT INTO", "APPEND", "UPDATE"], answer: "INSERT INTO" },
    ],
  },
  {
    id: "webdev",
    label: "🌐 Web Development",
    desc: "HTML, CSS, JavaScript basics",
    questions: [
      { question: "Which HTML tag is used to link a CSS file?", options: ["<style>", "<script>", "<link>", "<css>"], answer: "<link>" },
      { question: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "foreground"], answer: "color" },
      { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Dynamic Object Module"], answer: "Document Object Model" },
      { question: "Which JS method selects an element by ID?", options: ["getElement()", "querySelector()", "getElementById()", "selectById()"], answer: "getElementById()" },
      { question: "What is the correct way to write a JS arrow function?", options: ["function() =>", "() =>", "=> ()", "func =>"], answer: "() =>" },
      { question: "Which HTTP method is used to send data to a server?", options: ["GET", "POST", "FETCH", "SEND"], answer: "POST" },
      { question: "What does CSS 'flex' do?", options: ["Creates a grid", "Enables flexbox layout", "Makes text flexible", "Adds animation"], answer: "Enables flexbox layout" },
      { question: "Which tag makes text bold in HTML?", options: ["<i>", "<em>", "<b>", "<strong> or <b>"], answer: "<strong> or <b>" },
      { question: "What is 'null' in JavaScript?", options: ["Undefined variable", "Intentional absence of value", "An error", "Zero"], answer: "Intentional absence of value" },
      { question: "Which JS method converts JSON string to object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.objectify()"], answer: "JSON.parse()" },
    ],
  },
];

const TIME_PER_QUESTION = 30;

export default function Coding({ theme = {} }) {
  const bg      = theme.bg      || "#0b0f19";
  const card    = theme.card    || "#111827";
  const border  = theme.border  || "#1f2937";
  const primary = theme.primary || "#3b82f6";
  const text    = theme.text    || "#e5e7eb";
  const subtext = theme.subtext || "#9ca3af";
  const success = theme.success || "#10b981";
  const danger  = theme.danger  || "#ef4444";

  const [screen, setScreen] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [answers, setAnswers] = useState([]);

  const questions = selectedCategory?.questions || [];

  useEffect(() => {
    if (screen !== "quiz" || showResult) return;
    if (timeLeft === 0) { handleAnswer(null); return; }
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
    setAnswers((prev) => [...prev, {
      question: questions[current].question,
      selected: option,
      correct: questions[current].answer,
      isCorrect: correct,
    }]);
  }

  function nextQuestion() {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
      setTimeLeft(TIME_PER_QUESTION);
    } else {
      const prevAttempts = Number(localStorage.getItem("codingAttempts")) || 0;
      const prevHigh = Number(localStorage.getItem("codingHighScore")) || 0;
      localStorage.setItem("codingAttempts", prevAttempts + 1);
      localStorage.setItem("codingHighScore", Math.max(prevHigh, score));
      setScreen("result");
    }
  }

  const timerColor = timeLeft <= 10 ? danger : timeLeft <= 20 ? "#f59e0b" : primary;
  const progress = (current / questions.length) * 100;

  // ── HOME ──────────────────────────────────────────────────────────────────────
  if (screen === "home") {
    const attempts  = Number(localStorage.getItem("codingAttempts")) || 0;
    const highScore = Number(localStorage.getItem("codingHighScore")) || 0;

    return (
      <div style={{ padding: "28px 24px", background: bg, minHeight: "100vh", color: text, maxWidth: "800px", margin: "0 auto", boxSizing: "border-box" }}>
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ margin: "0 0 6px", color: text, fontSize: "22px" }}>💻 Coding Quiz</h2>
          <p style={{ margin: 0, color: subtext, fontSize: "14px" }}>Test your programming knowledge across topics</p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
          {[
            { label: "Total Attempts", value: attempts, icon: "🎯" },
            { label: "High Score", value: `${highScore} / 10`, icon: "🏆" },
            { label: "Topics", value: CATEGORIES.length, icon: "📚" },
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
              style={{ background: card, border: `1px solid ${border}`, borderRadius: "12px", padding: "20px", cursor: "pointer", transition: "border-color 0.15s, transform 0.15s" }}
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

  // ── RESULT ────────────────────────────────────────────────────────────────────
  if (screen === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const grade = pct >= 80 ? { label: "Excellent!", color: success } : pct >= 60 ? { label: "Good Job!", color: primary } : pct >= 40 ? { label: "Keep Practising", color: "#f59e0b" } : { label: "Needs Work", color: danger };

    return (
      <div style={{ padding: "28px 24px", background: bg, minHeight: "100vh", color: text, maxWidth: "800px", margin: "0 auto", boxSizing: "border-box" }}>
        <div style={{ background: card, border: `1px solid ${border}`, borderRadius: "16px", padding: "28px", textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>{pct >= 80 ? "🎉" : pct >= 60 ? "👍" : pct >= 40 ? "📚" : "💪"}</div>
          <h2 style={{ margin: "0 0 4px", color: grade.color, fontSize: "24px" }}>{grade.label}</h2>
          <p style={{ color: subtext, fontSize: "14px", margin: "0 0 20px" }}>{selectedCategory?.label}</p>
          <div style={{ fontSize: "48px", fontWeight: "700", color: text, lineHeight: 1 }}>{score}<span style={{ fontSize: "24px", color: subtext }}>/{questions.length}</span></div>
          <div style={{ fontSize: "14px", color: subtext, marginTop: "4px" }}>{pct}% correct</div>
        </div>

        <h3 style={{ color: text, fontSize: "15px", marginBottom: "12px" }}>Review Answers</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          {answers.map((a, i) => (
            <div key={i} style={{ background: card, border: `1px solid ${a.isCorrect ? success : danger}22`, borderLeft: `3px solid ${a.isCorrect ? success : danger}`, borderRadius: "10px", padding: "12px 16px" }}>
              <div style={{ fontSize: "13px", color: subtext, marginBottom: "4px" }}>Q{i + 1}. {a.question}</div>
              <div style={{ fontSize: "13px" }}>
                {a.isCorrect
                  ? <span style={{ color: success }}>✓ {a.correct}</span>
                  : <><span style={{ color: danger }}>✗ {a.selected || "Timed out"} </span><span style={{ color: success }}>→ {a.correct}</span></>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => startQuiz(selectedCategory)} style={{ flex: 1, padding: "12px", background: primary, border: "none", borderRadius: "8px", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "14px" }}>
            🔄 Retry Same Topic
          </button>
          <button onClick={() => setScreen("home")} style={{ flex: 1, padding: "12px", background: "transparent", border: `1px solid ${border}`, borderRadius: "8px", color: text, fontWeight: "600", cursor: "pointer", fontSize: "14px" }}>
            ← Back to Topics
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────────────
  const q = questions[current];

  return (
    <div style={{ padding: "28px 24px", background: bg, minHeight: "100vh", color: text, maxWidth: "700px", margin: "0 auto", boxSizing: "border-box" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <div style={{ fontSize: "12px", color: subtext }}>{selectedCategory?.label}</div>
          <div style={{ fontSize: "13px", color: text, fontWeight: "600" }}>Question {current + 1} of {questions.length}</div>
        </div>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: `3px solid ${timerColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", color: timerColor, transition: "border-color 0.3s, color 0.3s" }}>
          {timeLeft}
        </div>
        <div style={{ fontSize: "14px", fontWeight: "700", color: primary }}>Score: {score}</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: "4px", background: border, borderRadius: "2px", marginBottom: "24px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: primary, borderRadius: "2px", transition: "width 0.4s ease" }} />
      </div>

      {/* Question */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: "14px", padding: "24px", marginBottom: "16px" }}>
        <h3 style={{ margin: "0 0 24px", color: text, fontSize: "17px", lineHeight: "1.5", fontFamily: "monospace" }}>
          {q.question}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {q.options.map((opt, i) => {
            let bgColor = "transparent";
            let borderCol = border;
            let textColor = text;

            if (showResult) {
              if (opt === q.answer) { bgColor = `${success}22`; borderCol = success; textColor = success; }
              else if (opt === selected) { bgColor = `${danger}22`; borderCol = danger; textColor = danger; }
            }

            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={showResult}
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "13px 16px", background: bgColor, border: `1.5px solid ${borderCol}`, borderRadius: "10px", color: textColor, cursor: showResult ? "not-allowed" : "pointer", textAlign: "left", fontSize: "14px", fontWeight: "500", transition: "all 0.15s", fontFamily: "inherit" }}
                onMouseEnter={(e) => { if (!showResult) e.currentTarget.style.borderColor = primary; }}
                onMouseLeave={(e) => { if (!showResult) e.currentTarget.style.borderColor = border; }}
              >
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", border: `1.5px solid ${borderCol}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0, color: textColor }}>
                  {["A","B","C","D"][i]}
                </span>
                <code style={{ fontFamily: "monospace", fontSize: "13px" }}>{opt}</code>
                {showResult && opt === q.answer && <span style={{ marginLeft: "auto" }}>✓</span>}
                {showResult && opt === selected && opt !== q.answer && <span style={{ marginLeft: "auto" }}>✗</span>}
              </button>
            );
          })}
        </div>
      </div>

      {showResult && (
        <button onClick={nextQuestion} style={{ width: "100%", padding: "13px", background: primary, border: "none", borderRadius: "10px", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}>
          {current + 1 < questions.length ? "Next Question →" : "See Results 🎉"}
        </button>
      )}

      <button onClick={() => setScreen("home")} style={{ display: "block", margin: "12px auto 0", background: "none", border: "none", color: subtext, cursor: "pointer", fontSize: "13px" }}>
        ✕ Quit Quiz
      </button>
    </div>
  );
}