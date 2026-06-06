import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://manuelarunge.github.io",
  base: "/",
  output: "static",
  build: {
    format: "directory",
  },
  redirects: {
    "/about.html": "/about/",
    "/cv": "/about/",
  },
});
