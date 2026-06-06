import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const COLLECTIONS = [
  { source: "_publications", target: "publications" },
  { source: "_talks", target: "talks" },
  { source: "_portfolio", target: "portfolio" },
  { source: "_posts", target: "posts" },
];

const SKIP_FILES = new Set(["talkmap.py", "talkmap.ipynb"]);

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) return { data: {}, body: raw };
  const end = raw.indexOf("---", 3);
  if (end === -1) return { data: {}, body: raw };
  const fmBlock = raw.slice(3, end).trim();
  const body = raw.slice(end + 3).trim();
  const data = {};
  for (const line of fmBlock.split("\n")) {
    const match = line.match(/^([\w-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = value.replace(/^['"]|['"]$/g, "");
    }
  }
  return { data, body };
}

function buildFrontmatter(data, target) {
  const keep = { ...data };
  delete keep.collection;
  delete keep.permalink;
  delete keep.layout;
  delete keep.author_profile;
  delete keep.redirect_from;
  delete keep.excerpt;
  if (target === "publications" && !keep.date) keep.date = "2020-01-01";
  if (target === "talks" && !keep.date) keep.date = "2020-01-01";
  if (target === "posts" && !keep.date) keep.date = "2020-01-01";

  const lines = ["---"];
  for (const [key, value] of Object.entries(keep)) {
    if (value === undefined || value === "") continue;
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map((v) => `"${v}"`).join(", ")}]`);
    } else {
      lines.push(`${key}: "${String(value).replace(/"/g, '\\"')}"`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

for (const { source, target } of COLLECTIONS) {
  const sourceDir = path.join(ROOT, source);
  const targetDir = path.join(ROOT, "src", "content", target);
  fs.mkdirSync(targetDir, { recursive: true });

  if (!fs.existsSync(sourceDir)) {
    console.warn(`Skipping missing folder: ${source}`);
    continue;
  }

  for (const file of fs.readdirSync(sourceDir)) {
    if (!file.endsWith(".md") || SKIP_FILES.has(file)) continue;
    const raw = fs.readFileSync(path.join(sourceDir, file), "utf8");
    const { data, body } = parseFrontmatter(raw);
    const out = `${buildFrontmatter(data, target)}\n\n${body}\n`;
    fs.writeFileSync(path.join(targetDir, file), out, "utf8");
    console.log(`Migrated ${source}/${file} -> src/content/${target}/${file}`);
  }
}

console.log("Migration complete.");
