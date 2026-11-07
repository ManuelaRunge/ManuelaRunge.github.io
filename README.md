# Manuela Runge's personal website.

Personal website for [Manuela Runge, PhD](https://manuelarunge.github.io/),  infectious disease epidemiologist.

This website was initially created using [Academic Pages (Jekyll)](https://academicpages.github.io/) and in 2026 revised with support from AI-assisted tools and built with [Astro](https://astro.build/). 
AI was used to help draft, restructure, edit, and implement parts of the site's text, layout, styling, and code.

## Weekly Radar

`/weekly-radar/` reads the versioned [`output/public.json` feed](https://raw.githubusercontent.com/ManuelaRunge/weekly-radar/main/output/public.json) from [weekly-radar](https://github.com/ManuelaRunge/weekly-radar). The Radar repository selects and orders its links; the website preserves those selections rather than filtering the full archive again. It displays titles, source dates, publishers in parentheses, topics and the source-discovery notice. These are discovery leads, not independently verified recommendations. The 24 October 2026 edition remains at `/weekly-radar/archive/2026-10-24/`.

The site rebuilds Mondays at 08:15 UTC and on pushes to master/main. Pull requests build and run the Radar tests without deploying. This is a build-time snapshot: the page shows the feed's `generated_date`, never the site-build date, and flags feeds more than seven days old. The Radar and website schedules are independent, so check the displayed source date to assess freshness.

`src/lib/radar.mjs` validates schema version 1, generation dates, disclosure, the three public sections and each item's title, HTTPS URL, date, publisher and topic. Upstream failures or malformed payloads fail the build, retaining the last deployed site. Only public display fields are projected into the page. News windows and ranking, including WHO priority, remain owned by the feed; the website does not independently rescore or relabel items.

Run `node --test tests/radar.test.mjs` for contract, freshness, link and failure-handling checks, then `npm run build` (requires access to the public feed).


## GitHub Pages publishing

In repository Settings > Pages, keep Build and deployment > Source set to **GitHub Actions**. The workflow publishes the generated `dist/` directory. Publishing directly from the `master` branch serves source files instead and breaks Astro page routes. Production deployments are queued rather than cancelled while publishing.
