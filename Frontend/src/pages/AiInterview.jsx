import { useState, useRef, useEffect } from "react";

export default function AIInterview({ theme = {} }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi 👋 I am your AI Interview Assistant. Ask me any interview question!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Build history for multi-turn context (exclude the initial greeting)
      const history = messages
        .slice(1)
        .map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));

      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // FIX: was `Input` (undefined) — now correctly uses `trimmed`
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server error ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply || "No response from AI." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `⚠️ ${error.message || "Could not reach backend. Make sure server is running on port 5000."}`,
          isError: true,
        },
      ]);
    }

    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        text: "Hi 👋 I am your AI Interview Assistant. Ask me any interview question!",
      },
    ]);
  }

  // Colors — prefer theme prop, fallback to dark defaults
  const bg      = theme.bg    || "#0b0f19";
  const card    = theme.card  || "#111827";
  const border  = theme.border || "#1f2937";
  const primary = theme.primary || "#2563eb";
  const text    = theme.text  || "#e5e7eb";

  return (
    <div style={{ padding: "24px", background: bg, minHeight: "100vh", color: text, display: "flex", flexDirection: "column", maxWidth: "860px", margin: "0 auto", boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <h2 style={{ margin: 0, color: text, fontSize: "20px" }}>🤖 AI Interview Assistant</h2>
          <p style={{ margin: "4px 0 0", color: theme.subtext || "#9ca3af", fontSize: "13px" }}>
            Powered by Claude · Press Enter to send · Shift+Enter for new line
          </p>
        </div>
        <button
          onClick={clearChat}
          style={{ padding: "6px 12px", borderRadius: "6px", border: `1px solid ${border}`, background: "transparent", color: text, cursor: "pointer", fontSize: "12px" }}
        >
          🗑 Clear
        </button>
      </div>

      {/* Chat window */}
      <div style={{ flex: 1, background: card, border: `1px solid ${border}`, borderRadius: "12px", padding: "16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", minHeight: "420px", maxHeight: "calc(100vh - 220px)" }}>
        {messages.map((msg, i) => {
          const isUser = msg.role === "user";
          return (
            <div key={i} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
              {!isUser && (
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0, marginRight: "8px", alignSelf: "flex-end" }}>
                  🤖
                </div>
              )}
              <div style={{
                maxWidth: "72%",
                padding: "10px 14px",
                borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: isUser ? primary : (msg.isError ? "#7f1d1d" : "#1f2937"),
                color: "#fff",
                fontSize: "14px",
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                border: msg.isError ? "1px solid #ef4444" : "none",
              }}>
                {msg.text}
              </div>
              {isUser && (
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#374151", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0, marginLeft: "8px", alignSelf: "flex-end" }}>
                  👤
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🤖</div>
            <div style={{ padding: "10px 14px", background: "#1f2937", borderRadius: "16px 16px 16px 4px", color: "#9ca3af", fontSize: "14px" }}>
              <span style={{ animation: "pulse 1.5s infinite" }}>Thinking...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask any interview question... (Enter to send)"
          rows={2}
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: "10px",
            border: `1px solid ${border}`,
            background: card,
            color: text,
            fontSize: "14px",
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
            lineHeight: "1.5",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            padding: "0 20px",
            border: "none",
            borderRadius: "10px",
            background: loading || !input.trim() ? "#374151" : primary,
            color: "white",
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "600",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
        >
          {loading ? "..." : "Send ↑"}
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
