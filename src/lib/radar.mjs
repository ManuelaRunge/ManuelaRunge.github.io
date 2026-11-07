import { coreTerms, secondaryTerms, lowValue, exclude, trustedHosts } from './radar-rules.mjs';

export const sourceUrl = 'https://raw.githubusercontent.com/ManuelaRunge/weekly-radar/main/data/items.json';
const text = (value) => typeof value === 'string' ? value.trim() : '';
const dayMs = 86_400_000;

function ageInDays(value, today) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) return null;
  return Math.round((today.getTime() - parsed.getTime()) / dayMs);
}

function normaliseUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    // WHO issues contain multiple articles distinguished by their fragment.
    for (const key of [...url.searchParams.keys()]) {
      if (key.toLowerCase().startsWith('utm_')) url.searchParams.delete(key);
    }
    url.searchParams.sort();
    url.pathname = url.pathname.replace(/\/$/, '') || '/';
    return url.toString();
  } catch { return null; }
}

function scoreRecord(title, category, url) {
  if (lowValue.test(title) || exclude.test(title)) return 0;
  const core = coreTerms.test(title);
  if (!core && !secondaryTerms.test(title)) return 0;
  let score = core ? 6 : 2;
  if (/\b(malaria|ntds?|neglected tropical|vaccine|vaccination|epidemiolog|model|surveillance|stratif|tailor|leishman|onchocer|filari)\w*/i.test(title)) score += 3;
  if (/\b(report|guidance|guideline|evaluation|analysis|study|trial|surveillance|research|policy|assessment)\b/i.test(title)) score += 2;
  if (/(policy|snt|campaigns|tools|methods|malaria|ntd)/i.test(category)) score += 2;
  if (trustedHosts.test(new URL(url).hostname)) score += 1;
  return score;
}

function select(records, dateField, minAge, maxAge, limit, today) {
  const byUrl = new Map();
  for (const item of records) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) continue;
    const title = text(item.title);
    const url = normaliseUrl(text(item.url));
    const date = text(item[dateField]);
    if (!title || title.length > 200 || !url) continue;
    if ([item.verification, item.editorial_status].some((value) => text(value).toLowerCase() === 'rejected')) continue;
    const age = ageInDays(date, today);
    if (age === null || age < minAge || age > maxAge) continue;
    const score = scoreRecord(title, text(item.category), url);
    if (score < 4) continue;
    const chosen = byUrl.get(url);
    if (!chosen || score > chosen.score || (score === chosen.score && date > chosen.date)) {
      byUrl.set(url, { title, url, date, source: text(item.source) || 'Original source', score });
    }
  }
  const ordered = [...byUrl.values()].sort((a, b) => dateField === 'event_date'
    ? a.date.localeCompare(b.date) || b.score - a.score
    : b.score - a.score || b.date.localeCompare(a.date));
  const seen = new Set();
  return ordered.filter((item) => {
    const key = item.title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim() + '|' + item.date;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, limit);
}

export function buildRadar(records, now = new Date()) {
  if (!Array.isArray(records)) throw new Error('Unexpected Weekly Radar format: expected an array');
  const today = new Date(now);
  today.setUTCHours(0, 0, 0, 0);
  return {
    isoDate: today.toISOString().slice(0, 10),
    sections: [
      { heading: 'This week', description: 'Source-linked updates from the last seven calendar days, including today.', items: select(records, 'published_date', 0, 6, 12, today) },
      { heading: 'Also worth reading', description: 'Selected updates from the preceding seven days.', items: select(records, 'published_date', 7, 13, 6, today) },
      { heading: 'Upcoming', description: 'Events dated today or within the next 90 days.', items: select(records, 'event_date', -90, 0, 8, today) },
    ],
  };
}

export async function loadRadar(fetcher = fetch, now = new Date()) {
  // Fail the build on upstream failure so deployment retains the last successful site.
  const response = await fetcher(sourceUrl, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Weekly Radar source unavailable (HTTP ${response.status})`);
  return buildRadar(await response.json(), now);
}
