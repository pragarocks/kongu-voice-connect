# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server on port 8080
npm run build        # Production build to dist/
npm run build:dev    # Unoptimized dev build
npm run lint         # ESLint
npm run preview      # Preview production build locally
npm run test         # Run Vitest once
npm run test:watch   # Vitest in watch mode
```

Run a single test file:
```bash
npx vitest run src/test/example.test.ts
```

## Architecture

**The Kongu Times** is a bilingual (English/Tamil) static news portal for Tamil Nadu's Kongu region. It is 100% data-driven with no backend — all content comes from imported JSON files.

### Routing (App.tsx)
React Router 6 with 11 routes: `/` (homepage), `/candidates-2026`, 8 district pages (`/erode`, `/coimbatore`, etc.), `/manage-content` (CMS), and `*` (404). Wrapped in `LanguageProvider`, `QueryClientProvider`, `TooltipProvider`, and `Toaster`.

### Data Flow
All news data lives in `src/data/news/*.json` (one file per district + `main.json` for featured/trending). Editing a JSON file is the only way to publish content permanently. `src/data/districtNews.ts` imports and re-exports all district JSONs as a keyed object (`districtNews[slug]`) plus metadata (`districtMeta`). The CMS at `/manage-content` writes to `localStorage` only — changes there do not persist to JSON.

### Key Data Types
```ts
// src/data/districtNews.ts
interface DistrictNewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;      // "Election" | "Campaign" | "Awareness" | "Enforcement" | ...
  date: string;          // e.g. "May 14, 2026"
  featured?: boolean;
  image?: string;        // Unsplash URL or Google Cloud Storage path
}

// src/data/candidates.ts
interface Candidate {
  ac: number;            // Assembly Constituency number
  con: string;           // Constituency name
  dmk: string; aiadmk: string; tvk: string; ntk: string;  // Candidate names per party
}
```

### Bilingual Support
`src/contexts/LanguageContext.tsx` exposes a `t(en, ta)` helper. Pass both strings and the active language is returned. Tamil font (`Tiro Tamil`) is applied via Tailwind's `font-tamil` class.

### Page Templates
- **`pages/Index.tsx`** — Homepage: aggregates all 9 JSON files, sorts by date, renders hero grid, trending scroll, latest 6 articles, and district links.
- **`pages/DistrictPage.tsx`** — Reusable district template. Each `pages/districts/*.tsx` just passes a district slug prop into this component.

### UI Components
`src/components/ui/` contains 50+ shadcn/ui primitives (Radix UI wrappers). Custom components: `SiteHeader.tsx` (sticky header with nav, date, language toggle, socials), `SiteFooter.tsx`, `NewsCard.tsx`.

### Styling
TailwindCSS with custom config: fonts `Playfair Display` (headlines), `DM Sans` (body), `Tiro Tamil` (Tamil script). Custom colors: `teal`, `gold`, sidebar variants. Custom keyframes: `fade-up`, `fade-in`, `scale-in`. Path alias `@` maps to `src/`.

### TypeScript
Strict mode is off (`noImplicitAny: false`, `strictNullChecks: false`). Type safety is intentionally loose for faster iteration.

### Automated News Fetching (`scripts/fetch-news.cjs`)
Runs every 4 hours via `.github/workflows/fetch-news.yml`. Fetches Google News RSS feeds (one query per district + a Kongu region query), rewrites each article with AI, and updates the JSON files in `src/data/news/`. The workflow then builds the Vite site and deploys to GitHub Pages in the same run.

**AI provider selection** (first match wins):
- `OPENAI_API_KEY` starts with `sk-` → uses `gpt-4o-mini`
- `GEMINI_API_KEY` is set → uses `gemini-2.0-flash`
- Neither set → copies RSS content as-is (fallback mode)

Set these as GitHub repository secrets (`Settings → Secrets and variables → Actions`).

**Deduplication**: articles are matched by normalized title (lowercased, punctuation stripped). Articles older than 7 days (`KEEP_DAYS`) are pruned on each run.

**District JSON format** written by the script (extends existing schema with optional Tamil fields):
```json
{ "id": "ero-may14-001", "category": "Weather", "featured": true,
  "title": "English title", "title_ta": "தமிழ் தலைப்பு",
  "summary": "English summary.", "summary_ta": "தமிழ் சுருக்கம்", "date": "May 14, 2026" }
```

**main.json trending** uses `title_en`/`title_ta`/`summary_en`/`summary_ta` (matching existing schema).

### Deployment
- **On code push**: `.github/workflows/deploy.yml` builds and deploys to GitHub Pages.
- **On schedule**: `.github/workflows/fetch-news.yml` fetches news, commits updated JSON, builds and deploys.
- Both workflows share a `concurrency: group: pages` guard to prevent parallel Pages deployments.
