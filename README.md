# AI Resume Analyzer

For current local setup, runtime configuration, test commands and the live-service checklist, see [LIVE_VERIFICATION.md](LIVE_VERIFICATION.md).

An AI-powered Resume Analyzer built with a **vanilla HTML/CSS/JS frontend**, a **Python FastAPI backend**, and **Google Gemini AI**. It analyzes resumes, evaluates ATS readiness, provides resume scores, detects grammar issues, identifies missing sections, and matches resumes with job descriptions.

The Gemini API key lives **only on the backend** — it is never exposed in frontend JavaScript.

---

## 🤖 Demo :

```bash
https://codertheashish.github.io/AI-Resume-Analyzer/
```

---

## ✨ Features

- 📄 Upload Resume (PDF, DOCX, or TXT)
- 📝 Paste Resume Text
- 🤖 AI-Powered Resume Analysis (server-side, key never in the browser)
- 📊 Overall Resume Score (0-100)
- 🛡️ Deterministic ATS Readiness Estimate (explained category breakdown)
- 💼 Job Description Matching (deterministic score + AI interpretation)
- ✍️ Grammar & Writing Suggestions
- 📌 Missing Section Detection
- 📈 Section-wise Performance Score
- 🏆 Resume Strengths & Weaknesses
- 🔑 Missing ATS Keywords
- 📥 Download Report as PDF
- 🌙 Light & Dark Theme
- 👤 Supabase Authentication (email & password)
- 💾 Saved reviews, analysis history, and profile storage

---

## 🛠️ Tech Stack

- Frontend: HTML5, CSS3, JavaScript (ES6)
- Backend: Python, FastAPI, Uvicorn, PyMuPDF, python-docx
- AI: Google Gemini SDK (server-side only)
- Auth & storage: Supabase (Auth, Postgres, Row Level Security)
- Responsive Design

---

## 📂 Project Structure

```
ATSIQ/
│
├── index.html
├── logo.jpg
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── api.js
│   ├── auth.js
│   ├── config.js
│   ├── supabase.js
│   └── theme.js
│
├── supabase/
│   └── schema.sql
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── routes/
│   │   │   ├── analyze.py
│   │   │   ├── job_match.py
│   │   │   └── health.py
│   │   ├── schemas/
│   │   │   └── resume.py
│   │   └── services/
│   │       ├── gemini_service.py
│   │       ├── ats_engine.py
│   │       ├── resume_parser.py
│   │       └── keyword_matcher.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── .env.example
└── README.md
```

---

## 🏗️ Architecture

```
                            ┌────────────────────┐
        Browser  ─────────▶ │  Supabase          │  Auth + user data
                            │  (anon key + RLS)  │  (profiles, resumes,
                            └────────────────────┘   analyses, job_matches)
          │
          ▼
                            ┌────────────────────┐
        Browser  ─────────▶ │  FastAPI backend   │  GEMINI_API_KEY lives
                            │  ────────────────▶ │  here, server-side only
                            │  Gemini (Google AI)│
                            └────────────────────┘
```

- The browser talks to **Supabase directly** (safe because RLS restricts every row to its owner).
- The browser never calls Google's API and never sees the Gemini key.
- `js/api.js` centralizes every call the frontend makes to the backend.

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
https://github.com/codertheashish/AI-Resume-Analyzer
```

### 2. Run the Frontend

Serve the folder with any static server, e.g.:

```bash
python scripts/serve_frontend.py
```

then open `http://localhost:5500`.

### 3. Run the Backend

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS / Linux:
source .venv/bin/activate

pip install -r requirements.txt
```

Create `backend/.env` (gitignored):

```
GEMINI_API_KEY=YOUR_GEMINI_KEY
SUPABASE_URL=
SUPABASE_ANON_KEY=
FRONTEND_URL=http://localhost:5500
```

Get a free Gemini key at https://aistudio.google.com/apikey

Start the server:

```bash
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`. Docs: `http://localhost:8000/docs`. Health check: `http://localhost:8000/health`.

**The Gemini key exists only on the backend.** `js/config.js` contains no Gemini key — only the public Supabase values and `API_BASE_URL`.

---

## 🔐 Supabase Setup

Accounts, saved reviews, and history are backed by [Supabase](https://supabase.com). To enable it:

1. Create a free project at https://supabase.com/dashboard/project/new
2. Go to **Authentication → Providers** and make sure **Email** is enabled (on by default). To let users sign up without email confirmation, disable **Confirm email** under **Authentication → Settings**, or leave it on to require confirmation.
3. Run `supabase/schema.sql`: **SQL Editor → New query → paste contents → Run**. This creates `profiles`, `resumes`, `analyses`, and `job_matches` tables with Row Level Security and a trigger that creates a profile automatically on signup.
4. Set these public values in `backend/.env`, then restart the backend and reload the page:
   - `SUPABASE_URL` ← Project URL
   - `SUPABASE_ANON_KEY` ← Project API keys → `anon`/`public` key

The anon key is public by design — it's safe (and expected) in browser code. RLS is what keeps each user's data private. The `service_role` key is never needed by the frontend.

---


## How It Works

1. Upload Resume (PDF/DOCX/TXT) or Paste Text
2. Backend Extracts Content (files only)
3. Deterministic ATS Readiness Estimate (backend engine)
4. Gemini Analyzes Resume (server-side, structured JSON)
5. Job Match Analysis (deterministic overlap + AI interpretation)
6. Resume Score Generation
7. Download Report

---

## Features Included

- Resume Parsing
- ATS Score
- Keyword Detection
- Resume Improvement Suggestions
- Grammar Analysis
- Job Description Match
- PDF Report
- Theme Switcher

---

## Future Improvements

- Multiple Templates
- Multi-language Support
- Resume Comparison
- Cloud Storage for uploaded resume files

---

## 📄 License

This project is licensed under the MIT License.

---

## Author

**Ashish Kumar Prajapati**

GitHub:<br>
https://github.com/codertheashish

LinkedIn:<br>
https://www.linkedin.com/in/codertheashish/


---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub.
