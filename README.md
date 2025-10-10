
# Todo_MERN

A full-stack Todo application built with React, TypeScript, Vite and a Node/Express + TypeScript backend using MongoDB.

This repository contains a monorepo-style structure where the client (React + Vite) and the server (Node + Express) live together under `src/`.

## What this project is

- A small Todo app demonstrating a modern TypeScript stack:
  - Frontend: React + TypeScript, built with Vite for fast dev experience and HMR.
  - Backend: Node.js + Express written in TypeScript, using Mongoose / MongoDB for persistence.
  - Authentication: Passport (local strategy), sessions stored in MongoDB.
  - Dev tooling: ESLint, TypeScript, and helpful Vite plugins.

## Technologies included

From `package.json` (high level):

- Runtime / Frameworks
  - Node.js (server)
  - Express
  - React 18
  - Vite

- Language / Tooling
  - TypeScript
  - tsx / ts-node (dev)
  - Vite plugins: `@vitejs/plugin-react-swc`, `vite-plugin-svgr`, `vite-plugin-env-compatible`

- Database
  - MongoDB (driver) and Mongoose
  - connect-mongo for session storage

- Authentication & Security
  - passport, passport-local
  - helmet
  - cookie-parser, express-session

- Dev & Lint
  - ESLint with `@typescript-eslint` plugins
  - nodemon (in dependencies), tsx for running TypeScript directly in dev

- Misc
  - dotenv for environment variable loading
  - pbkdf2 for password hashing utilities

Exact dependencies are in `package.json`.

## Project structure (important paths)

- `src/` - main source folder
  - `src/main.tsx`, `src/App.tsx` - React entry
  - `src/server/` - backend code (controllers, models, routes, services)
  - `src/server/index.ts` - backend entry (see `package.json` `entry` field)

## Environment

Create a `.env` file in the project root or ensure environment variables are provided for the server. Common variables used by this project:

- `PORT` - port for the backend server (default shown in code)
- `MONGODB_URI` or similar - connection string for MongoDB
- `SESSION_SECRET` - secret for express-session

(Inspect `src/server` files for exact variable names the app expects.)

## Available npm scripts

Derived from `package.json` — run these from the project root in PowerShell (Windows):

- Start frontend dev server (Vite):
```powershell
npm run start-dev
```

- Start backend dev server (runs the TypeScript server with `tsx`):
```powershell
npm run start-backend
```

- Build the frontend for production:
```powershell
npm run build
```

- Preview the built frontend:
```powershell
npm run preview
```

- Start the database script (project includes a `database` script):
```powershell
npm run database
```

- Lint the project with ESLint:
```powershell
npm run lint
```

## Typical local development workflow

1. Install dependencies:
```powershell
npm install
```

2. Start the backend in one terminal:
```powershell
npm run start-backend
```

3. Start the frontend in another terminal (Vite dev server):
```powershell
npm run start-dev
```

4. Open the app in your browser (Vite will show the URL, usually `http://localhost:5173`). The frontend proxies API requests to the backend (see `proxy` in `package.json`).

5. Run linting and tests as needed.

## Upgrading dependencies

- To see outdated packages:
```powershell
npm outdated --depth=0
```

- To update packages safely (within semver ranges):
```powershell
npm update
```

- To update to latest versions (including majors) using `npm-check-updates` (via npx):
```powershell
npx npm-check-updates -u
npm install
```

## Notes & next steps

- The project uses TypeScript throughout; ensure your editor is configured to use the workspace TypeScript.
- You may want to add a CONTRIBUTING.md with code style and branching rules.
- Consider adding Docker and a script to seed the database for easier onboarding.

---

If you'd like, I can:

- Add a short `CONTRIBUTING.md` with naming conventions and run steps.
- Add lint rules to the repo and run the linter to show violations.
- Run `npm outdated --depth=0` in a terminal and paste the output here.

Which of those would you like next?
