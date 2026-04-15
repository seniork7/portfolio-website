# Kevon Senior — Portfolio Website

A personal portfolio built to showcase my projects, skills, and background as a developer. Rebuilt from the ground up (v2) using React, Vite, and Tailwind CSS.

---

## Tech Stack

| Layer | Tool |
| --- | --- |
| Framework | React 18 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Animation | Framer Motion |
| Icons | Lucide React, React Icons |
| Carousel | Embla Carousel |

---

## Project Structure

```md
src/
├── components/       # Shared UI (Navbar, Footer, Button, etc.)
├── sections/         # Homepage sections (Hero, Projects, About, Skills, Contact…)
├── pages/            # Route-level pages (CaseStudy)
├── data/             # Project data
├── hooks/            # Custom hooks (useTheme)
└── utils/            # Helpers (cn)
```

---

## Features

- **Case study pages** — each project has a dedicated deep-dive page at `/case-study/:slug`
- **Dark / light mode** — persisted theme toggle
- **Responsive layout** — mobile-first, tested across breakpoints
- **Smooth scroll nav** — navbar links scroll to sections on the homepage; works from any route
- **Framer Motion animations** — fade-up reveals on scroll throughout
