# Gaurav Advani — Portfolio

Clean, premium portfolio built with Next.js (App Router). Includes focused-section scrolling, horizontal impact rail, 3D project cards, and a minimal design system.

## Highlights
- Section focus system (active section sharp, others softened)
- Impact rail with scroll-driven horizontal motion
- 3D Projects grid with hover/focus depth
- Calmer Education and Contact sections with subtle motion
- Consistent tokenized theme and typography

## Tech Stack
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Lucide React

## Local Setup
Install dependencies:
```bash
npm install
```

Run the dev server:
```bash
npm run dev
```

Open:
```txt
http://localhost:3000
```

## Project Structure
```txt
src/app/
  components/
    AboutSection.tsx
    ImpactScrollRail.tsx
    Projects3D.tsx
    EducationSection.tsx
    ContactSection.tsx
    SiteFooter.tsx
  page.tsx
  layout.tsx
  globals.css
```

## Scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes
- Design tokens live in `src/app/globals.css`.
- Visual polish leans on subtle motion, depth, and typographic hierarchy.

