import { useEffect, useState } from "react";

const QUESTIONS = [
  // ── HR ───────────────────────────────────────────────────────────────────────
  { type: "HR", difficulty: "Easy", question: "Tell me about yourself.", answer: "Structure your answer as: current status (final year B.Tech CS) → key skills (AI/ML, Python, web dev) → relevant projects/internships → career goal. Keep it under 2 minutes. Example: 'I'm a final year CS student specializing in AI & ML. I've built projects like an ambulance route optimizer using Python and Google Maps API. I'm passionate about applying AI to solve real-world problems and excited to contribute to your team.'" },
  { type: "HR", difficulty: "Easy", question: "Why should we hire you?", answer: "Focus on 3 things: your relevant skills, your quick learning ability, and specific value you bring. Example: 'I bring strong fundamentals in Python and ML, hands-on project experience, and a problem-solving mindset. I learn fast, adapt quickly, and I'm genuinely passionate about building impactful solutions — not just completing tasks.'" },
  { type: "HR", difficulty: "Easy", question: "What are your strengths?", answer: "Pick 2–3 real strengths with examples. Good choices: problem-solving, adaptability, self-learning, attention to detail. Example: 'My biggest strength is self-learning — I taught myself Flask and Google Maps API to build a route optimization system. I'm also strong at breaking complex problems into manageable steps.'" },
  { type: "HR", difficulty: "Easy", question: "What is your weakness?", answer: "Be honest but show self-awareness and improvement. Avoid fake weaknesses like 'I work too hard.' Example: 'I sometimes spend too much time perfecting details. I've been working on this by setting time limits for tasks and using the 80/20 rule — focus on what delivers the most value first.'" },
  { type: "HR", difficulty: "Easy", question: "Where do you see yourself in 5 years?", answer: "Show ambition + alignment with the company. Example: 'In 5 years, I see myself as a skilled ML engineer who has shipped real products that make a difference. I want to grow from building features to leading technical decisions, and ideally mentor junior developers.'" },
  { type: "HR", difficulty: "Medium", question: "Describe a challenge you faced and how you overcame it.", answer: "Use the STAR method: Situation → Task → Action → Result. Example: 'In my final year project, our ambulance routing system had to handle real-time traffic data but the API kept failing. I implemented a fallback caching system and added retry logic, which reduced failures by 90% and made the demo run smoothly.'" },
  { type: "HR", difficulty: "Medium", question: "How do you handle pressure and tight deadlines?", answer: "Show a real strategy. Example: 'I prioritize tasks by impact, break big work into smaller milestones, and communicate early if something is at risk. During my project submission, I had 3 deliverables in one week — I made a daily checklist, focused on the critical path, and delivered on time.'" },
  { type: "HR", difficulty: "Medium", question: "Are you a team player or prefer working alone?", answer: "Show flexibility. Example: 'I enjoy both. I work well in teams — I communicate clearly and adapt to others' working styles. But I'm also comfortable working independently on focused tasks. In my projects, I've done both: solo coding sessions and collaborative planning sessions with teammates.'" },
  { type: "HR", difficulty: "Medium", question: "Why do you want to join our company?", answer: "Research the company before the interview. Mention: their product/mission, tech stack, growth culture. Example structure: 'I admire [Company]'s work on [specific product]. Your focus on [value/mission] aligns with my goal of [your goal]. I also want to grow in [specific area] and believe your team would accelerate that.'" },
  { type: "HR", difficulty: "Hard", question: "Tell me about a time you failed. What did you learn?", answer: "Be honest and show growth. Example: 'In my second year, I underestimated the complexity of a group project and didn't communicate early enough that we were behind. We missed the initial deadline. I learned to flag risks early, break work into smaller checkpoints, and never assume things will work out without verification.'" },
  { type: "HR", difficulty: "Hard", question: "How do you handle criticism or negative feedback?", answer: "Show maturity. Example: 'I treat feedback as data, not as a personal attack. When a professor criticized my project architecture, I asked clarifying questions to understand the exact concern, then went away, thought about it, and came back with a revised design. Good feedback has made my work significantly better.'" },
  { type: "HR", difficulty: "Hard", question: "What motivates you?", answer: "Be specific and genuine. Example: 'I'm motivated by seeing something I built actually work — especially when it solves a real problem. When my ambulance routing system reduced estimated response time in our simulation, that feeling of impact is what drives me. I also get motivated by learning something genuinely new.'" },

  // ── Technical ─────────────────────────────────────────────────────────────────
  { type: "Technical", difficulty: "Easy", question: "What is OOP? Explain its 4 pillars.", answer: "OOP = Object-Oriented Programming. The 4 pillars are:\n1. Encapsulation — bundling data + methods in a class, hiding internals.\n2. Abstraction — showing only what's necessary, hiding complexity.\n3. Inheritance — a class inheriting properties/methods from another class.\n4. Polymorphism — same method name behaves differently in different classes (method overriding/overloading)." },
  { type: "Technical", difficulty: "Easy", question: "What is DBMS? How is it different from a file system?", answer: "DBMS (Database Management System) stores, retrieves, and manages data efficiently. vs File System: DBMS provides data integrity, concurrent access, backup/recovery, and reduces redundancy. File systems lack these — no relationships between files, no transaction support, hard to query." },
  { type: "Technical", difficulty: "Easy", question: "What is the difference between Stack and Queue?", answer: "Stack = LIFO (Last In, First Out). Operations: push/pop. Used in: function call stack, undo operations, browser back button.\nQueue = FIFO (First In, First Out). Operations: enqueue/dequeue. Used in: BFS, print queue, task scheduling." },
  { type: "Technical", difficulty: "Easy", question: "What is the difference between == and === in JavaScript?", answer: "== (loose equality): compares values after type coercion. '5' == 5 → true.\n=== (strict equality): compares value AND type. '5' === 5 → false.\nBest practice: always use === to avoid unexpected type coercion bugs." },
  { type: "Technical", difficulty: "Easy", question: "What is a primary key vs foreign key?", answer: "Primary Key: uniquely identifies each row in a table. Cannot be NULL. Only one per table.\nForeign Key: a column that references the primary key of another table. Used to maintain referential integrity between two related tables." },
  { type: "Technical", difficulty: "Medium", question: "Explain time complexity. What is Big O notation?", answer: "Time complexity measures how an algorithm's runtime grows with input size n.\nBig O notation describes the worst-case growth rate:\n• O(1) — constant: array access\n• O(log n) — logarithmic: binary search\n• O(n) — linear: linear search\n• O(n log n) — merge sort, quicksort average\n• O(n²) — bubble sort, nested loops" },
  { type: "Technical", difficulty: "Medium", question: "What is the difference between process and thread?", answer: "Process: an independent program in execution with its own memory space. Heavy, slow to create.\nThread: a lightweight unit within a process. Shares memory with other threads of same process. Faster to create.\nExample: Chrome browser = one process per tab; each tab uses multiple threads for rendering, JS, network." },
  { type: "Technical", difficulty: "Medium", question: "What is normalization in DBMS?", answer: "Normalization is organizing a database to reduce redundancy and improve integrity.\n• 1NF: atomic values, no repeating groups\n• 2NF: 1NF + no partial dependencies (all non-key columns depend on full primary key)\n• 3NF: 2NF + no transitive dependencies\n• BCNF: stronger version of 3NF" },
  { type: "Technical", difficulty: "Medium", question: "What is the difference between GET and POST HTTP methods?", answer: "GET: retrieves data. Parameters in URL. Cached, bookmarkable. Not for sensitive data.\nPOST: sends data to server. Parameters in request body. Not cached. Used for forms, file uploads, sensitive data.\nSimple rule: GET = read, POST = write/send." },
  { type: "Technical", difficulty: "Medium", question: "Explain recursion with an example.", answer: "Recursion is when a function calls itself to solve a smaller version of the same problem.\nExample — Factorial:\nfunction factorial(n) {\n  if (n === 0) return 1;  // base case\n  return n * factorial(n - 1);  // recursive call\n}\nfactorial(5) = 5 × 4 × 3 × 2 × 1 = 120\nKey: always have a base case to stop infinite recursion." },
  { type: "Technical", difficulty: "Hard", question: "What is the difference between REST and GraphQL?", answer: "REST: multiple endpoints (e.g., /users, /posts). Fixed data structure. Over/under-fetching can occur.\nGraphQL: single endpoint (/graphql). Client specifies exactly what data it needs. Efficient for complex queries.\nUse REST for: simple CRUD APIs, public APIs.\nUse GraphQL for: complex data relationships, mobile apps (bandwidth matters)." },
  { type: "Technical", difficulty: "Hard", question: "What is a deadlock? How is it prevented?", answer: "Deadlock: two or more processes waiting for each other to release resources — none can proceed.\nConditions (all 4 must hold): Mutual exclusion, Hold & wait, No preemption, Circular wait.\nPrevention: break any one condition. Common approaches:\n• Resource ordering (prevent circular wait)\n• Timeout & retry\n• Banker's algorithm (deadlock avoidance)" },
  { type: "Technical", difficulty: "Hard", question: "Explain how a HashMap works internally.", answer: "HashMap uses an array of buckets + linked lists (or trees in Java 8+).\n1. key.hashCode() → hash → bucket index\n2. If bucket empty → insert\n3. If collision → chain via linked list (or red-black tree if chain > 8)\nGet: O(1) average, O(n) worst case (all keys same bucket)\nLoad factor (default 0.75): when 75% full → resize & rehash" },
];

