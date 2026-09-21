# Startup and live verification

Commands run from the folder containing index.html. Python 3.12 and Node.js are used for verification; Node is not needed to serve the app.

## Environment

Create backend/.env from backend/.env.example only if it does not exist:

```powershell
if (-not (Test-Path backend/.env)) { Copy-Item backend/.env.example backend/.env }
```

Fill in these variables locally:

```dotenv
GEMINI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
FRONTEND_URL=http://localhost:5500
```

Never commit backend/.env. Use the Supabase public anon key, never a service-role key. This architecture does not require privileged server access.

Backend settings resolve backend/.env independently of the working directory. Process environment variables override the file. Remove any fake GEMINI_API_KEY left in the shell before using a real file value. Restart the backend after configuration changes because settings are cached.

The browser does not read .env. index.html loads /api/public-config.js before initializing Supabase. The endpoint exposes ONLY SUPABASE_URL and SUPABASE_ANON_KEY, with caching disabled. Root .env is not read.

For deployment, update the public-config script URL in index.html and API_BASE_URL in js/config.js to the backend HTTPS URL, and set FRONTEND_URL to the frontend origin. Publish only index.html, logo.jpg, css/ and js/ as static assets.

## Start

First terminal:

```powershell
python -m venv backend/.venv
backend/.venv/Scripts/python.exe -m pip install -r backend/requirements-dev.txt
backend/.venv/Scripts/python.exe -m uvicorn app.main:app --app-dir backend --host 127.0.0.1 --port 8000 --reload
```

Second terminal:

```powershell
backend/.venv/Scripts/python.exe scripts/serve_frontend.py
```

Open http://localhost:5500 and http://localhost:8000/docs. On macOS/Linux use backend/.venv/bin/python.
Stop any old servers on these ports first. Do not serve the repository with python -m http.server: it exposes backend/.env. The supplied server serves only public assets.

## Supabase

For a new project apply supabase/schema.sql once. For an existing project apply supabase/migrations/20260921_ownership_guards.sql. See [RLS verification](supabase/RLS_VERIFICATION.md) for deployment, historical-data audit and user-isolation tests. Enable email/password auth and set the site URL and permitted email-confirmation redirect URLs for http://localhost:5500. Use mailboxes you control. Reload the frontend after restarting the configured backend.

## Gemini

Use a synthetic resume of at least 100 characters in the UI, or call POST /api/resume/analyze in /docs. A live pass requires a real 200 response containing analysis and ATS breakdown. A health response or mocked response is not a live pass. Test /api/job/match with a job description of at least 50 characters as well.

## Manual checklist

Record date, browser, project, test user, expected/actual results; never record passwords or keys. These items remain pending until performed against real services.

- [ ] Public configuration contains only URL/anon key; private Gemini/service-role values never reach browser responses.
- [ ] GET /backend/.env and /.env on port 5500 returns 404.
- [ ] Signup user A; confirm email if required; verify profile creation.
- [ ] Login succeeds with valid credentials and rejects invalid credentials.
- [ ] Logout hides account/history; reloading stays signed out.
- [ ] Session restoration: login, reload and reopen browser; correct account/history returns while the session is valid.
- [ ] TXT upload: select a synthetic resume, verify filename, complete analysis.
- [ ] DOCX upload: verify paragraph/table extraction through /api/resume/parse and complete analysis.
- [ ] PDF upload: verify text extraction and analysis; corrupt/scanned PDFs display a clean error with a usable form.
- [ ] Gemini: real analysis and optional job match return meaningful results.
- [ ] Resume persistence: resumes row has correct content, filename and user_id.
- [ ] Analysis persistence: analyses row has correct owner, resume reference, score and JSON; optional job_matches row is saved.
- [ ] History loading: reload and verify review, score and filename; signing out hides history.
- [ ] RLS reads: create user B in a separate browser profile. B sees none of A's history. With B's browser client, select A's known IDs from profiles/resumes/analyses/job_matches: no rows returned.
- [ ] RLS writes: B cannot update/delete A's disposable rows or insert using A's user_id. Verify A's data remains unchanged.
- [ ] RLS references: after applying the ownership migration, confirm B cannot insert or update its analysis to reference A's resume, or its job match to reference A's analysis. Both attempts must be rejected.
- [ ] Anonymous client cannot read/write saved rows. Admin SQL-editor access does not demonstrate RLS isolation.
- [ ] Desktop/mobile visual check: auth modal, file selection/removal, theme, loading/error recovery and printed PDF report.

Use disposable data for write tests and clean up manually afterward.

## Offline automation

```powershell
npm.cmd install
npx.cmd playwright install chromium
npm.cmd test
npm.cmd run lint
npm.cmd run test:browser
backend/.venv/Scripts/python.exe -m ruff check backend/app backend/tests scripts
backend/.venv/Scripts/python.exe -m compileall -q backend/app backend/tests scripts
backend/.venv/Scripts/python.exe -m pip check
Push-Location backend
.venv/Scripts/python.exe -m unittest discover -s tests -v
Pop-Location
```

Playwright starts the restricted static server on port 5511. Remote SDK/API traffic is intercepted; tests cover config ordering, validation, upload selection, AI failure recovery and private-file blocking. Client tests mock Supabase and Gemini. RLS tests execute actual SQL in an isolated PostgreSQL engine with simulated Supabase identities. These checks do not prove live auth, provider availability, session persistence or deployed database policies. No frontend build step is needed. Lint rules check correctness without imposing formatting changes.

The static server serves an explicit list of public assets. If adding a legitimate asset, update PUBLIC_FILES in scripts/serve_frontend.py; private files under js/ or css/ are not automatically served.
