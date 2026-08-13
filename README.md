# The What-If Museum

An imaginary museum of real art history. Take a public-domain masterpiece, bend its **era**, its **artist**, or its **material** — and an AI reimagines it while a curator explains why it matters.

```
Browser
   ↓
Vercel / Next.js (App Router)
   ↓
Supabase PostgreSQL + Supabase Storage  ← remixes, likes, generated images
   ↓
Stability AI (img2img) + LLM narration
```

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Demo mode vs. full mode

The app works in **demo mode** with zero keys: remixes are simulated with CSS filters and narration comes from built-in templates. Add keys to `.env.local` (copy from `.env.example`) to enable real AI remixes and LLM narration:

| Variable | Purpose | Get one at |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (publishable, browser-safe) | https://supabase.com |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable API key (not the service-role secret) | https://supabase.com |
| `STABILITY_AI_API_KEY` | Real AI image remixes (img2img style transfer) | https://platform.stability.ai |
| `LLM_API_KEY` | AI curator narration (any OpenAI-compatible API) | https://platform.openai.com |

Optional: `LLM_BASE_URL` (default `https://api.openai.com/v1`) and `LLM_MODEL` (default `gpt-4o-mini`).

All AI keys are **server-side only** — nothing secret is ever shipped to the browser. The Supabase **service-role key is never used** in this project.

## Supabase setup (one-time, manual)

1. Create a project and copy the URL + publishable key into `.env.local`.
2. Open **Supabase → SQL Editor**, paste the whole `supabase/schema.sql` file, click **Run**. This creates:
   - `artworks`, `remixes`, `likes` tables (seeded with the 12-artwork catalog)
   - the **private** `artworks` Storage bucket
   - Row Level Security + Storage policies (users can only touch their own data)
3. Enable **Anonymous sign-ins**: Supabase → Authentication → Sign In / Up → Anonymous sign-ins → **Enable**. The app signs each browser in anonymously so every remix has an owner (no signup form needed).

### How persistence works

- **No localStorage.** Remixes live in PostgreSQL and follow users across devices.
- **No image binaries in Postgres.** Generated images are uploaded to the private `artworks` Storage bucket at `remixes/{user_id}/{remix_id}.png` and fetched back via **signed URLs**.
- Remix rows store `user_id`, `artwork_id`, `title`, remix parameters (`era`/`artist`/`material`), the exact `prompt`, the curator `narration`, and `storage_path`.
- RLS guarantees users can only read/update/delete their own remixes; `likes` has a unique `(remix_id, user_id)` constraint.

## Code map

- **`lib/artworks.ts`** — the 12-artwork catalog (public-domain images from Wikimedia Commons).
- **`lib/dimensions.ts`** — the remix matrix: 8 eras × 8 artists × 8 materials, each with an image prompt and a historical note.
- **`app/api/remix/route.ts`** — server-only: downloads the artwork, builds the prompt, calls Stability AI (image-to-image), returns the image + narration. Demo fallback when no key.
- **`lib/narration.ts`** — LLM curator narration with a template fallback.
- **`lib/supabase/`** — `client.ts` (browser), `server.ts` (@supabase/ssr), `remixes.ts` (save/fetch/delete + Storage upload + signed URLs).
- **`app/components/`** — `RemixPanel` (remix controls), `RemixStrip` (cloud gallery), `SessionBootstrap` (anonymous sign-in).

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com) → **Add New → Project → Import Git Repository** and select it. Vercel auto-detects Next.js — leave build settings as-is.
3. Add environment variables under **Project → Settings → Environment Variables** (same names as `.env.example`):
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (public, exposed to browser by design)
   - `STABILITY_AI_API_KEY`, `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL` (server-side)
4. Click **Deploy**.
5. When you later add Supabase Auth with email/OAuth, add your Vercel domain to **Supabase → Authentication → URL Configuration** (Allowed Redirect URLs).

## Scripts

- `npm run dev` — development server
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm run build` — production build (works without any localhost services)
