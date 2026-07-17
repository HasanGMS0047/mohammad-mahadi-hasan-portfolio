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
- `Button` — sharp, bordered, hover-inverts to red. No glow.
- `Panel` — the "block" wrapper used everywhere (cards, timelines, contact tiles). Has
  a real mouse-tracking 3D tilt **plus a slight translate toward the cursor**
  (see `src/lib/use-tilt.ts` — `TILT_RANGE`/`MOVE_RANGE`, spring deliberately slow:
  `stiffness: 110, damping: 22, mass: 1`, tuned that way on request so it feels
  "slow/cool" rather than snappy). On hover it shows a **red glow**
  (`shadow-[0_0_0_2px_var(--color-red),0_0_32px_var(--color-neon-soft)]`), not a hard
  offset shadow — that hard white/ink offset shadow was the old look and was
  explicitly replaced. Any new "block" component should reuse `Panel` or `useTilt`
  directly — don't call `useTilt()` inside a `.map()` at the parent level (breaks
  Rules of Hooks when list length changes, e.g. project filtering, or just as a lint
  rule even when length is static); extract a child component instead (see
  `ProjectCard` in `src/components/sections/projects.tsx` and `ContactTile` in
  `src/components/sections/contact.tsx` for the pattern).
- `SectionHeading` — masthead-style label + index number (e.g. "N° 03"). The index
  numbers are real and sequential across sections; keep them in order if sections are
  reordered/added/removed. The stat numbers in `stats.tsx` have **no glow effect**
  (removed on request — don't re-add `.neon-text`/`.neon-glow` there).
- **Cursor** — there is **no JS cursor-follower component** (`cursor.tsx` and
  `use-fine-pointer.ts` were deleted on request — "I didn't tell you to add a cursor
  extension moving with the cursor"). The cursor itself is replaced via plain CSS in
  `globals.css` under `@media (pointer: fine)`: a small red diamond-outline SVG
  (base64 data URI) as the default `cursor`, swapping to a filled red diamond on
  `a, button, [role="button"], input, textarea, select, summary`. If asked to change
  the cursor look again, edit those two base64 `url(...)` values in `globals.css`
  (or regenerate from a raw SVG + `base64 -w0`) — do not reintroduce a
  mouse-tracking React component for this.
- Loading screen (`src/components/loading-screen.tsx`) shows **his real logo**
  (`public/assets/my-logo.png`, run through `.logo-mark` — a CSS `filter` duotone
  pushing it toward red/black) next to the text **"FOREST47"**, not his real name —
  intentional. The same logo + `.logo-mark` treatment is also in the navbar top-left
  (`src/components/navbar.tsx`). The navbar's top-left brand and the top-right CTA
  button both read **"Forest47"** (previously incorrectly showed "Mahadi" in both
  spots — that was a copy bug, not intentional).

## Content rules — important, don't violate these

Everything in `src/lib/data.ts` must be **real**, never fabricated:
- Projects — 5 real repos on his GitHub, in this order: Wastopia, Life Dashboard,
  AlgoCanvas, UIUNest, ClearPath. Descriptions are sourced from each repo's actual
  README/package.json, not invented. If his GitHub gains more repos in the future,
  check `gh repo list HasanGMS0047 --json name,description,homepageUrl,pushedAt` and
  the repo's README before adding anything — never guess what a project does from its
  name alone.
  - **Deliberately excluded:** `for_you` (description "To the one I love", contains
    `Love-letter.html`/`soft-music.mp3`) — a personal gift site for a partner, not
    professional-showcase material. He explicitly chose to leave it out when asked
    (2026-07-17). Don't add it unless he asks directly.
- Activities — real: UIU CSE FEST 2025 hackathon win with **Team Se7en** (blockchain
  category), college debate team (2nd speaker).
- No client testimonials, no certifications grid, no blog — these were deliberately
  **removed**, not just left empty, because there was no real content for them.
  "Beyond the Code" replaces Testimonials with honest personal-interest cards instead
  of fabricated quotes.
- Stats are real/derivable (e.g. "Projects Shipped" = 5, matching the live count in
  `projects` array — keep these in sync if projects are added/removed), never invented
  client counts or made-up metrics.
- Contact: `hasantheking007@gmail.com`, LinkedIn `mahadi-hasan-2aa0b5335`.

If asked to add content you can't verify (a new job, a quote, a cert), ask rather than
inventing it.

## Assets

- `public/images/` — `profile.jpg` (his real photo) + `projects/*.svg` (Bauhaus-style
  generated thumbnails, one per real project — `wastopia.svg`, `life-dashboard.svg`,
  `algocanvas.svg`, `uiunest.svg`, `clearpath.svg`). Follow the existing style if
  adding more: 800×500 viewBox, `#16171A` background, shapes only in the palette
  colors (`#1B4B8C` blue, `#E3A91A` yellow, `#C81E2C` red), a pale thin baseline near
  the bottom, optional white-stroke node/line accent group.
- `public/assets/` — general drop folder for logos/icons/PDFs, distinct from
  `public/images/`. Now contains `my-logo.png` (his real personal logo, supplied
  2026-07-17) — used in the navbar and loading screen via the `.logo-mark` CSS filter.

## Open / pending items

1. **Resend API key** — the contact form (`src/app/api/contact/route.ts`) sends via
   Resend but needs `RESEND_API_KEY` set in Vercel's environment variables (steps are
   in `README.md`). Unconfirmed whether he's done this yet — the form will show a
   clear "not configured" error until it is, rather than failing silently.

(The personal-logo item that used to be listed here is done — see Assets above.)

## Local dev gotchas

- **Port 3000 is not reliably free**, and neither is 3010 anymore. He has a separate
  project, `Project-Wastopia-main`, whose dev server(s) may squat on 3000–3002.
  Additionally, leftover `next dev -p 3010` processes from past sessions on *this*
  repo tend to linger (Next.js will refuse to start a second dev server for the same
  project directory and will tell you the PID of the existing one instead of actually
  binding the new port — read its stdout, don't assume a fresh `npx next dev -p 3010`
  actually started). Check what's listening first (`netstat -ano | grep LISTENING`),
  identify the owning process (`Get-CimInstance Win32_Process -Filter "ProcessId=<pid>"`
  in PowerShell) before touching anything, and prefer reusing an already-running
  instance of this project (just `curl` it to confirm) over spawning another.
- `git push` may print `git: 'credential-manager-core' is not a git command` — this is
  harmless noise from Windows Git Credential Manager; the push still succeeds (check
  the `main -> main` line, not the warning).
- `gh` CLI is installed and authenticated as `HasanGMS0047` — use it for repo edits
  (`gh repo edit`, `gh repo view --json ...`, `gh repo list ...`) instead of the web UI.

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
6. Created `public/assets/` and this file (CLAUDE.md), for exactly the reason you're
   reading it.
7. He supplied his real logo (`public/assets/my-logo.png`). Wired it into the navbar
   and loading screen with a red/black duotone filter. Replaced the JS cursor-follower
   component entirely with a pure-CSS custom cursor (diamond outline → filled diamond
   on hover of clickables). Fixed the navbar brand/CTA text (was showing "Mahadi" in
   both spots, changed to "Forest47"). Swapped every block's hover shadow from a hard
   white/ink offset to a red neon glow. Removed the glow from the stat numbers. Added
   cursor-tracking translate (not just tilt) to all hoverable blocks, with a
   deliberately slow spring.
8. Checked his GitHub for new repos, found `life-dashboard` and `algocanvas` (both
   real, both verified via README/package.json) plus `for_you` (a personal gift site,
   explicitly excluded — see Content rules). Added the two legitimate projects to
   `src/lib/data.ts` with matching Bauhaus-style SVG thumbnails, updated the Wastopia
   demo URL to its current canonical deployment (`project-wastopia-five.vercel.app`),
   and bumped "Projects Shipped" from 3 to 5.
