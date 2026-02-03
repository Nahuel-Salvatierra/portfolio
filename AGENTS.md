# Project Overview
**Portfolio de Nahuel Salvatierra**
A personal portfolio website built with Next.js 16 (App Router). It showcases projects, personal skills, and an "About Me" section. The application features extensive use of animations and 3D elements.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5 (React 19)
- **Styling**: TailwindCSS 4, `clsx`
- **Animations**: Framer Motion, `@splinetool/react-spline` (3D)
- **Icons**: `react-icons`
- **Backend/Utils**: `nodemailer` (Email services)
- **Linting**: ESLint 9

## Verified Commands
| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run code linting |

## Project Structure & Conventions
### Directory Structure
- `app/` - Main application logic and routing (App Router).
  - `actions/` - Server Actions (e.g., `sendEmail.ts`).
  - `components/` - UI Components organized by category:
    - `generics/` - Reusable shared components (e.g., `NavBar`).
    - `sections/` - Page sections (e.g., `Intro`, `Projects`).
    - `icons/` - Custom icon components.
  - `context/` - React Context Providers (e.g., `activeSectionProvider`).
  - `lib/` - Utility functions.

### Naming & Coding Style
- **Components**: PascalCase (e.g., `NavBar.tsx`, `Intro.tsx`).
- **Files**: Prefer TypeScript (`.ts`, `.tsx`). *Note: Mixed usage of `.jsx` observed; prefer `.tsx` for new files.*
- **Styling**: TailwindCSS utility classes.
- **Imports**: configured as `@/*` mapping to `./*` in `tsconfig.json`, though relative imports are currently dominant in `app/`.

## Agent Rules
1. **Modification Scope**:
   - Primary logic resides in `app/`.
   - Use `app/actions` for any backend logic or data mutations.
   - Place new components in `app/components` under the appropriate subdirectory.
2. **Coding Standards**:
   - **Do not** introduce new `.jsx` files; use `.tsx` exclusively.
   - Ensure all new components are responsive (Tailwind).
   - Maintain the use of `framer-motion` for animations consistency.
3. **Forbidden**:
   - Do not change the existing directory structure without a compelling reason.
   - Do not remove `eslint` rules unless blocking valid work.

## Performance Best Practices
1. **Lazy Loading**:
   - Use `next/dynamic` for heavy components (e.g., 3D scenes, complex charts).
   - Use `ssr: false` for client-only heavy components to reduce server load and hydration mismatch.
2. **Image Optimization**:
   - Always provide `sizes` prop to `next/image` for responsive sizing.
   - Use `priority={true}` for LCP (Largest Contentful Paint) images (e.g., Hero image, first list item).
   - Prefer `StaticImageData` (imports) over string paths for images to leverage Next.js automatic sizing.
3. **Video Optimization**:
   - Lazy load videos where possible (e.g., inside modals or use placeholders).
   - Use correct codecs and compression.
4. **Code Splitting**:
   - Keep page-specific code in `app` and shared code in `components/generics`.
