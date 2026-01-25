## NotesGen AI

Generate **structured, readable study notes** from YouTube lectures—then **save, revisit, and manage** them with authentication.

This project is built to showcase end-to-end product thinking: clean UX, reliable data flow, auth + persistence, and practical API boundaries.

## Demo

- **Screenshots** (add yours)
  - `./docs/screenshots/home.png`
  - `./docs/screenshots/generated-notes.png`
  - `./docs/screenshots/all-notes.png`
  - `./docs/screenshots/login.png`
- **Screen recording**
  - Add a link here (YouTube/Drive/Dropbox) or embed a GIF in this section.

## Key features (what a recruiter cares about)

- **YouTube URL → structured notes**: Validates input, extracts video id, generates notes via API route.
- **Persisted notes library**: “All Notes” grid for fast retrieval, with detail pages per video.
- **Authentication + gated actions**: Save/delete are restricted to signed-in users.
- **Production-grade UX**: loading states, empty states, and clear navigation.
- **Separation of concerns**: UI components, hooks, services, and API routes are split cleanly.

## Tech stack

- **Frontend**: Next.js (App Router), React, TypeScript
- **Styling/UI**: Tailwind CSS + shadcn/ui components
- **State**: Zustand (`src/stores/`)
- **Backend**: Next.js Route Handlers (`src/app/api/`)
- **DB/Auth**: Supabase

## Project structure (high-level)

```
src/
  app/                    # Next.js routes (pages + API route handlers)
    api/                  # Backend endpoints (notes generation, video, etc.)
    notes/                # Notes pages (detail + all notes)
    auth/                 # Login/Register pages
  components/             # UI building blocks (layouts, notes, ui)
  hooks/                  # Data + mutation hooks (generate, get notes, auth)
  services/               # External/service-layer logic (video, transcript, notes)
  lib/                    # Utilities (supabase clients, youtube parsing, time, validation)
  stores/                 # Zustand stores (global, user)
  types/                  # Shared TypeScript types
```

## How it works (short, recruiter-friendly)

- **Client** validates and extracts a YouTube video id.
- **Server route** generates notes and returns a structured JSON shape.
- **Client** renders notes with clear sections (summary, key points, detailed notes).
- **Supabase** stores notes rows per user + video id; saved notes are fetched and listed in “All Notes”.

## Getting started (local)

### Prerequisites

- Node.js 18+ (recommended)
- A Supabase project (URL + anon key)

### Install

```bash
npm install
```

### Environment variables

Create a `.env.local` in the project root.

You’ll need (names may vary—check `src/lib/supabase/*`):

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

If your notes generation endpoint needs additional secrets (LLM keys, etc.), add them here as well.

### Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Common workflows

- **Generate notes**: Paste a YouTube URL on Home → Generate.
- **Save notes**: Click “Save Notes” (requires login).
- **View saved notes**: Go to “All Notes” → open a note.
- **Delete notes**: Open a saved note → Delete.

## Engineering highlights (why this is built the way it is)

- **Clean boundaries**: API routes handle server work; hooks encapsulate data fetching/mutations; components stay presentational.
- **Type safety**: Shared `types/` reduce runtime surprises and make refactors safer.
- **UX-first states**: deliberate empty/loading/error states; navigation supports back-tracking.
- **Maintainability**: folder layout supports adding features (export, sharing, search) without rewiring the app.

## Screenshots & recording checklist (for recruiters)

Include these to make the repo instantly scannable:

- Home + input validation error state
- Notes generation loading state
- Generated notes view (summary + key points + detailed notes)
- Save/Delete flows (with auth gating)
- All Notes grid

## Roadmap (optional, but signals product thinking)

- Notes export (PDF/Markdown)
- Search & filtering in “All Notes”
- Better transcript status/progress
- Tagging + collections

## Deployment

- Works well on Vercel (Next.js App Router).
- Ensure your environment variables are set in the hosting provider.

## Author

- Parshuram Bagade
- Add: LinkedIn, portfolio, and email here

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
