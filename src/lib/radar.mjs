export const sourceUrl = 'https://raw.githubusercontent.com/ManuelaRunge/weekly-radar/main/output/public.json';
const text = (value) => typeof value === 'string' ? value.trim() : '';
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const expectedSections = new Set(['this_week', 'previous_week', 'upcoming']);
const dayMs = 86_400_000;

function dateValue(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
}

function sourceLink(value) {
  const raw = text(value);
  if (!raw || /[\s<>]/.test(raw)) throw new Error('Invalid public Radar source URL');
  try {
    const url = new URL(raw);
    if (url.protocol === 'https:' && !url.username && !url.password) return raw;
  } catch { /* Report the same contract error for malformed URLs. */ }
  throw new Error('Invalid public Radar source URL');
}

export function buildRadar(feed, now = new Date()) {
  if (!isObject(feed) || feed.schema_version !== 1) {
    throw new Error('Unexpected public Radar format: expected schema_version 1');
  }
  const generated = dateValue(feed.generated_date);
  const today = new Date(now);
  today.setUTCHours(0, 0, 0, 0);
  if (!generated || !Number.isFinite(today.getTime()) || generated > today) {
    throw new Error('Invalid public Radar generation date');
  }
  if (feed.status !== 'automated_source_discovery_not_independently_verified' || !text(feed.notice)) {
    throw new Error('Missing public Radar source-discovery disclosure');
  }
  if (!Array.isArray(feed.sections)) throw new Error('Missing public Radar sections');
  const seenSections = new Set();
  const sections = feed.sections.map((section) => {
    if (!isObject(section) || !expectedSections.has(section.id) || seenSections.has(section.id)
      || !text(section.title) || !text(section.description) || !Array.isArray(section.items)) {
      throw new Error('Invalid public Radar section');
    }
    seenSections.add(section.id);
    const items = section.items.map((item) => {
      if (!isObject(item) || !text(item.title) || !dateValue(item.date)
        || !text(item.publisher) || !text(item.topic)) {
        throw new Error('Invalid public Radar item');
      }
      return {
        title: text(item.title).replaceAll('\u2014', '\u2013'),
        url: sourceLink(item.url),
        date: item.date,
        publisher: text(item.publisher).replaceAll('\u2014', '\u2013'),
        topic: text(item.topic).replaceAll('\u2014', '\u2013'),
      };
    });
    // Selection, limits and order belong to the published source feed.
    return { id: section.id, heading: text(section.title), description: text(section.description), items };
  });
  if (seenSections.size !== expectedSections.size) throw new Error('Incomplete public Radar sections');
  const feedAgeDays = Math.round((today.getTime() - generated.getTime()) / dayMs);
  return {
    isoDate: feed.generated_date,
    notice: text(feed.notice).replaceAll('\u2014', '\u2013'),
    feedAgeDays,
    isStale: feedAgeDays > 7,
    sections,
  };
}

export async function loadRadar(fetcher = fetch, now = new Date()) {
  // Retain the last deployed site if fetching or validating the feed fails.
  const response = await fetcher(sourceUrl, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Weekly Radar source unavailable (HTTP ${response.status})`);
  return buildRadar(await response.json(), now);
}
