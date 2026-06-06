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

## Images & static files

Place images in `public/images/` (served at `/images/...`). PDFs and downloads go in `public/`.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `master` or `main`.

In your repo settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
