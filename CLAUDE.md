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
- `Panel` — the "block" wrapper used everywhere (cards, timelines, contact tiles,
  **including the contact form panel now** — it was the one Panel with `hover={false}`,
  explicitly turned back on because he asked for literally every box to animate on
  hover). Has a real mouse-tracking 3D tilt **plus a translate toward the cursor**
  (see `src/lib/use-tilt.ts` — currently `TILT_RANGE = 7`, `MOVE_RANGE = 18`,
  `SPRING = { stiffness: 90, damping: 18, mass: 1.3 }`; this has been tuned twice on
  request, first for a "slow/cool" feel, then made bigger/heavier — if asked again,
  adjust these three constants rather than the per-component motion values). On hover
  it shows the **neo-brutalist hard offset shadow** —
  `hover:shadow-[9px_9px_0_var(--color-red)]` — a flat, no-blur "pop" in the site's
  red, not a soft/blurred glow and not an outline ring. This went through three
  iterations: original was `var(--color-ink)` at `6px` (white in dark mode) → briefly
  a blurred red glow + ring → reverted to hard-offset red at `6px` → offset bumped to
  `9px` for a heavier pop. **Don't reintroduce a blur/glow here** — the hard, sharp
  offset *is* the intended look. The `.panel` class's own **base border** (always
  visible, not just on hover) was also `2px solid var(--color-ink)` (white in dark
  mode) and is now `2px solid var(--color-red)` — same reasoning, thick border kept,
  color changed. The internal divider lines inside `ProjectCard` (between thumbnail
  and body, above the code/demo links) and inside the stats grid (`divide-*`) went
  ink → red too, for the same reason — **there should be no white/ink-colored lines
  or borders anywhere on a box, only red or the surface/paper background.** Any new
  "block" component should reuse `Panel` or `useTilt` directly — don't call
  `useTilt()` inside a `.map()` at the parent level (breaks Rules of Hooks when list
  length changes, e.g. project filtering, or just as a lint rule even when length is
  static); extract a child component instead (see `ProjectCard` in
  `src/components/sections/projects.tsx` and `ContactTile` in
  `src/components/sections/contact.tsx` for the pattern).
- **No hover-to-white anywhere.** Several small "icon button" elements used the
  convention `hover:bg-ink hover:text-paper`, which is white-bg/black-text in dark
  mode — disliked and converted to `hover:bg-red hover:text-white` (+`hover:border-red`
  where there's a border) everywhere it appeared: `.stamp` (skill/stack tag pills, in
  `globals.css`), stats-grid cells (`stats.tsx` — text also swaps to white on hover so
  the red-on-red number stays legible), footer social icons, the theme toggle, mobile
  nav links, contact-section social icons, and the `Button` `secondary` variant. If you
  add a new small interactive icon/pill, default its hover state to red/white, not
  ink/paper. Separately, the project card's thumbnail hover overlay used `bg-ink/60` as
  a darkening scrim, but `ink` is a *foreground* token that's white in dark mode, so it
  was lightening the image instead of dimming it — fixed by using a literal `bg-black/60`
  there instead of a theme token, since the intent was "always dark scrim," not
  "theme-appropriate foreground."
