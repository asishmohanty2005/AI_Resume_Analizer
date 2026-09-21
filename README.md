# 🤖 AI Resume Analyzer

An intelligent web application that analyzes resumes using AI, highlights strengths and weaknesses, identifies important skills, and helps users compare their resume with job descriptions.

The project combines **AI-powered resume analysis**, **Supabase authentication and database storage**, and a clean web interface to provide useful feedback for students, freshers, and job seekers.

---

## 🚀 Features

* 📄 Upload and analyze resumes
* 🤖 AI-powered resume evaluation using Google Gemini
* 🎯 Resume and job description matching
* 🧠 Skill identification and analysis
* 📊 Resume score and structured feedback
* ✅ Strengths and improvement suggestions
* 🔍 Missing skill identification
* 💼 Job suitability analysis
* 🔐 User authentication with Supabase
* 📚 Resume analysis history
* 💾 Save resumes and previous analysis results
* 🗑️ Delete previous analysis records
* 🔒 Secure environment variable handling
* 📱 Responsive and user-friendly interface

---

## 🧠 How It Works

The AI Resume Analyzer follows a simple workflow:

```text
Upload Resume
      ↓
Extract Resume Content
      ↓
Process Resume Information
      ↓
Send Relevant Content to Gemini AI
      ↓
AI Analyzes Resume
      ↓
Generate Score + Feedback
      ↓
Display Skills, Strengths & Improvements
      ↓
Save Analysis to Supabase
```

Users can also provide a **job description** to compare it with their resume.

```text
Resume + Job Description
          ↓
      AI Comparison
          ↓
   Skill Gap Analysis
          ↓
 Job Match Recommendations
```

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Python
* FastAPI

### AI

* Google Gemini API

### Database & Authentication

* Supabase
* PostgreSQL
* Supabase Authentication
* Row Level Security

### Development Tools

* VS Code
* Git
* GitHub
* npm
* Playwright
* Ruff
* ESLint

---

## 📂 Project Structure

```text
AI-Resume-Analyzer/
│
├── backend/
│   ├── app/
│   │   ├── config.py
│   │   └── main.py
│   │
│   ├── tests/
│   │   └── test_configuration.py
│   │
│   ├── .env
│   ├── .env.example
│   ├── requirements.txt
│   └── requirements-dev.txt
│
├── js/
│   ├── config.js
│   └── supabase.js
│
├── scripts/
│   └── serve_frontend.py
│
├── supabase/
│   └── schema.sql
│
├── tests/
│   └── browser/
│       └── smoke.spec.cjs
│
├── index.html
├── .env.example
├── .gitignore
├── eslint.config.cjs
├── package.json
├── package-lock.json
├── playwright.config.cjs
├── ruff.toml
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

```env
GEMINI_API_KEY=your_gemini_api_key

SUPABASE_URL=your_supabase_project_url

SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Important

Never upload your real `.env` file to GitHub.

Make sure `.env` is included in `.gitignore`.

Do **not** expose private API keys or a Supabase service-role key in frontend JavaScript.

---

## 🗄️ Supabase Setup

### 1. Create a Supabase Project

Go to Supabase and create a new project.

---

### 2. Enable Email Authentication

Open:

```text
Authentication
→ Providers
→ Email
```

Enable the Email provider.

For easier local testing, email confirmation can optionally be disabled from the authentication settings.

---

### 3. Create Database Tables

Open:

```text
Supabase Dashboard
→ SQL Editor
→ New Query
```

Copy the SQL code from:

```text
supabase/schema.sql
```

Then run the query.

The project database includes data for:

* User profiles
* Resumes
* Resume analyses
* Job matches

Row Level Security is used so users can access only their own data.

---

### 4. Configure Supabase Credentials

Open:

```text
Project Settings
→ API
```

Copy:

```text
Project URL
Anon / Public Key
```

Add them to:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

---

## 🤖 Gemini API Setup

Create a Gemini API key from Google AI Studio.

Add the key inside:

```text
backend/.env
```

Example:

```env
GEMINI_API_KEY=your_api_key_here
```

The API key should remain on the backend and should never be placed directly inside frontend JavaScript.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Move into the project directory:

```bash
cd AI-Resume-Analyzer
```

---

## 🐍 Backend Setup

### 2. Create a Virtual Environment

Windows:

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

Linux/macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 3. Install Python Dependencies

