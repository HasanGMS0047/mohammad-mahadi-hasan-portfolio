# Project Context & Roadmap

Read this first in any new session on this repo. It exists so work can be picked up
cold — by you, a future me, or a different agent — without re-deriving everything
from scratch.

## What this is

A **real** personal portfolio site for **Mohammad Mahadi Hasan** — not a demo, not a
placeholder persona. He's a CSE undergrad at United International University (UIU),
Dhaka, Bangladesh. GitHub handle `HasanGMS0047`, online alias **Forest47**.

- **Live site:** https://mohammad-mahadi-hasan-portfolio.vercel.app
- **GitHub repo:** https://github.com/HasanGMS0047/mohammad-mahadi-hasan-portfolio (public)
- **Vercel:** connected to the `main` branch, auto-deploys on every push

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + next-themes.

## Design system — "Bauhaus + neon"

Flat geometric red/black/yellow, sharp corners (no `rounded-*`), thick 2px borders.
Tokens live in `src/app/globals.css` (`--color-paper/ink/red/blue/yellow/neon`, both
light and dark themes fully defined — dark is the default). Display/body typeface is
Archivo via `next/font/google`.

Key shared primitives (`src/components/ui/`):
- `Button` — sharp, bordered, hover-inverts to red. **No glow** (removed per request).
- `Panel` — the "block" wrapper used everywhere (cards, timelines, contact tiles). Has
  a real mouse-tracking 3D tilt (see `src/lib/use-tilt.ts`) plus a hard offset shadow
  on hover. Any new "block" component should reuse `Panel` or `useTilt` directly —
  don't call `useTilt()` inside a `.map()` at the parent level (breaks Rules of Hooks
  when list length changes, e.g. project filtering); extract a child component instead
  (see `ProjectCard` in `src/components/sections/projects.tsx` for the pattern).
- `SectionHeading` — masthead-style label + index number (e.g. "N° 03"). The index
  numbers are real and sequential across sections; keep them in order if sections are
  reordered/added/removed.
- Custom cursor (`src/components/cursor.tsx`) — small red diamond, fills solid + spins
  upright over links/buttons. Desktop-only (`useFinePointer` gates on fine pointer +
  no-reduced-motion). Loading screen (`src/components/loading-screen.tsx`) shows the
  text **"FOREST47"**, not his real name — intentional.

## Content rules — important, don't violate these

Everything in `src/lib/data.ts` must be **real**, never fabricated:
- Projects (Wastopia, UIUNest, ClearPath) — real repos, descriptions sourced from his
  actual deployed sites, not invented.
- Activities — real: UIU CSE FEST 2025 hackathon win with **Team Se7en** (blockchain
  category), college debate team (2nd speaker).
- No client testimonials, no certifications grid, no blog — these were deliberately
  **removed**, not just left empty, because there was no real content for them.
  "Beyond the Code" replaces Testimonials with honest personal-interest cards instead
  of fabricated quotes.
- Stats are real/derivable (e.g. "years coding" from his GitHub join date), never
  invented client counts or made-up metrics.
- Contact: `hasantheking007@gmail.com`, LinkedIn `mahadi-hasan-2aa0b5335`.

If asked to add content you can't verify (a new job, a quote, a cert), ask rather than
inventing it.

## Assets

- `public/images/` — `profile.jpg` (his real photo) + `projects/*.svg` (Bauhaus-style
  generated thumbnails for the 3 real projects, not photos).
- `public/assets/` — general drop folder for anything new (logo, extra icons, PDFs).
  Created for exactly this purpose; nothing in here yet as of this writing.

## Open / pending items

1. **Personal logo** — he wants a logo shown next to "FOREST47" on the loading screen.
   Not supplied yet. Don't fabricate one — ask for a file path (same pattern used to
   get his profile photo: he saves it locally, gives the path, we copy it into
   `public/assets/`). A same-named logo exists on his *other* project
   (project-wastopia.vercel.app) but it 404s when fetched directly — don't burn time
   re-trying that; just ask him directly.
2. **Resend API key** — the contact form (`src/app/api/contact/route.ts`) sends via
   Resend but needs `RESEND_API_KEY` set in Vercel's environment variables (steps are
   in `README.md`). Unconfirmed whether he's done this yet — the form will show a
   clear "not configured" error until it is, rather than failing silently.

## Local dev gotchas

- **Port 3000 is not reliably free.** He has a separate project,
  `Project-Wastopia-main`, whose dev server(s) may already be squatting on
  3000–3002. Don't assume `localhost:3000` is this site — check first
  (`netstat -ano | grep LISTENING`) or just run this project on an explicit free port:
  `npx next dev -p 3010`.
- `git push` may print `git: 'credential-manager-core' is not a git command` — this is
  harmless noise from Windows Git Credential Manager; the push still succeeds (check
  the `main -> main` line, not the warning).
- `gh` CLI is installed and authenticated as `HasanGMS0047` — use it for repo edits
  (`gh repo edit`, `gh repo view --json ...`) instead of the web UI.

## History (chronological, high-level)

1. Built a full glassmorphic indigo/violet/cyan portfolio ("Aura") for a placeholder
   persona ("Alex Morgan") from the original generic feature request.
2. User revealed real identity. Did a full Bauhaus red/black/yellow redesign and
   replaced *all* content with verified real facts (pulled via GitHub API + WebFetch
   of his live project deployments) — see Content rules above.
3. Installed Node/git/gh CLI (none were present on this machine originally), pushed to
   a new public GitHub repo, deployed via Vercel's dashboard GitHub import.
4. Iterative polish: fixed nav label (Mohammad → Mahadi), credited Team Se7en, wired
   the Resend contact form, pointed SEO metadata/sitemap at the real deployed URL.
5. Removed floating hero badges, removed button glow, added real mouse-tracking tilt
   to all interactive blocks, replaced the custom cursor with a unique red-diamond
   design, changed the loading-screen name to "Forest47".
6. Created `public/assets/` and this file, for exactly the reason you're reading it.
