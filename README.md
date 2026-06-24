# ContentFlow AI

A full-stack AI content generator built with Next.js, Groq, and Prisma. Generate blog posts, articles, social media posts, emails, product descriptions, and captions with customizable tone, length, target keywords, and audience — then manage everything you've generated in a searchable history.

**Live demo:** 
**Repo:** https://github.com/Nnavodya/AI-Content-Generator

---

## Features

- **Authentication** — Email/password and Google OAuth sign-in via Clerk, with protected dashboard routes.
- **AI Content Generator** — Generate 6 content types (blog post, article, social media post, email, product description, caption) with:
  - Tone control (professional, casual, friendly, formal)
  - Length control (short, medium, long)
  - Target keywords (woven into the AI prompt and saved with each generation)
  - Optional target audience field
  - Live word count and one-click copy to clipboard
- **Dashboard** — Total content generated, a breakdown of generations by content type, and a recent activity feed.
- **Content History** — Search by topic, filter by date range, expand/collapse full results, copy, and delete past generations.
- **Settings** — Edit profile (name, bio), update password, toggle dark mode, and delete your account — all backed by real functionality, no placeholder UI.
- **Dark mode** — Persisted across the app (landing page + dashboard) via a shared hook.
- **Responsive** — Mobile navigation menu, responsive layouts throughout.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Auth | [Clerk](https://clerk.com/) |
| Database | [Neon](https://neon.tech/) (serverless PostgreSQL) |
| ORM | [Prisma 7](https://www.prisma.io/) (with `@prisma/adapter-neon` driver adapter) |
| AI | [Groq](https://groq.com/) — `llama-3.3-70b-versatile` |
| Icons | [lucide-react](https://lucide.dev/) |

---

## Architecture

```
Browser (React Server + Client Components)
        │
        │  fetch("/api/...")
        ▼
Next.js API Routes  ──────────────►  Groq API (content generation)
  app/api/generate
  app/api/history
  app/api/history/[id]
  app/api/dashboard-stats
        │
        │  Prisma Client (driver adapter, no native binary)
        ▼
Neon PostgreSQL (serverless, pooled connection)
```

Authentication and session management are handled by Clerk via `proxy.ts` (Next.js 16's renamed middleware file), which protects all `/dashboard/*` and `/api/*` routes except the public landing, sign-in, and sign-up pages.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech/) PostgreSQL database (or any PostgreSQL instance)
- A [Clerk](https://clerk.com/) account and application
- A [Groq](https://console.groq.com/) API key

### 1. Clone and install

```bash
git clone https://github.com/Nnavodya/AI-Content-Generator.git
cd AI-Content-Generator
npm install
```

### 2. Environment variables

Create `.env` and `.env.local` in the project root:

**`.env`**
```bash
DATABASE_URL="postgresql://<user>:<password>@<your-neon-host>-pooler.<region>.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

> The hostname **must** include `-pooler` (Neon's pooled connection) — the direct connection causes `ConnectionClosed` errors with Prisma 7's `adapter-neon`.

**`.env.local`**
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

GROQ_API_KEY=gsk_...
```

### 3. Set up the database

```bash
npx prisma db push
```

This creates the `Content` table in your database and generates the Prisma Client.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
app/
  (auth)/
    sign-in/[[...sign-in]]/page.tsx
    sign-up/[[...sign-up]]/page.tsx
  (dashboard)/
    layout.tsx                 # Wraps dashboard pages with <Sidebar />
    dashboard/
      page.tsx                  # Dashboard home
      generate/page.tsx         # Content generator
      history/page.tsx          # Content history
      settings/page.tsx         # Account settings
  api/
    generate/route.ts           # POST — calls Groq, saves to DB
    history/route.ts            # GET — search + stats
    history/[id]/route.ts       # DELETE — remove a generation
    dashboard-stats/route.ts    # GET — totals + recent activity + type breakdown
  page.tsx                      # Landing page
  layout.tsx                    # Root layout (ClerkProvider, fonts)
  globals.css                   # Tailwind theme + dark mode variables
components/
  Navbar.tsx                    # Landing page navbar (mobile menu, dark mode toggle)
  Sidebar.tsx                   # Dashboard navigation
  ui/                           # shadcn/ui components
hooks/
  use-dark-mode.ts              # Shared dark mode hook (localStorage + class toggle)
lib/
  utils.ts                      # cn() helper
prisma/
  schema.prisma                 # Content model
proxy.ts                        # Clerk middleware (Next.js 16 renamed middleware.ts)
```

---

## Database Schema

```prisma
model Content {
  id          String   @id @default(cuid())
  userId      String
  contentType String
  tone        String
  length      String
  topic       String
  result      String
  keywords    String[] @default([])
  audience    String?
  createdAt   DateTime @default(now())
}
```

---

## Deployment

Deployed on [Vercel](https://vercel.com):

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Add the environment variables from `.env` / `.env.local` to the Vercel project settings.
4. In the [Clerk dashboard](https://dashboard.clerk.com), create a **production** instance and add your deployed domain — the development keys used locally have strict usage limits and aren't meant for production traffic.
5. Deploy.

---

## Known Limitations / Roadmap

- Keywords and audience are saved per generation but aren't yet used to pre-fill the form when regenerating.
- No PDF/DOCX export of generated content.
- No favorites/bookmarking of past generations.
- Email address changes aren't supported in Settings (Clerk requires a verification flow not yet built).
- Date filtering on Content History is client-side; it may need to move server-side if history grows large.

---

## Author

Built by **Nethmi** ([@Nnavodya](https://github.com/Nnavodya)) as a portfolio project.