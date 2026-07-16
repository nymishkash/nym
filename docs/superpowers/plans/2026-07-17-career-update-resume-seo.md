# Career Update, Resume Auto-Render & SEO Routing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reflect the AI Studio career move across site + resume, make the LaTeX resume the source of truth for `/resume.pdf` (auto-built in CI), and convert the client-side SPA into real per-section routes so crawlers get every section.

**Architecture:** Next.js 15 App Router. Career data is updated in two independent authored sources (`src/lib/constants.ts` and a new `resume/resume.tex`). A GitHub Action compiles the `.tex` to `public/resume.pdf` on push. The SPA becomes real routes (`/`, `/work`, `/projects`, `/contact`) that server-render existing view components; persistent chrome (background + nav) moves to a client `Shell` in the layout, and per-route enter transitions move to `app/template.tsx`.

**Tech Stack:** Next.js 15.5 (App Router, Turbopack), React 19, framer-motion 12, Tailwind v4, Tectonic (LaTeX), GitHub Actions.

## Global Constraints

- **No test framework exists.** Do NOT add one. Verification = `npx tsc --noEmit`, `npm run build`, `npm run lint`, and `curl` against `next start`.
- TypeScript strict mode is on — no `any`, no unused vars.
- Canonical site origin is `https://nymi.sh`.
- CI runs on `ubuntu-latest` with Node 20.
- Preserve the existing visual design and mobile performance optimizations (the `useIsMobile` blur-skips). This work is structural, not a redesign.
- Commit after every task with the exact message shown.

---

## File Structure

