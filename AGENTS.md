# Project Overview
**Portfolio de Nahuel Salvatierra**
A personal portfolio website built with Next.js 16 (App Router). Multi-page Signal Core portfolio: `/`, `/projects`, `/skills`, `/about` with signal-wipe page transitions, scroll-driven R3F hero on home, project melt overlays, and GSAP reveals.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router), static export + `basePath: /portfolio`
- **Language**: TypeScript 5 (React 19)
- **Styling**: TailwindCSS 4, CSS variables (deep black + neon violet/magenta from AI artwork palette)
- **Fonts**: Syne (display), DM Sans (body), IBM Plex Mono (tech labels)
- **Animations**: Framer Motion (hero scroll, overlays), GSAP + ScrollTrigger (section reveals)
- **3D**: `three`, `@react-three/fiber`, `@react-three/drei` — Signal Core hero
- **Icons**: `react-icons`
- **Backend/Utils**: `nodemailer` (Email services)
- **Linting**: ESLint 9

## Verified Commands
| Command | Description |
|---|---|
| `npm run dev` | Start development server (open `/portfolio`) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run code linting |

## Project Structure & Conventions
### Directory Structure
- `app/` - Main application logic and routing (App Router).
  - `actions/` - Server Actions (e.g., `sendEmail.ts`).
  - `components/` - UI Components organized by category:
    - `generics/` - Shared UI (NavBar, Dialog, ContactModal).
    - `sections/` - Page sections (Intro, Projects, Skills, About).
    - `hero3d/` - Signal Core scene (`SignalCore`, `PointerRig`, `CameraRig`, `HeroCanvas`).
    - `projects/` - Melt transition, detail overlay, perspective video frame.
    - `motion/` - GSAP section reveals, `PageTransitionProvider`, `TransitionLink`.
    - `motion/liquid/` - Shared WebGL liquid-metal page transition (custom GLSL + Three.js fullscreen quad).
    - Routes: `app/page.tsx`, `app/projects`, `app/skills`, `app/about`.
  - `context/` - React Context Providers (e.g., `activeSectionProvider`).
  - `lib/` - Typed `projectsData` / skills (do not invent metrics).

### Naming & Coding Style
- **Components**: PascalCase (e.g., `NavBar.tsx`, `Intro.tsx`).
- **Files**: Prefer TypeScript (`.ts`, `.tsx`).
- **Styling**: TailwindCSS + CSS variables; avoid generic neon glow overload.
- **Imports**: `@/*` mapping to `./*` in `tsconfig.json`.

## Agent Rules
1. **Modification Scope**: Primary logic in `app/`. Preserve project copy, links, email flow.
2. **Coding Standards**: No new `.jsx`; responsive; Framer/GSAP as appropriate.
3. **Forbidden**: Fake metrics; heavy GLB/HDR unless requested; scroll hijacking.

## Performance Best Practices
1. Lazy-load R3F with `next/dynamic` + `ssr: false`.
2. Cap DPR; pause `frameloop` when hero off-screen; pointer parallax via refs.
3. Mobile: simplified Signal Core; `prefers-reduced-motion`: CSS fallback, no melt complexity.
4. GSAP: use `gsap.context` and revert on unmount.