```bash
pip install -r backend/requirements.txt
```

For development dependencies:

```bash
pip install -r backend/requirements-dev.txt
```

---

### 4. Start the Backend

Run the FastAPI application from the project directory.

Example:

```bash
uvicorn backend.app.main:app --reload
```

The backend will normally be available at:

```text
http://127.0.0.1:8000
```

FastAPI documentation can usually be accessed at:

```text
http://127.0.0.1:8000/docs
```

---

## 🌐 Frontend Setup

Install Node dependencies:

```bash
npm install
```

The project includes a restricted frontend server that helps prevent private backend files from being exposed.

Run:

```bash
python scripts/serve_frontend.py
```

Then open the address shown in the terminal.

---

## 🔑 Authentication

The application supports user authentication using Supabase.

Users can:

* Create an account
* Sign in
* Sign out
* Save resumes
* Save analysis results
* View previous analyses
* Delete previous analyses
* Save job matching results

Authentication data is protected using Supabase Row Level Security policies.

---

## 📊 Resume Analysis

The AI can evaluate resume information and provide feedback such as:

```text
Resume Score

Detected Skills

Key Strengths

Weak Areas

Missing Skills

Recommended Improvements

Career Suggestions
```

The purpose of the score is to provide structured guidance rather than guarantee hiring or ATS results.

---

## 🎯 Job Description Matching

Users can compare their resume with a job description.

The system analyzes factors such as:

* Relevant skills
* Missing skills
* Technical requirements
* Resume keywords
* Role compatibility
* Experience relevance

It then generates recommendations that can help users improve their resume for the selected role.

---

## 🛡️ Security

Several security practices are used in the project.

### API Key Protection

Sensitive keys remain on the backend.

### Environment Variables

Private configuration is stored inside ignored `.env` files.

### Supabase Row Level Security

Database records are restricted based on the authenticated user.

### Public Configuration Endpoint

Only public Supabase configuration is exposed to the frontend through:

```text
/api/public-config.js
```

### Restricted Frontend Server

The frontend server prevents direct access to private backend and environment files.

---

## 🧪 Testing

### Python Tests

Run:

```bash
pytest backend/tests
```

### Browser Tests

The project includes Playwright smoke tests.

Run:

```bash
npx playwright test
```

### Python Code Quality

```bash
ruff check .
```

### JavaScript Code Quality

```bash
npx eslint .
```

---

## 💡 Use Cases

The project can be useful for:

* College students
* Fresh graduates
* Internship applicants
* Job seekers
* Resume improvement
* Skill-gap identification
* Job description comparison
* Career preparation

---

## 🔮 Future Improvements

Possible future improvements include:

* ATS-style resume scoring
* Resume PDF preview
* AI resume rewriting
* Cover letter generation
* LinkedIn profile analysis
* Multiple resume comparison
* Resume templates
* Advanced skill-gap visualization
* Job recommendations
* Interview question generation
* Resume version history
* Analytics dashboard
* Multi-language resume analysis

---

## 📸 Screenshots

![Uploading Screenshot 2026-09-21 193502.png…]()


### Home Page

```text
Add Screenshot Here
```

### Resume Analyzer

```text
Add Screenshot Here
```

### Analysis Result

```text
Add Screenshot Here
```

### Job Match

```text
Add Screenshot Here
```

### Analysis History

```text
Add Screenshot Here
```

---

## 🎓 Learning Outcomes

While developing this project, I gained practical experience with:

* Python backend development
* FastAPI
* REST APIs
* Gemini AI integration
* Prompt engineering
* Supabase authentication
* PostgreSQL databases
* Row Level Security
* JavaScript
* Secure environment configuration
* API security
* Browser testing
* Git and GitHub
* AI-powered web application development

---

## 👨‍💻 Developer

**Asish Mohanty**

B.Tech in Computer Science & Engineering

Interested in:

* Artificial Intelligence
* Machine Learning
* Python Development
* Full-Stack Development
* Generative AI

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add new feature"
```

5. Push your branch.

```bash
git push origin feature/new-feature
```

6. Create a Pull Request.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

It helps support the project and motivates future improvements.

---

## 📄 License

This project is intended for educational and portfolio purposes.

You can add an open-source license such as the **MIT License** if you want others to reuse or contribute to the project.

---

# AI Resume Analyzer

**Analyze smarter. Improve faster. Build a stronger resume with AI.**
