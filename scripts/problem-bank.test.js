const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { publicPage, readBank, syncBank } = require('../problem-bank');

test('syncs only public list and details to a JSON file for offline browsing', async t => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'codepro-bank-test-'));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const file = path.join(directory, 'public-problems.json');
  const calls = [];
  const result = await syncBank(file, 'https://example.test', async (kind, key, query) => {
    calls.push({ kind, key, query });
    if (kind === 'problems') return query.page === 1
      ? { objects: [{ code: 'A', name: 'Cộng hai số', types: [{ name: 'math' }] }], total_pages: 2, total_objects: 2 }
      : { objects: [{ code: 'B', name: 'Tổng dãy', types: [] }], total_pages: 2, total_objects: 2 };
    return { object: { code: key, name: key, description: `Đề ${key}` } };
  });
  assert.equal(result.count, 2);
  assert.deepEqual(calls.map(call => call.kind), ['problems', 'problems', 'problem', 'problem']);
  const bank = await readBank(file, 'https://example.test');
  assert.equal(bank.details.B.description, 'Đề B');
  assert.equal((await readBank(file, 'https://other.test')), null);
  assert.deepEqual(publicPage(bank, { q: 'cộng', page_size: 1 }).objects.map(item => item.code), ['A']);
  assert.deepEqual(publicPage(bank, { page: 2, page_size: 1 }).objects.map(item => item.code), ['B']);
});

test('failed sync keeps the previous complete snapshot', async t => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'codepro-bank-test-'));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const file = path.join(directory, 'public-problems.json');
  await syncBank(file, 'https://example.test', async kind => kind === 'problems'
    ? { objects: [{ code: 'A', name: 'A' }], total_pages: 1, total_objects: 1 }
    : { object: { code: 'A', description: 'Old' } });
  await assert.rejects(syncBank(file, 'https://example.test', async kind => kind === 'problems'
    ? { objects: [{ code: 'A', name: 'A' }], total_pages: 1, total_objects: 1 }
    : Promise.reject(new Error('server unavailable'))));
  assert.equal((await readBank(file, 'https://example.test')).details.A.description, 'Old');
});