const DIFFICULTY_ORDER = { Easy: 1, Medium: 2, Hard: 3 };
const DIFFICULTY_COLOR = { Easy: "#10b981", Medium: "#f59e0b", Hard: "#ef4444" };

export default function Interview({ theme = {} }) {
  const bg      = theme.bg      || "#0b0f19";
  const card    = theme.card    || "#111827";
  const border  = theme.border  || "#1f2937";
  const primary = theme.primary || "#3b82f6";
  const text    = theme.text    || "#e5e7eb";
  const subtext = theme.subtext || "#9ca3af";
  const success = theme.success || "#10b981";

  const [completed, setCompleted] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("completedQA")) || [];
    setCompleted(saved);
  }, []);

  function toggleComplete(index) {
    const updated = completed.includes(index)
      ? completed.filter((i) => i !== index)
      : [...completed, index];
    setCompleted(updated);
    localStorage.setItem("completedQA", JSON.stringify(updated));
  }

  function toggleExpand(index) {
    setExpanded(expanded === index ? null : index);
  }

  const filteredData = QUESTIONS.filter((q, i) => {
    const matchSearch = q.question.toLowerCase().includes(search.toLowerCase());
    const matchType = filter === "All" || q.type === filter;
    const matchDiff = difficulty === "All" || q.difficulty === difficulty;
    return matchSearch && matchType && matchDiff;
  });

  const completedCount = completed.length;
  const total = QUESTIONS.length;
  const progressPct = Math.round((completedCount / total) * 100);

  return (
    <div style={{ padding: "28px 24px", background: bg, minHeight: "100vh", color: text, maxWidth: "800px", margin: "0 auto", boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ margin: "0 0 6px", color: text, fontSize: "22px" }}>🎤 Interview Preparation</h2>
        <p style={{ margin: 0, color: subtext, fontSize: "14px" }}>Practice HR and Technical questions with model answers</p>
      </div>

      {/* Progress */}
      <div style={{ background: card, border: `1px solid ${border}`, borderRadius: "12px", padding: "16px 20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontSize: "14px", color: text, fontWeight: "600" }}>Your Progress</span>
          <span style={{ fontSize: "14px", color: success, fontWeight: "700" }}>{completedCount} / {total} completed ({progressPct}%)</span>
        </div>
        <div style={{ height: "6px", background: border, borderRadius: "3px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: success, borderRadius: "3px", transition: "width 0.4s ease" }} />
        </div>
        <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
          {["HR", "Technical"].map((type) => {
            const typeTotal = QUESTIONS.filter((q) => q.type === type).length;
            const typeDone = QUESTIONS.filter((q, i) => q.type === type && completed.includes(i)).length;
            return (
              <span key={type} style={{ fontSize: "12px", color: subtext }}>
                {type === "HR" ? "👥" : "💻"} {type}: {typeDone}/{typeTotal}
              </span>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <input
        placeholder="🔍 Search questions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "11px 14px", borderRadius: "8px", border: `1px solid ${border}`, background: card, color: text, fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "12px", fontFamily: "inherit" }}
      />

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {["All", "HR", "Technical"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", borderRadius: "20px", border: `1px solid ${filter === f ? primary : border}`, background: filter === f ? primary : "transparent", color: filter === f ? "#fff" : subtext, cursor: "pointer", fontSize: "13px", fontWeight: filter === f ? "600" : "400" }}>
            {f}
          </button>
        ))}
        <div style={{ width: "1px", background: border, margin: "0 4px" }} />
        {["All", "Easy", "Medium", "Hard"].map((d) => (
          <button key={d} onClick={() => setDifficulty(d)} style={{ padding: "6px 14px", borderRadius: "20px", border: `1px solid ${difficulty === d ? (DIFFICULTY_COLOR[d] || primary) : border}`, background: difficulty === d ? (DIFFICULTY_COLOR[d] || primary) : "transparent", color: difficulty === d ? "#fff" : subtext, cursor: "pointer", fontSize: "13px", fontWeight: difficulty === d ? "600" : "400" }}>
            {d}
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{ fontSize: "13px", color: subtext, marginBottom: "14px" }}>
        Showing {filteredData.length} of {QUESTIONS.length} questions
      </div>

      {/* Questions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filteredData.map((q, idx) => {
          const globalIdx = QUESTIONS.indexOf(q);
          const isDone = completed.includes(globalIdx);
          const isOpen = expanded === globalIdx;

          return (
            <div
              key={globalIdx}
              style={{ background: card, border: `1px solid ${isDone ? success + "44" : border}`, borderLeft: `3px solid ${isDone ? success : (q.type === "HR" ? "#8b5cf6" : primary)}`, borderRadius: "10px", overflow: "hidden", transition: "border-color 0.2s" }}
            >
              {/* Question row */}
              <div
                onClick={() => toggleExpand(globalIdx)}
                style={{ padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}
              >
                <span style={{ fontSize: "16px", flexShrink: 0 }}>{q.type === "HR" ? "👥" : "💻"}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: text, lineHeight: "1.4" }}>{q.question}</div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "4px", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", color: q.type === "HR" ? "#8b5cf6" : primary, fontWeight: "600" }}>{q.type}</span>
                    <span style={{ fontSize: "11px", color: DIFFICULTY_COLOR[q.difficulty], fontWeight: "600" }}>● {q.difficulty}</span>
                  </div>
                </div>
                <span style={{ color: subtext, fontSize: "16px", flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</span>
              </div>

              {/* Answer (expanded) */}
              {isOpen && (
                <div style={{ padding: "0 16px 16px" }}>
                  <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: "8px", padding: "14px", marginBottom: "12px" }}>
                    <div style={{ fontSize: "11px", color: subtext, fontWeight: "600", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Model Answer</div>
                    <p style={{ margin: 0, fontSize: "13px", color: text, lineHeight: "1.7", whiteSpace: "pre-wrap" }}>{q.answer}</p>
                  </div>
                  <button
                    onClick={() => toggleComplete(globalIdx)}
                    style={{ padding: "8px 16px", border: "none", borderRadius: "7px", background: isDone ? success : primary, color: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                  >
                    {isDone ? "✅ Completed" : "Mark as Completed"}
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {filteredData.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: subtext }}>
            No questions match your filters.
          </div>
        )}
      </div>
    </div>
  );
}