# Wall Calendar

An interactive wall calendar component built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features
- Physical wall calendar aesthetic with spiral binding, hero image, and diagonal geometric accent
- Month-by-month navigation with slide + crossfade animations
- Day range selection with hover preview and staggered highlight animation
- Per-month notes panel with localStorage persistence
- Holiday markers for UK public holidays (2024–2026)
- Keyboard navigation (Arrow keys to change month, Escape to clear selection)
- Fully responsive — side-by-side on desktop, stacked on mobile
- Dynamic color theming per month derived from the hero image palette

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** for animations
- **localStorage** for client-side note persistence

## Design Decisions
- Grid starts on Monday (ISO week standard)
- Theme colors are manually curated per month to match the hero image mood
- Notes are stored per calendar month, so navigating months gives you a fresh notepad
- The `effectiveEnd` pattern enables live hover preview during range selection without committing the end date

## Project Structure
```
src/
  app/          # Next.js App Router pages
  components/   # Calendar UI components
  hooks/        # useCalendar, useDateRange, useNotes
  lib/          # Utilities, holidays data, month image themes
  types/        # Shared TypeScript interfaces
```

## Deployment

This project is optimized for Vercel deployment:

1. Push the project to a public GitHub repository
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Vercel will auto-detect Next.js — click Deploy
4. No environment variables required

## Live Demo
<!-- Add your Vercel URL here after deployment -->

## Video Demo
<!-- Add your Loom/YouTube link here -->

## Submission Checklist
- [x] Wall calendar aesthetic with hero image and spiral binding
- [x] Day range selector with start/end/in-between visual states
- [x] Integrated notes section with localStorage persistence
- [x] Fully responsive (desktop side-by-side, mobile stacked)
- [x] Month flip animation (slide + crossfade)
- [x] Keyboard navigation (Arrow keys + Escape)
- [x] Holiday markers (UK public holidays 2024–2026)
- [x] Dynamic per-month color theming
- [x] Today indicator with pulse animation
- [x] TypeScript throughout
- [ ] Live demo URL
- [ ] Video demo link
