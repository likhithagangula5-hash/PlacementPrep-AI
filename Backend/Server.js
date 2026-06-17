import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Store login records in memory
const logins = [];

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    logins.push({
      email,
      loginTime: new Date().toLocaleString(),
    });

    console.log("✅ Login recorded:", email);
    console.log(logins);

    res.json({
      success: true,
      message: "Login successful",
    });
  } else {
    res.json({
      success: false,
      message: "Invalid login",
    });
  }
});

// ADMIN ROUTE
app.get("/admin", (req, res) => {
  res.json(logins);
});

// CHAT ROUTE
app.post("/chat", async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "message is required",
    });
  }

  try {
    const messages = [
      {
        role: "system",
        content:
          "You are an expert interview coach helping placement-seeking students. Give structured, practical, concise answers. For technical questions include examples when relevant.",
      },
      ...history.map((h) => ({
        role: h.role,
        content: h.content,
      })),
      {
        role: "user",
        content: message,
      },
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages,
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Groq error:", error.message);

    res.status(500).json({
      error: error.message,
    });
  }
});

// HEALTH CHECK
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    model: "llama-3.3-70b-versatile",
  });
});

// START SERVER
app.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});