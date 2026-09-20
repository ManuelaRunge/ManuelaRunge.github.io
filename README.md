# Manuela Runge — Personal Website

Personal website for [Manuela Runge, PhD](https://manuelarunge.github.io/) — infectious disease epidemiologist.

Built with [Astro](https://astro.build/). Previously used Academic Pages (Jekyll); legacy files remain in the repo for reference.

## First-time setup

```powershell
cd C:\Users\mrung\gitrepos\ManuelaRunge
npm install
powershell -ExecutionPolicy Bypass -File scripts/copy-assets.ps1
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

The `copy-assets.ps1` script copies images from `images/` and PDFs into `public/` so they are served by Astro. Commit `package-lock.json` after `npm install` for reproducible CI builds.

## Build

```bash
npm run build
npm run preview
```

## Content

Markdown content lives in `src/content/`:

- `publications/` — research papers
- `talks/` — conference presentations
- `portfolio/` — project case studies
- `posts/` — blog posts

To re-import from legacy Jekyll folders (`_publications`, `_talks`, etc.):

```bash
npm run migrate
```

## Use of AI

This website was developed and revised with support from AI-assisted tools. AI was
used to help draft, restructure, edit, and implement parts of the site's text,
layout, styling, and code.

All content remains Manuela Runge's responsibility. The site was reviewed for
factual accuracy, tone, relevance, and appropriate representation of her
professional and research identity. Publication records, links, biographical
details, and professional descriptions should be understood as curated and
verified by Manuela, not as automatically generated authority.

AI may also have supported technical tasks such as code organization, design
iteration, accessibility checks, and build troubleshooting. These tools are used
as aids for drafting and implementation, while human judgement, domain knowledge,
quality assurance, and methodological scrutiny guide final decisions.

## Images & static files

Place images in `public/images/` (served at `/images/...`). PDFs and downloads go in `public/`.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `master` or `main`.

In your repo settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
