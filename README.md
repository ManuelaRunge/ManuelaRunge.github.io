# Manuela Runge's personal website.

Personal website for [Manuela Runge, PhD](https://manuelarunge.github.io/),  infectious disease epidemiologist.

This website was initially created using [Academic Pages (Jekyll)](https://academicpages.github.io/) and in 2026 revised with support from AI-assisted tools and built with [Astro](https://astro.build/). 
AI was used to help draft, restructure, edit, and implement parts of the site's text, layout, styling, and code.

## Weekly Radar

`/weekly-radar/` builds a source-linked reading index from the public `data/items.json` in [weekly-radar](https://github.com/ManuelaRunge/weekly-radar). It displays titles, dates and publishers, without generated summaries. These are discovery records, not independently verified recommendations. The 24 October 2026 edition remains at `/weekly-radar/archive/2026-10-24/`.

The site rebuilds Mondays at 08:15 UTC and on pushes to master/main. Pull requests build and run the Radar tests without deploying. A source-fetch or top-level format failure fails the build, preserving the last deployed site. Malformed individual records are skipped. This is a build-time index, not a live feed; its preparation date is shown on the page.

Run `node --test tests/radar.test.mjs` to check filtering, dates, deduplication and fetch failures, then `npm run build` (requires access to the public feed). Filtering rules live in `src/lib/radar-rules.mjs`; selection and loading live in `src/lib/radar.mjs`.

