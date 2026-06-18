# PlacPrep-AI

AI-powered placement preparation platform — practice interviews, build resumes, sharpen aptitude, and prep for coding rounds, all in one place.

---

## About

**PlacPrep-AI** is an intelligent placement preparation platform designed for engineering students and freshers. Powered by **Grok AI**, it provides personalized interview practice, resume building, aptitude training, and coding prep — everything needed to crack campus placements.

---

## Features

| Feature | Description |
|---|---|
| AI Interview Q&A | Practice role-specific interview questions with Grok AI feedback |
| Resume Builder | Build ATS-friendly resumes with guided templates |
| Aptitude Prep | Quantitative, logical, and verbal reasoning practice sets |
| Coding Prep | Curated DSA problems with hints and solutions |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, CSS |
| Backend | Node.js, Express.js |
| AI Engine | Grok AI (xAI) |

---

## Project Structure

```
PlacementPrep-AI/
├── Backend/
│   ├── Server.js
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
├── public/
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- Grok AI API Key

### Installation

```bash
# Clone the repository
git clone https://github.com/likhithagangula5-hash/PlacementPrep-AI.git
cd PlacementPrep-AI

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

### Environment Setup

Create a `.env` file in the `Backend/` folder:

```env
GROK_API_KEY=your_grok_api_key_here
PORT=5000
```

### Run the App

```bash
# Start backend
cd Backend
node Server.js

# Start frontend (new terminal)
cd Frontend
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Live Demo

[PlacPrep-AI Live](https://likhithagangula5-hash.github.io/PlacementPrep-AI)

---

## Author

**Gangula Likhitha**
- B.Tech CSE (AI & ML) — SVS Group of Institutions
- [GitHub](https://github.com/likhithagangula5-hash)

---

## License

This project is open source and available under the MIT License.
