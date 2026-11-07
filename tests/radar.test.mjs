import test from 'node:test';
import assert from 'node:assert/strict';
import { buildRadar, loadRadar } from '../src/lib/radar.mjs';

const now = new Date('2026-11-07T18:00:00Z');
const record = (overrides = {}) => ({ title: 'Malaria surveillance study', source: 'WHO', url: 'https://www.who.int/report', published_date: '2026-11-06', ...overrides });
const sections = (records) => buildRadar(records, now).sections;

test('preserves different articles in one WHO issue but removes tracking duplicates', () => {
  const items = sections([
    record({ url: 'https://www.who.int/issue#malaria' }),
    record({ title: 'Cholera outbreak', url: 'https://www.who.int/issue#cholera' }),
    record({ url: 'https://www.who.int/issue?utm_source=email#malaria' }),
  ])[0].items;
  assert.equal(items.length, 2);
  assert.deepEqual(new Set(items.map((item) => new URL(item.url).hash)), new Set(['#malaria', '#cholera']));
});

test('skips malformed records without discarding valid neighbours', () => {
  const result = sections([null, 7, [], {}, record({ title: 123 }), record({ url: {} }), record({ published_date: ['2026-11-06'] }), record({ source: 42, verification: {} })]);
  assert.equal(result[0].items.length, 1);
  assert.equal(result[0].items[0].source, 'Original source');
});

test('uses adjacent seven-day windows and rejects future or invalid publication dates', () => {
  const dates = ['2026-11-07', '2026-11-01', '2026-10-31', '2026-10-25', '2026-10-24', '2026-11-08', '2026-02-30', 'unknown'];
  const result = sections(dates.map((date) => record({ title: `Malaria report ${date}`, url: `https://www.who.int/${date}`, published_date: date })));
  assert.deepEqual(result[0].items.map((item) => item.date), dates.slice(0, 2));
  assert.deepEqual(result[1].items.map((item) => item.date), dates.slice(2, 4));
});

test('orders events soonest first and omits past or out-of-window events', () => {
  const dates = ['2027-02-06', '2026-11-30', '2026-11-06', '2026-11-07', '2027-02-05'];
  const result = sections(dates.map((date) => record({ url: `https://www.who.int/${date}`, event_date: date })));
  assert.deepEqual(result[2].items.map((item) => item.date), ['2026-11-07', '2026-11-30', '2027-02-05']);
});

test('rejects unsafe URLs, irrelevant titles and explicitly rejected records', () => {
  const result = sections([
    record({ url: 'javascript:alert(1)' }), record({ url: 'http://www.who.int/report' }),
    record({ url: 'https://name:password@www.who.int/report' }),
    record({ verification: ' REJECTED ' }), record({ editorial_status: 'rejected' }),
    record({ title: 'Highlighted signals and events' }), record({ title: 'Concert dates' }),
    record(),
  ]);
  assert.equal(result[0].items.length, 1);
});

test('upstream failures fail the build instead of publishing an empty error page', async () => {
  await assert.rejects(loadRadar(async () => ({ ok: false, status: 503 }), now), /503/);
  await assert.rejects(loadRadar(async () => { throw new Error('timeout'); }, now), /timeout/);
  await assert.rejects(loadRadar(async () => ({ ok: true, json: async () => ({ items: [] }) }), now), /expected an array/);
  await assert.rejects(loadRadar(async () => ({ ok: true, json: async () => { throw new Error('invalid JSON'); } }), now), /invalid JSON/);
  const result = await loadRadar(async () => ({ ok: true, json: async () => [record()] }), now);
  assert.equal(result.sections[0].items.length, 1);
});
