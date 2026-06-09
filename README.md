# GSAP Academy

> An interactive, motion-forward tutorial for learning **GSAP** — every concept sits beside a live, replayable demo. Read the code on one side, watch it animate on the other.

Built with **Vite + React + TypeScript**, animated with **GSAP 3.13** core + **ScrollTrigger** and the official **`@gsap/react`** `useGSAP()` hook. The interface itself is the lesson — it's animated entirely with the techniques it teaches.

![Stack](https://img.shields.io/badge/Vite-React%20TS-0B0E14?style=flat-square) ![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02?style=flat-square)

## What it teaches

| # | Lesson | Live demo |
|---|--------|-----------|
| 01 | **Tweens** — `to` / `from` / `fromTo`, transform shorthands | a box flies in with `back.out` |
| 02 | **Timelines** — sequencing + the position parameter | three bars stage in with overlap |
| 03 | **Easing** — power / back / elastic / bounce | five pucks race under five eases |
| 04 | **Stagger** — `each`, `from`, grid-aware ripples | 28 cells ripple from centre |
| 05 | **ScrollTrigger** — `start`/`end`, `toggleActions`, scrub, pin | cards reveal & reverse on scroll |
| 06 | **useGSAP()** — scoped selectors + auto-revert on unmount | a looping pulse you can unmount |

## Design

A premium **"Motion Lab"** direction — deep slate canvas, layered surfaces, the
real **GSAP green (`#88CE02`)** as the live-action accent. Type pairing:
**Space Grotesk** (display) · **Inter** (body) · **JetBrains Mono** (code).

- Compositor-only animation (`transform` / `opacity`) for 60fps
- Full `prefers-reduced-motion` support (motion collapses to instant)
- Responsive 375 → 1440, demo-above-prose on mobile
- Zero-dependency syntax highlighter for the code blocks (tiny bundle)

## Develop

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # type-check + production build → dist/
pnpm preview  # preview the production build
```

## Deploy

Live on **GitHub Pages** via the `gh-pages` branch:
**https://tduong628.github.io/gsap-academy/**

To re-deploy after changes:

```bash
GHPAGES=1 pnpm build                       # build with the /gsap-academy/ base
git --work-tree dist add -A                # publish dist/ to the gh-pages branch
# (or use any static-publish step that pushes dist/ to gh-pages)
```

A GitHub Actions workflow that automates this on every push to `main` is included
at `docs/github-pages-workflow.yml`. Once the `gh` token has the `workflow` scope
(`gh auth refresh -s workflow`), move it to `.github/workflows/deploy.yml`, push, and
set **Settings → Pages → Source: GitHub Actions**.

## Project layout

```
src/
├── lib/gsap.ts            # single plugin-registration barrel
├── hooks/useReducedMotion.ts
├── data/lessons.ts        # lesson copy + code snippets (single source of truth)
├── components/
│   ├── Hero, Nav, Footer, LessonSection, CodeBlock
│   └── demos/             # one live, replayable demo per concept
└── styles/                # tokens.css (design system) + global.css
```

---

Built for John Duong. Learn it, then go make something move.
