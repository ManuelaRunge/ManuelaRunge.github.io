import test from 'node:test';
import assert from 'node:assert/strict';
import { buildRadar, loadRadar, sourceUrl } from '../src/lib/radar.mjs';

const now = new Date('2026-11-07T18:00:00Z');
const item = (overrides = {}) => ({
  title: 'Malaria surveillance study', url: 'https://www.who.int/report', date: '2026-11-06',
  publisher: 'WHO', topic: 'Infectious disease research', ...overrides,
});
const feed = (overrides = {}) => ({
  schema_version: 1, generated_date: '2026-11-07',
  status: 'automated_source_discovery_not_independently_verified',
  notice: 'Source-linked leads only. Verify original sources.',
  sections: [
    { id: 'this_week', title: 'This week', description: 'Last seven days.', items: [item()] },
    { id: 'previous_week', title: 'Also worth reading', description: '8–30 days ago.', items: [] },
    { id: 'upcoming', title: 'Upcoming events', description: 'Next 180 days.', items: [] },
  ], ...overrides,
});

test('uses the public feed and displays its generation date, publisher and topic', () => {
  assert.ok(sourceUrl.endsWith('/output/public.json'));
  const result = buildRadar(feed(), new Date('2026-11-09T12:00:00Z'));
  assert.equal(result.isoDate, '2026-11-07');
  assert.equal(result.feedAgeDays, 2);
  assert.equal(result.isStale, false);
  assert.equal(result.sections[0].items[0].publisher, 'WHO');
  assert.equal(result.sections[0].items[0].topic, 'Infectious disease research');
  assert.equal(result.notice, feed().notice);
});

test('preserves upstream selections and order instead of applying local relevance filters', () => {
  const data = feed();
  data.sections[0].items = [item({ title: 'Country budget allocation approved', url: 'https://example.org/funding', publisher: 'Funder', topic: 'Policy & implementation', date: '2026-11-01' }), item()];
  data.sections[1].items = [item({ title: 'Earlier guidance', date: '2026-10-10' })];
  const result = buildRadar(data, now);
  assert.deepEqual(result.sections[0].items.map((entry) => entry.title), ['Country budget allocation approved', 'Malaria surveillance study']);
  assert.equal(result.sections[1].description, '8–30 days ago.');
  assert.equal(result.sections[1].items[0].date, '2026-10-10');
  assert.equal(result.sections[2].description, 'Next 180 days.');
});

test('preserves distinct WHO article anchors and valid parenthesized event URLs', () => {
  const data = feed();
  data.sections[0].items = [item({ url: 'https://www.who.int/issue#malaria' }), item({ title: 'Cholera report', url: 'https://www.who.int/issue#cholera' })];
  data.sections[2].items = [item({ title: 'Malaria meeting', url: 'https://www.who.int/event-(mpag)', date: '2027-01-31' })];
  const result = buildRadar(data, now);
  assert.equal(result.sections[0].items.length, 2);
  assert.equal(result.sections[2].items[0].url, 'https://www.who.int/event-(mpag)');
});

test('stale feeds retain their real date and are flagged without pretending to be fresh', () => {
  assert.equal(buildRadar(feed(), new Date('2026-11-14T23:00:00Z')).isStale, false);
  const stale = buildRadar(feed(), new Date('2026-11-15T12:00:00Z'));
  assert.equal(stale.isStale, true);
  assert.equal(stale.feedAgeDays, 8);
  assert.equal(stale.isoDate, '2026-11-07');
});

test('rejects old archive arrays, unsupported schemas and invalid feed dates', () => {
  assert.throws(() => buildRadar([], now), /schema_version/);
  assert.throws(() => buildRadar(feed({ schema_version: 2 }), now), /schema_version/);
  for (const date of ['2026-02-30', 'unknown', '2026-11-08']) {
    assert.throws(() => buildRadar(feed({ generated_date: date }), now), /generation date/);
  }
  assert.throws(() => buildRadar(feed({ status: 'verified' }), now), /disclosure/);
});

test('rejects broken section contracts rather than silently deploying missing content', () => {
  assert.throws(() => buildRadar(feed({ sections: [] }), now), /Incomplete/);
  const data = feed();
  data.sections[2] = data.sections[0];
  assert.throws(() => buildRadar(data, now), /section/);
  const malformed = feed();
  malformed.sections[0].items = [item({ publisher: 42 })];
  assert.throws(() => buildRadar(malformed, now), /item/);
});

test('rejects unsafe URLs and invalid dates while projecting only public item fields', () => {
  for (const url of ['javascript:alert(1)', 'http://example.org/report', 'https://user:pass@example.org/', 'https://[broken', 'https://example.org/a b']) {
    const data = feed(); data.sections[0].items = [item({ url })];
    assert.throws(() => buildRadar(data, now), /URL/);
  }
  const data = feed(); data.sections[0].items = [item({ notes: 'Do not render', first_seen: '2026-11-07' })];
  assert.deepEqual(Object.keys(buildRadar(data, now).sections[0].items[0]).sort(), ['date', 'publisher', 'title', 'topic', 'url']);
  data.sections[0].items = [item({ date: '2026-02-30' })];
  assert.throws(() => buildRadar(data, now), /item/);
});

test('upstream failures fail the build and the successful request targets the public feed', async () => {
  await assert.rejects(loadRadar(async () => ({ ok: false, status: 503 }), now), /503/);
  await assert.rejects(loadRadar(async () => { throw new Error('timeout'); }, now), /timeout/);
  await assert.rejects(loadRadar(async () => ({ ok: true, json: async () => [] }), now), /schema_version/);
  await assert.rejects(loadRadar(async () => ({ ok: true, json: async () => { throw new Error('invalid JSON'); } }), now), /invalid JSON/);
  const result = await loadRadar(async (url, options) => {
    assert.equal(url, sourceUrl);
    assert.ok(options.signal instanceof AbortSignal);
    return { ok: true, json: async () => feed() };
  }, now);
  assert.equal(result.sections[0].items.length, 1);
});