- `src/lib/constants.ts` — MODIFY: career data (`EXPERIENCE`, `PERSONAL`).
- `src/lib/views.ts` — MODIFY: add `href` to `ViewMeta`, add `viewIdFromPathname`.
- `resume/resume.tex` — CREATE: LaTeX resume source (source of truth).
- `.github/workflows/resume.yml` — CREATE: compile `.tex` → `public/resume.pdf`.
- `package.json` — MODIFY: add `build:resume` script.
- `src/components/shell/Shell.tsx` — CREATE: persistent client chrome (background + nav), derives accent from pathname.
- `src/app/template.tsx` — CREATE: per-navigation enter transition (replaces `ViewShell`'s role).
- `src/app/layout.tsx` — MODIFY: `metadataBase`, title template, Person JSON-LD, render `<Shell>`.
- `src/components/shell/Nav.tsx` — MODIFY: `next/link` + `usePathname` instead of state.
- `src/components/views/HomeView.tsx` — MODIFY: CTAs become `Link`s; drop `onNavigate`.
- `src/app/page.tsx` — REWRITE: server home page rendering `<HomeView />`.
- `src/app/work/page.tsx`, `src/app/projects/page.tsx`, `src/app/contact/page.tsx` — CREATE: server pages + per-route metadata.
- `src/components/shell/ViewShell.tsx` — DELETE: superseded by `template.tsx`.
- `src/app/sitemap.ts`, `src/app/robots.ts` — CREATE: SEO plumbing.

---

## Task 1: Career data in constants.ts

**Files:**
- Modify: `src/lib/constants.ts`

**Interfaces:**
- Consumes: existing `Experience` interface (unchanged).
- Produces: `EXPERIENCE[0]` is now the AI Studio entry; `PERSONAL.website === "nymi.sh"`; `PERSONAL.tagline === "Forward Deployed Engineer"`.

- [ ] **Step 1: Update `PERSONAL`**

In `src/lib/constants.ts`, change two fields in the `PERSONAL` object:
- `tagline: "Full-Stack Engineer"` → `tagline: "Forward Deployed Engineer"`
- `website: "nymish.xyz"` → `website: "nymi.sh"`

- [ ] **Step 2: Prepend the AI Studio experience entry**

Insert this object as the FIRST element of the `EXPERIENCE` array (before the `Wing Assistant` entry):

```ts
  {
    company: "AI Studio",
    role: "Forward Deployed Engineer",
    period: "Jun 2026 – Present",
    location: "Bengaluru, India",
    type: "Remote",
    bullets: [
      "Forward-deployed engineer embedding with enterprise clients to scope, build, and ship custom AI-agent solutions end-to-end — from discovery to production.",
      "Build production LLM systems (RAG, function-calling agents, workflow automation) integrated directly into client stacks and data sources.",
      "Own delivery end-to-end: translate ambiguous business requirements into working systems and iterate on-site with stakeholders.",
    ],
    tech: ["TypeScript", "Node.js", "React", "LLMs", "RAG", "Function Calling"],
    accent: "#047857",
  },
```

- [ ] **Step 3: Update the Wing Assistant (M32) entry**

In the `Wing Assistant` entry:
- Change `period: "May 2025 – Present"` → `period: "May 2025 – Jun 2026"`
- Change the first bullet from `"...; shipping full-stack features end-to-end on Node.js + React."` → `"...; shipped full-stack features end-to-end on Node.js + React."` (i.e. `shipping` → `shipped`)

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: exits 0, no errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: update career data — AI Studio FDE role, M32 end date"
```

---

## Task 2: LaTeX resume source + local build script

**Files:**
- Create: `resume/resume.tex`
- Modify: `package.json`

**Interfaces:**
- Produces: `resume/resume.tex` compiles with Tectonic to a single-page `resume.pdf`; `npm run build:resume` writes `public/resume.pdf`.

- [ ] **Step 1: Create `resume/resume.tex`**

Create `resume/resume.tex` with exactly this content (the user's LaTeX with the AI Studio block added and M32 dates updated):

```latex
%-------------------------
% Resume in Latex
%------------------------

\documentclass[letterpaper,10pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage{fontawesome5}
\usepackage[default,scale=0.95]{lato}
\renewcommand*\familydefault{\sfdefault}
\usepackage[T1]{fontenc}

\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.7in}
\addtolength{\textheight}{1.4in}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

\definecolor{light-grey}{gray}{0.83}
\definecolor{dark-grey}{gray}{0.3}
\definecolor{text-grey}{gray}{.08}

\titleformat{\section}{
    \bfseries \vspace{2pt} \raggedright \large
}{}{0em}{}[\color{light-grey}{\titlerule[2pt]} \vspace{-4pt}]

\newcommand{\resumeItem}[1]{\item\small{{#1 \vspace{-1pt}}}}
\newcommand{\resumeSubheading}[4]{
  \vspace{-1pt}\item
  \begin{tabular*}{\textwidth}[t]{l@{\extracolsep{\fill}}r}
    \textbf{#1} & {\color{dark-grey}\small #2}\\
    \textit{#3} & {\color{dark-grey}\small #4}
  \end{tabular*}\vspace{-4pt}
}
\newcommand{\resumeProjectHeading}[2]{
  \item
  \begin{tabular*}{\textwidth}{l@{\extracolsep{\fill}}r}
    #1 & {\color{dark-grey}\small #2}
  \end{tabular*}\vspace{-4pt}
}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0in,label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{0pt}}

\color{text-grey}

\begin{document}

%----------HEADING----------
\begin{center}
    \textbf{\Huge Nymish Kashivishwanath} \\ \vspace{5pt}
    \small
    \faEnvelope\ \href{mailto:reachnymish@gmail.com}{reachnymish@gmail.com} \hspace{6pt} $|$
    \faLinkedin\ \href{https://linkedin.com/in/nymish}{linkedin.com/in/nymish} \hspace{6pt} $|$
    \faGithub\ \href{https://github.com/nymishkash}{github.com/nymishkash} \hspace{6pt} $|$
    \faMapMarker*\ Bengaluru, India
\end{center}

%-----------EXPERIENCE-----------
\section{EXPERIENCE}
\resumeSubHeadingListStart

\resumeSubheading
{AI Studio}{Jun 2026 -- Present}
{Forward Deployed Engineer}{Bengaluru, India (Remote)}
\resumeItemListStart
\resumeItem{Forward-deployed engineer embedding with enterprise clients to scope, build, and ship custom \textbf{AI-agent solutions} end-to-end --- from discovery to production deployment.}
\resumeItem{Build production \textbf{LLM systems} (RAG, function-calling agents, workflow automation) integrated directly into client stacks and data sources.}
\resumeItem{Own delivery end-to-end: translate ambiguous business requirements into working systems and iterate on-site with stakeholders.}
\resumeItemListEnd

\resumeSubheading
{Wing Assistant (M32 Labs)}{May 2025 -- Jun 2026}
{Software Engineer}{Berkeley, CA (Remote)}
\resumeItemListStart
\resumeItem{Engineering hire \#3 on an AI executive-assistant product; shipped full-stack features end-to-end on Node.js + React.}
\resumeItem{Built a \textbf{distributed message-queue ingestion pipeline} (RabbitMQ quorum queues, publisher confirms, Redis idempotent dedupe, DLQ + retries) consuming Gmail and Outlook push notifications with zero dropped events under load.}
\resumeItem{Architected a \textbf{multi-tier cache} (in-memory $\rightarrow$ Redis $\rightarrow$ source API) with Redis Pub/Sub cross-instance invalidation and circuit breakers, cutting p95 read latency from \textbf{>10s to <500ms}.}
\resumeItem{Built the \textbf{queue consumer layer}: a worker fan-out running AI draft generation, classification, task creation, and contact extraction concurrently per event, with shared context to eliminate N+1 queries.}
\resumeItem{Built the \textbf{AI generation pipeline}: GPT-4 drafts conditioned on user writing style, RAG over a Pinecone knowledge base, and CRM/calendar context injection; migrated the LLM provider live for \textbf{\textasciitilde20x cost reduction}.}
\resumeItem{Delivered full \textbf{Microsoft Graph parity} (OAuth, webhook subscriptions, refresh-token worker) for an originally Google-only product, unblocking the enterprise segment.}
\resumeItem{Built an \textbf{SSE real-time sync layer} over Redis Pub/Sub with reconnect, event dedup, and mutation cooldowns to suppress stale upstream events during eventual-consistency windows.}
\resumeItemListEnd

\resumeSubheading
{Dukaan}{Feb 2025 -- Apr 2025}
{Full Stack Engineer}{Bengaluru, India (Onsite)}
\resumeItemListStart
\resumeItem{Core team member (6 engineers) on \href{https://bot9.ai}{\textbf{bot9.ai}}, a GenAI customer-support suite; led engineering in the final months and independently owned enterprise client relationships end-to-end.}
\resumeItem{Shipped GenAI automation flows that resolved \textbf{80--85\%} of inbound support queries with no human handoff.}
\resumeItem{Cut LLM infrastructure cost \textbf{20x} by migrating providers live with zero downtime and no quality regression.}
\resumeItem{Replaced WebSockets with \textbf{SSE}, improving streaming reliability and concurrent-session scalability for live chat.}
\resumeItemListEnd

\resumeSubheading
{Dukaan}{Aug 2024 -- Jan 2025}
{SDE Intern}{Bengaluru, India (Onsite)}
\resumeItemListStart
\resumeItem{Shipped production features across Next.js, Express, and OpenAI APIs; chatbot work fed directly into the full-time role.}
\resumeItemListEnd

\resumeSubHeadingListEnd

%-----------SKILLS-----------
\section{SKILLS}
\begin{itemize}[leftmargin=0in,label={}]
\small{\item{
\textbf{Languages:} TypeScript, JavaScript, Python, SQL \\
\textbf{Backend:} Node.js, Express, RabbitMQ, Redis (Pub/Sub, Lua), PostgreSQL, BullMQ, Docker, PM2 \\
\textbf{Frontend:} React 19, TanStack Query, Zustand, Tailwind CSS, Vite \\
\textbf{AI / Data:} OpenAI (GPT-4 / 4o), Pinecone, RAG, function calling \\
\textbf{Integrations:} Gmail API, Google Cloud Pub/Sub, Microsoft Graph, OAuth2, HubSpot, Pipedrive, Salesforce, AWS S3
}}
\end{itemize}

%-----------PROJECTS-----------
\section{PROJECTS}
\resumeSubHeadingListStart

\resumeProjectHeading
{\textbf{\href{https://github.com/nymishkash/wagewizard}{WageWizard Payroll Assistant}}}{}
\resumeItemListStart
\resumeItem{AI payroll assistant on Node.js + Next.js handling HR workflows (employees, leave, wages) via chat and voice.}
\resumeItemListEnd

\resumeSubHeadingListEnd

%-----------EDUCATION-----------
\section{EDUCATION}
\resumeSubHeadingListStart

\resumeSubheading
{Scaler School of Technology}{2023 -- 2027}
{Integrated BS \& MS in Computer Science}{India}

\resumeSubheading
{Birla Institute of Technology and Science, Pilani}{2023 -- 2026}
{Bachelor of Science in Computer Science}{India}

\resumeSubHeadingListEnd

%-----------ACHIEVEMENTS-----------
\section{ACHIEVEMENTS}
\begin{itemize}[leftmargin=0in,label={}]
\small{\item{
\textbf{Infosys Catch Them Young Scholar} (2019); Alumnus, \textbf{Junior Science Academy}, New York Academy of Sciences.
}}
\end{itemize}

\end{document}
```

- [ ] **Step 2: Add the `build:resume` script**

In `package.json`, add to the `scripts` object:

```json
    "build:resume": "tectonic resume/resume.tex --outdir public",
```

- [ ] **Step 3: Compile locally IF Tectonic is installed (optional but preferred)**

Run: `command -v tectonic && npm run build:resume || echo "tectonic not installed — CI (Task 3) will build the PDF on push"`
Expected: either regenerates `public/resume.pdf` (compile succeeds, exit 0) OR prints the skip message. If Tectonic is present and compilation FAILS, stop and fix the `.tex` before continuing.

- [ ] **Step 4: Commit**

```bash
git add resume/resume.tex package.json public/resume.pdf
git commit -m "feat: add LaTeX resume source + build:resume script"
```

(If `public/resume.pdf` was not regenerated in Step 3, `git add public/resume.pdf` is a no-op — that's fine; CI will produce it.)

---

## Task 3: GitHub Action to auto-render the PDF

**Files:**
- Create: `.github/workflows/resume.yml`

**Interfaces:**
- Produces: pushing a change under `resume/` to `main` rebuilds and commits `public/resume.pdf`.

- [ ] **Step 1: Create the workflow**

Create `.github/workflows/resume.yml`:

```yaml
name: Build resume PDF

on:
  push:
    branches: [main]
    paths:
      - "resume/**"
      - ".github/workflows/resume.yml"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install Tectonic
        uses: wtfjoke/setup-tectonic@v3
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}

      - name: Compile resume
        run: tectonic resume/resume.tex --outdir public

      - name: Commit rebuilt PDF
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add public/resume.pdf
          if git diff --cached --quiet; then
            echo "resume.pdf unchanged — nothing to commit"
          else
            git commit -m "chore: rebuild resume.pdf [skip ci]"
            git push
          fi
```

- [ ] **Step 2: Validate YAML syntax**

Run: `python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/resume.yml')); print('yaml ok')"`
Expected: prints `yaml ok`.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/resume.yml
git commit -m "ci: auto-render resume.pdf from LaTeX on push"
```

Note: the workflow runs only once pushed to the GitHub `main` branch. The commit-back is path-filtered to `resume/**` and tagged `[skip ci]`, so it will not retrigger itself.

---

## Task 4: Convert SPA to real per-section routes

This is one atomic task: the app will not compile until all files below are updated together (the current `page.tsx` imports things whose signatures change). Do all steps, then verify once at the end.

**Files:**
- Modify: `src/lib/views.ts`
- Create: `src/components/shell/Shell.tsx`
- Create: `src/app/template.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/shell/Nav.tsx`
- Modify: `src/components/views/HomeView.tsx`
- Rewrite: `src/app/page.tsx`
- Create: `src/app/work/page.tsx`, `src/app/projects/page.tsx`, `src/app/contact/page.tsx`
- Delete: `src/components/shell/ViewShell.tsx`

**Interfaces:**
- Consumes: `getViewMeta(id)` (existing), view components `HomeView`/`WorkView`/`ProjectsView`/`ContactView`.
- Produces:
  - `ViewMeta` now has `href: string`.
  - `viewIdFromPathname(pathname: string): ViewId`.
  - `Shell({ children }: { children: React.ReactNode })` default export.
  - `Nav()` — no props.
  - `HomeView()` — no props.

- [ ] **Step 1: Add `href` + `viewIdFromPathname` to `src/lib/views.ts`**

Replace the entire file with:

```ts
export type ViewId = "home" | "work" | "projects" | "contact";

export interface ViewMeta {
  id: ViewId;
  label: string;
  href: string;
  accent: string;
}

export const VIEWS: ViewMeta[] = [
  { id: "home", label: "Home", href: "/", accent: "#3730a3" },
  { id: "work", label: "Work", href: "/work", accent: "#6b21a8" },
  { id: "projects", label: "Projects", href: "/projects", accent: "#0e7490" },
  { id: "contact", label: "Contact", href: "/contact", accent: "#b45309" },
];

export function getViewMeta(id: ViewId): ViewMeta {
  return VIEWS.find((v) => v.id === id) ?? VIEWS[0];
}

export function viewIdFromPathname(pathname: string): ViewId {
  return VIEWS.find((v) => v.href === pathname)?.id ?? "home";
}
```

- [ ] **Step 2: Create `src/components/shell/Shell.tsx`**

```tsx
"use client";

import Nav from "@/components/shell/Nav";
import ParallaxBackground from "@/components/shell/ParallaxBackground";
import { usePathname } from "next/navigation";
import { getViewMeta, viewIdFromPathname } from "@/lib/views";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const accent = getViewMeta(viewIdFromPathname(pathname)).accent;

  return (
    <>
      <ParallaxBackground accent={accent} />
      {children}
      <Nav />
    </>
  );
}
```

- [ ] **Step 3: Create `src/app/template.tsx`**

This reproduces the old `ViewShell` enter transition. `template.tsx` remounts on every navigation, so each route animates in.

```tsx
"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Template({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  const initial = isMobile
    ? { opacity: 0, y: 8 }
    : { opacity: 0, y: 12, filter: "blur(6px)" };
  const animate = isMobile
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: isMobile ? 0.28 : 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Update `src/app/layout.tsx`**

Replace the entire file with (adds `metadataBase`, title template, Person JSON-LD, and renders `<Shell>`):

```tsx
import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Shell from "@/components/shell/Shell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nymi.sh"),
  title: {
    default: "Nymish Kashivishwanath",
    template: "%s · Nymish Kashivishwanath",
  },
  description: "Building AI agents - and the workflows that run them at scale.",
  keywords: [
    "Nymish",
    "Kashivishwanath",
    "Forward Deployed Engineer",
    "Software Engineer",
    "AI Agents",
    "Distributed Systems",
    "React",
    "Next.js",
    "Node.js",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nymish Kashivishwanath",
    description: "Building AI agents - and the workflows that run them at scale.",
    type: "website",
    url: "https://nymi.sh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nymish Kashivishwanath",
    description: "Building AI agents - and the workflows that run them at scale.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nymish Kashivishwanath",
  url: "https://nymi.sh",
  jobTitle: "Forward Deployed Engineer",
  worksFor: {
    "@type": "Organization",
    name: "AI Studio",
    url: "https://aistudio.ae",
  },
  sameAs: [
    "https://github.com/nymishkash",
    "https://linkedin.com/in/nymish",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-bg text-fg`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Shell>{children}</Shell>
        <GrainOverlay />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Convert `src/components/shell/Nav.tsx` to links**

Replace the entire file with:

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VIEWS, viewIdFromPathname } from "@/lib/views";

export default function Nav() {
  const pathname = usePathname();
  const active = viewIdFromPathname(pathname);

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#0a0a0a]/95 md:bg-white/[0.04] md:backdrop-blur-xl px-1.5 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {VIEWS.map((v) => {
          const isActive = v.id === active;
          return (
            <Link
              key={v.id}
              href={v.href}
              data-cursor="pointer"
              className="relative z-10 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition-colors"
              style={{ color: isActive ? "#fafafa" : "#71717a" }}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(55,48,163,0.18), rgba(107,33,168,0.18))",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {v.label}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
```

- [ ] **Step 6: Convert `src/components/views/HomeView.tsx` CTAs to links**

Two edits in `src/components/views/HomeView.tsx`:

(a) Add the import at the top (after the framer-motion import):

```tsx
import Link from "next/link";
```

(b) Remove the `HomeViewProps` interface and the `onNavigate` param, and change the CTA usage + `HomeCta` component. Change the function signature line:

```tsx
export default function HomeView({ onNavigate }: HomeViewProps) {
```
to:
```tsx
export default function HomeView() {
```

Delete the `HomeViewProps` interface block and the `import type { ViewId } from "@/lib/views";` line (no longer used).

Replace the two `<HomeCta ... />` usages with:

```tsx
                <HomeCta label="View work →" href="/work" primary />
                <HomeCta label="Get in touch" href="/contact" />
```

Replace the entire `HomeCta` function at the bottom with:

```tsx
function HomeCta({
  label,
  href,
  primary = false,
}: {
  label: string;
  href: string;
  primary?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
    >
      <Link
        href={href}
        data-cursor="pointer"
        className={`inline-block rounded-full px-5 py-2.5 text-sm tracking-wide transition-colors ${
          primary
            ? "bg-fg text-bg hover:bg-fg/90"
            : "border border-white/10 bg-white/[0.03] text-fg hover:border-white/25"
        }`}
      >
        {label}
      </Link>
    </motion.div>
  );
}
```

- [ ] **Step 7: Rewrite `src/app/page.tsx` as the server home page**

Replace the entire file with:

```tsx
import HomeView from "@/components/views/HomeView";

export default function Home() {
  return <HomeView />;
}
```

- [ ] **Step 8: Create the three route pages**

Create `src/app/work/page.tsx`:

```tsx
import type { Metadata } from "next";
import WorkView from "@/components/views/WorkView";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Experience: Forward Deployed Engineer at AI Studio, Software Engineer at Wing Assistant (M32 Labs), and Full Stack Engineer at Dukaan (bot9.ai).",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work · Nymish Kashivishwanath",
    description:
      "Experience: Forward Deployed Engineer at AI Studio, Software Engineer at Wing Assistant (M32 Labs), and Full Stack Engineer at Dukaan (bot9.ai).",
    url: "https://nymi.sh/work",
  },
};

export default function WorkPage() {
  return <WorkView />;
}
```

Create `src/app/projects/page.tsx`:

```tsx
import type { Metadata } from "next";
import ProjectsView from "@/components/views/ProjectsView";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects: RL regex environment, WageWizard AI payroll assistant, SmartCloud secrets manager, and more.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects · Nymish Kashivishwanath",
    description:
      "Selected projects: RL regex environment, WageWizard AI payroll assistant, SmartCloud secrets manager, and more.",
    url: "https://nymi.sh/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
```

Create `src/app/contact/page.tsx`:

```tsx
import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Nymish Kashivishwanath — open to roles and collaborations at the edge of AI and distributed systems.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Nymish Kashivishwanath",
    description:
      "Get in touch with Nymish Kashivishwanath — open to roles and collaborations at the edge of AI and distributed systems.",
    url: "https://nymi.sh/contact",
  },
};

export default function ContactPage() {
  return <ContactView />;
}
```

- [ ] **Step 9: Delete the obsolete `ViewShell`**

Run: `git rm src/components/shell/ViewShell.tsx`
Expected: file removed. (Confirm nothing else imports it: `grep -rn "ViewShell" src` should return no results.)

- [ ] **Step 10: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both exit 0, no errors. (If lint flags an unused `ViewId`/`AnimatePresence`/`useState` import left in `page.tsx` or `HomeView.tsx`, remove it.)

- [ ] **Step 11: Production build**

Run: `npm run build`
Expected: build succeeds. In the route summary, `/`, `/work`, `/projects`, `/contact` all appear (prerendered/static `○`).

- [ ] **Step 12: Verify SSR content is crawlable**

Start the built server in the background and curl each route:

Run:
```bash
npx next start -p 3210 &
SRV=$!
sleep 3
echo "--- /work ---";     curl -s localhost:3210/work     | grep -c "Forward Deployed Engineer"
echo "--- /projects ---"; curl -s localhost:3210/projects | grep -c "wagewizard"
echo "--- /contact ---";  curl -s localhost:3210/contact  | grep -c "reachnymish@gmail.com"
kill $SRV
```
Expected: each `grep -c` prints a number `>= 1` (the section's content is present in server-rendered HTML). If any prints `0`, the route is not rendering its content server-side — stop and fix before committing.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: convert SPA to real per-section routes for SEO"
```

---

## Task 5: SEO plumbing — sitemap & robots

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Interfaces:**
- Consumes: `VIEWS` from `src/lib/views.ts` (for the route list).
- Produces: `/sitemap.xml` and `/robots.txt` at runtime.

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { VIEWS } from "@/lib/views";

const BASE_URL = "https://nymi.sh";

export default function sitemap(): MetadataRoute.Sitemap {
  return VIEWS.map((v) => ({
    url: `${BASE_URL}${v.href === "/" ? "" : v.href}`,
    changeFrequency: "monthly",
    priority: v.href === "/" ? 1 : 0.8,
  }));
}
```

- [ ] **Step 2: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://nymi.sh/sitemap.xml",
  };
}
```

- [ ] **Step 3: Build + verify**

Run:
```bash
npm run build
npx next start -p 3211 &
SRV=$!
sleep 3
echo "--- sitemap ---"; curl -s localhost:3211/sitemap.xml | grep -c "nymi.sh/work"
echo "--- robots ---";  curl -s localhost:3211/robots.txt  | grep -c "sitemap.xml"
kill $SRV
```
Expected: both `grep -c` print `>= 1`.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: add sitemap.xml and robots.txt"
```

---

## Self-Review Notes

- **Spec coverage:** §1 career update → Tasks 1 & 2. §2 resume auto-render → Tasks 2 & 3. §3 SEO routing → Tasks 4 & 5 (routes, shell, template, Nav, per-route metadata, JSON-LD, metadataBase, sitemap, robots). All spec sections mapped.
- **Flagged deviation from spec (needs user awareness):** the plan also updates `PERSONAL.tagline` to "Forward Deployed Engineer" (Task 1, Step 1) so the homepage hero + JSON-LD are consistent with the new role. The spec left the tagline unmentioned; this is easily reverted if the user prefers "Full-Stack Engineer".
- **Type consistency:** `viewIdFromPathname`, `getViewMeta`, `ViewMeta.href`, `Shell`, `Nav()` (no props), `HomeView()` (no props) are consistent across Tasks 4–5.
- **Verification is real:** no invented test framework; every task ends in typecheck/build/curl against actual output.