- `SectionHeading` — masthead-style label + index number (e.g. "N° 03"). The index
  numbers are real and sequential across sections; keep them in order if sections are
  reordered/added/removed. The stat numbers in `stats.tsx` have **no glow effect**
  (removed on request — don't re-add `.neon-text`/`.neon-glow` there).
- **Cursor** — there is **no JS cursor-follower component** (`cursor.tsx` and
  `use-fine-pointer.ts` were deleted on request — "I didn't tell you to add a cursor
  extension moving with the cursor"). The cursor itself is replaced via plain CSS in
  `globals.css` under `@media (pointer: fine)`: **one** custom cursor (a small solid
  red arrow/pointer shape, base64 SVG data URI) applied identically to `body` and to
  `a, button, [role="button"], input, textarea, select, summary` — deliberately the
  *same* image everywhere now, no separate hover shape. (An earlier version used a
  red diamond that changed shape/rotation on hover; that was explicitly disliked and
  replaced with this single plain arrow — don't reintroduce shape-shifting or a
  diamond.) If asked to change the cursor look again, edit that one base64 `url(...)`
  value in `globals.css` (regenerate from a raw SVG + `base64 -w0`), and remember the
  selector list needs the *same* value repeated — `a`/`button` have a default UA
  `cursor: pointer` that wins over anything only set on `body`, since inheritance
  loses to an explicit rule on the element itself. Do not reintroduce a
  mouse-tracking React component for this.
- Loading screen (`src/components/loading-screen.tsx`) shows **his real logo**
  (`public/assets/my-logo.png`, 1254×1254 source, plenty of resolution up to a couple
  hundred px — no need to ask for a higher-res version unless it's going somewhere
  much bigger than the navbar/loading screen) run through `.logo-mark` — a CSS
  `filter` duotone pushing it toward red/black — next to the text **"FOREST47"**, not
  his real name — intentional. The same logo + `.logo-mark` treatment is also in the
  navbar top-left (`src/components/navbar.tsx`). Both spots render it in a plain
  `overflow-hidden rounded-full` container with **no border and no background box** —
  an earlier version wrapped it in `border-2 border-ink bg-ink`, which showed as an
  unwanted white outline in dark mode; he asked for it to look "seamless... like it's
  a part of the site" instead, so it's now just the circular-cropped image floating
  directly on the navbar/loading-screen background (the crop matches the artwork's
  own circular emblem composition — this `rounded-full` is a deliberate exception to
  the sharp-corners rule for this one brand asset, not a change to the design
  system). Navbar logo is 40px, loading-screen logo is 64px. The navbar's top-left
  brand and the top-right CTA button both read **"Forest47"** (previously incorrectly
  showed "Mahadi" in both spots — that was a copy bug, not intentional).

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
  category). The college debate team (2nd speaker) used to have its own entry here too,
  but was removed — see the "Fun Facts is the only personal-interest section" bullet
  below.
- No client testimonials, no certifications grid, no blog — these were deliberately
  **removed**, not just left empty, because there was no real content for them.
  "Fun Facts" (`src/components/sections/beyond-the-code.tsx`, section id `#beyond`,
  formerly titled "Beyond the Code") replaces Testimonials with honest personal-interest
  cards instead of fabricated quotes.
- **Fun Facts is the *only* place chess, debate, and language-learning appear.** He
  explicitly asked (2026-07-17) that this personal-interest content — competitive
  chess, having been a college debate 2nd speaker, and learning German/French/Japanese
  — live in exactly one section and nowhere else on the site. It had leaked into the
  hero tagline, the About bio, an About "Beyond the screen" interest-stamp list (now
  deleted along with the `interests` export it read from), a full Activities timeline
  entry, an About "My Journey" timeline entry, a Stats tile ("Languages Learning"), and
  the Contact section's heading copy ("...or just want to talk chess?"). All of those
  were rewritten/removed to be purely professional; only the four Fun Facts cards
  (`beyondTheCode` in `data.ts`) still mention this stuff. If new personal-interest
  content is ever added, it goes in Fun Facts only — don't sprinkle it into the bio,
  timeline, activities, or contact copy "for personality."
- Skills (`skillCategories` in `data.ts`) has a **"Languages" category** (JavaScript,
  TypeScript, Python, Java) added 2026-07-17 after checking his GitHub profile README
  (`github.com/HasanGMS0047/HasanGMS0047`), which states he works in Python and Java
  too, not just JS/TS — that wasn't reflected in Skills before. When re-verifying
  content against GitHub, check that profile-repo README in addition to individual
  project READMEs; it's the closest thing he has to a personal bio and is a legitimate
  source for skills/interests, unlike inventing them.
- Stats are real/derivable (e.g. "Projects Shipped" = 5, matching the live count in
  `projects` array — keep these in sync if projects are added/removed; "Public Repos"
  = 7, matching `gh api users/HasanGMS0047 --jq .public_repos` — re-check and update if
  he adds/removes repos), never invented client counts or made-up metrics.
- Contact: `hasantheking007@gmail.com`, LinkedIn `mahadi-hasan-2aa0b5335`.

If asked to add content you can't verify (a new job, a quote, a cert), ask rather than
inventing it.

## Assets

- `public/images/` — `profile.jpg` (his real photo) + `projects/*.svg` (Bauhaus-style
  generated thumbnails, one per real project — `wastopia.svg`, `life-dashboard.svg`,
  `algocanvas.svg`, `uiunest.svg`, `clearpath.svg`). Follow the existing style if
  adding more: 800×500 viewBox, `#16171A` background, shapes only in the palette
  colors (`#1B4B8C` blue, `#E3A91A` yellow, `#C81E2C` red), optional white-stroke
  node/line accent group for a "network/graph" motif. **Don't add a pale baseline
  line near the bottom** — three of the five thumbnails had one
  (`stroke="#E7E8E2" opacity="0.35"`) and it was removed as part of the "no white
  lines on boxes" cleanup.
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
9. He disliked the red-diamond cursor and the blurred red glow/outline hover effect
   from step 7 — walked both back. Cursor is now one plain solid red arrow (no shape
   change on hover). Hover shadow is back to the original hard `6px 6px 0` offset
   (the neo-brutalist look), just recolored from ink/white to red instead of the
   glow. See the `Panel`/Cursor bullets above — don't redo either of these.
10. Swept the whole site for remaining white/ink-colored lines and hover states and
    converted them all to red (see the `Panel`/"No hover-to-white" bullets above for
    the full list: `.panel` base border, internal card/stats dividers, `.stamp`
    hover, stats-cell hover, footer/theme-toggle/mobile-nav/Button-secondary hover,
    and the project-thumbnail hover overlay). Made the hover tilt/translate heavier
    (bigger range, heavier spring) and the offset shadow bigger (6px → 9px). Turned
    hover back on for the contact form panel, the one box that didn't animate before,
    per his request that literally every box animate on hover. Also removed a faint
    pale baseline line from three project thumbnail SVGs.
11. He asked for the portfolio to "look professional" and for the personal-interest
    material he'd given (chess, debate, language-learning) to live in exactly one
    section instead of being scattered — see the "Fun Facts is the only
    personal-interest section" bullet above for the full list of what got rewritten.
    Renamed "Beyond the Code" to "Fun Facts". Re-checked his GitHub, including his
    profile README (`HasanGMS0047/HasanGMS0047`) this time, not just project READMEs;
    found he also codes in Python/Java and added a "Languages" Skills category for
    that. Swapped the removed "Languages Learning" stat for a real GitHub metric
    ("Public Repos": 7).
