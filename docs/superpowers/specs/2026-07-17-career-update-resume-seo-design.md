# Career update, LaTeX resume auto-render, and SEO routing — Design

Date: 2026-07-17

## Context

Personal site (`nymi.sh`) on Next.js 15 App Router. Three changes:

1. **Career update** — resigned M32 (Wing Assistant) Jun 2026, joined AI Studio
   (aistudio.ae) as Forward Deployed Engineer, Jun 2026–Present, Bengaluru (remote).
2. **Resume** — LaTeX source lives in the repo and the PDF at `/resume.pdf` is
   auto-rendered from it.
3. **SEO** — the site is a client-side SPA (`app/page.tsx` swaps 4 views via
   `useState`), so crawlers only ever see Home. Sections must become real routes.

Career data currently lives in two independent places that both need updating: the
LaTeX resume (new, added in this work) and `src/lib/constants.ts` (`EXPERIENCE`
array, feeds the Work view). These stay separate authored sources — not unified.

## 1. Career update

**`src/lib/constants.ts`** `EXPERIENCE` array:
- Prepend a new top entry: AI Studio · Forward Deployed Engineer · `Jun 2026 – Present`
  · Bengaluru, India · Remote. Accent `#3730a3` (or a fresh accent). Draft bullets
  (placeholders, to be edited by user):
  - Forward-deployed engineer embedding with enterprise clients to scope, build, and
    ship custom AI-agent solutions end-to-end — from discovery to production.
  - Build production LLM systems (RAG, function-calling agents, workflow automation)
    integrated directly into client stacks and data sources.
  - Own delivery end-to-end: translate ambiguous business requirements into working
    systems and iterate on-site with stakeholders.
  - tech: e.g. `["TypeScript", "Node.js", "React", "LLMs", "RAG"]`
- Change M32 (Wing Assistant) `period`: `May 2025 – Present` → `May 2025 – Jun 2026`.
- Fix stale `PERSONAL.website`: `nymish.xyz` → `nymi.sh`.

**LaTeX resume** (see §2): mirror the same two changes — add an AI Studio
`\resumeSubheading` block at the top of EXPERIENCE, and change the Wing Assistant
dates to `May 2025 -- Jun 2026`.

Not changed: resume contact email stays `reachnymish@gmail.com`; site location stays
Bengaluru.

## 2. LaTeX resume → auto-rendered PDF

- Source at **`resume/resume.tex`** — the user's existing LaTeX with the career
  update applied.
- **`.github/workflows/resume.yml`**: trigger on push to `main` with path filter
  `resume/**`. Steps:
  1. checkout (with write permissions: `contents: write`)
  2. install/run **Tectonic** (self-contained LaTeX; fetches CTAN packages incl.
     `lato`, `fontawesome5`, `marvosym`)
  3. compile `resume/resume.tex` → `public/resume.pdf`
  4. commit `public/resume.pdf` back if changed, commit message includes `[skip ci]`
- No commit loop: path filter is `resume/**`, and the auto-commit only changes
  `public/resume.pdf`, so it does not re-trigger the workflow. The host (Vercel)
  redeploys on the commit and continues serving the static `/resume.pdf` — the route
  is unchanged, no frontend work needed.
- Convenience: `npm run build:resume` script for local Tectonic compiles.

## 3. SEO — real routes per section

Split the SPA into real server-rendered pages:

- `app/page.tsx` → renders `<HomeView />` (home)
- `app/work/page.tsx` → `<WorkView />`
- `app/projects/page.tsx` → `<ProjectsView />`
- `app/contact/page.tsx` → `<ContactView />`

Each page is a server component that renders its (still `"use client"`) view
component — client components SSR into the initial HTML, so all content is crawlable —
and exports per-route `metadata` (title, description, canonical, OpenGraph).

**Shared animated shell** moves into the layout:
- `app/layout.tsx` renders a `<Shell>` client component holding `ParallaxBackground`
  and `Nav` (persistent chrome across routes).
- **`app/template.tsx`** carries the enter transition (y + blur reveal, mobile
  blur-skip preserved from the current `ViewShell`). `template.tsx` remounts on each
  navigation, giving per-route enter animation.
- Tradeoff (accepted): template does **enter-only**, so the outgoing view's exit-blur
  is dropped. Robust, minimal. (Alternative not chosen: `FrozenRouter` +
  `AnimatePresence` for full enter+exit parity — heavier/more fragile.)

**Navigation:**
- `Nav` switches from `active`/`onChange` state to `next/link` + `usePathname()` for
  active-link styling. The framer `layoutId="nav-active"` pill is preserved.
- `HomeView` CTAs become links (`/work`, `/contact`) instead of `onNavigate` calls.
- `ViewShell` and `page.tsx`'s `useState`-based view switching are removed/replaced.
- `getViewMeta`/accent still drives `ParallaxBackground` colour — Shell derives the
  active view from `usePathname()`.

**SEO plumbing:**
- `app/sitemap.ts` — the 4 routes.
- `app/robots.ts` — allow all, point to sitemap.
- Root `metadata.metadataBase` = `https://nymi.sh` for canonical/OG URL resolution.
- **Person JSON-LD** `<script>` in the layout for rich results.

## Out of scope

- Unifying `resume.tex` with `constants.ts`.
- Any visual redesign.

## Success criteria

- `curl https://nymi.sh/work` (and /projects, /contact) returns HTML containing that
  section's content.
- Editing `resume/resume.tex` and pushing regenerates `public/resume.pdf` via CI.
- The site's navigation and enter transitions still look/feel as before.
