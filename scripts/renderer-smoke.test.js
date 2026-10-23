const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const renderer = path.join(__dirname, '..', 'renderer');
const tick = () => new Promise(resolve => setTimeout(resolve, 20));

test('regular and contest problems open focused statement and code workspace, then return', async () => {
  const html = fs.readFileSync(path.join(renderer, 'index.html'), 'utf8');
  const source = fs.readFileSync(path.join(renderer, 'app.js'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'file:///client/index.html' });
  const { window } = dom;
  window.katex = { render: (expression, target) => { target.dataset.rendered = expression; } };
  window.eval(fs.readFileSync(path.join(renderer, 'vendor', 'statement.bundle.js'), 'utf8'));
  let onInvalidate;
  let problemReads = 0;
  window.client = {
    account: async () => null,
    liveStatus: async () => false,
    onLiveStatus: () => () => {},
    onLiveInvalidate: callback => { onInvalidate = callback; return () => {}; },
    api: async ({ kind, key }) => {
      if (kind === 'languages') return { objects: [{ key: 'CPP17', name: 'C++17' }] };
      if (kind === 'problems') return { objects: [{ code: 'AP', name: 'A + B', points: 100 }], total_objects: 1, total_pages: 1 };
      if (kind === 'contests') return { objects: [
        { key: 'C1', name: 'Thi thử', status: 'ongoing', start_time: '2026-10-16T00:00:00Z', participant_count: 1 },
        { key: 'C2', name: 'Thi sắp tới', status: 'upcoming', start_time: '2026-10-20T00:00:00Z', participant_count: 0 },
        { key: 'C3', name: 'Thi đã kết thúc', status: 'ended', start_time: '2026-10-10T00:00:00Z', participant_count: 8 }
      ] };
      if (kind === 'contest' && key === 'C1') return { object: { key: 'C1', name: 'Thi thử', status: 'ongoing', is_registered: true, problems: [{ code: 'AP', name: 'A + B', output_prefix: 'A' }] } };
      if (kind === 'problem' && key === 'AP') { problemReads++; return { object: { code: 'AP', name: 'A + B', description: 'Tính $A+B$.', points: 100, time_limit: 1, memory_limit: 65536 } }; }
      throw new Error(`Unexpected API request: ${kind}`);
    },
    getDraft: async () => '',
    setDraft: async () => {},
    openSite: () => {}
  };
  try {
    window.eval(source);
    await tick();
    assert.equal(window.document.getElementById('topbar-account').hidden, true);
    assert.equal(window.document.getElementById('login-btn').hidden, false);
    assert.equal(window.document.getElementById('problem-list').hidden, false);
    assert.equal(window.document.getElementById('editor-area').hidden, true);
    window.document.querySelector('.problem-item').click();
    await tick();
    assert.equal(window.document.getElementById('problems-view').classList.contains('problem-focus'), true);
    assert.equal(window.document.getElementById('problem-list').hidden, true);
    assert.equal(window.document.getElementById('editor-area').hidden, false);
    const resizer = window.document.getElementById('workspace-resizer');
    resizer.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    assert.equal(resizer.getAttribute('aria-valuenow'), '55');
    assert.equal(window.document.querySelector('.split').style.getPropertyValue('--statement-fr'), '55fr');
    assert.equal(window.document.getElementById('contest-context').hidden, false);
    assert.equal(window.document.getElementById('back-to-contest').textContent, '← Quay lại danh sách');
    assert.equal(window.document.getElementById('contest-context-name').textContent, 'A + B');
    window.document.getElementById('back-to-contest').click();
    assert.equal(window.document.getElementById('problems-view').classList.contains('problem-focus'), false);
    assert.equal(window.document.getElementById('problems-view').classList.contains('problem-browse'), true);
    assert.equal(window.document.getElementById('problem-list').hidden, false);
    assert.equal(window.document.getElementById('editor-area').hidden, true);
    window.document.getElementById('nav-contests').click();
    await tick();
    assert.equal(window.document.querySelectorAll('.contest-group').length, 3);
    assert.equal(window.document.getElementById('contest-count').textContent, '3 cuộc thi');
    const search = window.document.getElementById('contest-search');
    search.value = 'sắp tới';
    window.document.getElementById('contest-search-form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    assert.equal(window.document.querySelectorAll('.contest-card').length, 1);
    search.value = '';
    window.document.getElementById('contest-search-form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    window.document.querySelector('.contest-card-open').click();
    await tick();
    window.document.querySelector('.contest-problem').click();
    await tick();
    assert.equal(window.document.getElementById('problems-view').hidden, false);
    assert.equal(window.document.getElementById('problems-view').classList.contains('problem-focus'), true);
    assert.equal(window.document.getElementById('contest-context').hidden, false);
    assert.equal(window.document.getElementById('contest-context-name').textContent, 'Thi thử');
    assert.equal(window.document.querySelector('#statement-content .math-inline')?.dataset.rendered, 'A+B');
    assert.equal(window.document.getElementById('source-code').value.includes('int main()'), true);
    const sourceBeforeRefresh = window.document.getElementById('source-code').value;
    onInvalidate({ topics: ['problems'] });
    await new Promise(resolve => setTimeout(resolve, 300));
    assert.ok(problemReads >= 3, 'live update refreshes the selected statement');
    assert.equal(window.document.getElementById('source-code').value, sourceBeforeRefresh);

    window.document.getElementById('back-to-contest').click();
    await tick();
    assert.equal(window.document.getElementById('contests-view').hidden, false);
    assert.equal(window.document.getElementById('problems-view').classList.contains('problem-focus'), false);
    assert.equal(window.document.getElementById('editor-area').hidden, true);
    window.document.getElementById('nav-account').click();
    assert.equal(window.document.getElementById('profile-guest').hidden, false);
    assert.equal(window.document.getElementById('profile-content').hidden, true);
  } finally {
    window.close();
  }
});

test('joining an ongoing contest opens its first statement, switches tasks, and keeps drafts', async () => {
  const html = fs.readFileSync(path.join(renderer, 'index.html'), 'utf8');
  const source = fs.readFileSync(path.join(renderer, 'app.js'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'file:///client/index.html' });
  const { window } = dom;
  const drafts = new Map();
  const submissions = [];
  let joined = false;
  let joins = 0;
  window.katex = { render: () => {} };
  window.eval(fs.readFileSync(path.join(renderer, 'vendor', 'statement.bundle.js'), 'utf8'));
  window.client = {
    account: async () => ({ username: 'student', role: 'user' }),
    liveStatus: async () => false,
    onLiveStatus: () => () => {},
    onLiveInvalidate: () => () => {},
    api: async ({ kind, key, body }) => {
      if (kind === 'languages') return { objects: [{ key: 'CPP17', name: 'C++17' }] };
      if (kind === 'problems') return { objects: [], total_objects: 0, total_pages: 1 };
      if (kind === 'userProfile') return { profile: { username: 'student' } };
      if (kind === 'contests') return { objects: [{ key: 'TEST', name: 'Thi thử', status: 'ongoing', start_time: '2026-10-17T00:00:00Z' }] };
      if (kind === 'contest') return { object: { key: 'TEST', name: 'Thi thử', status: 'ongoing', end_time: '2026-10-25T00:00:00Z', is_registered: joined, problems: [{ code: 'AP', name: 'A + B', output_prefix: 'A' }, { code: 'MAX', name: 'Số lớn nhất', output_prefix: 'B' }] } };
      if (kind === 'contestJoin') { joins++; joined = true; return { is_registered: true }; }
      if (kind === 'problem') return { object: { code: key, name: key === 'AP' ? 'A + B' : 'Số lớn nhất', description: `## Đề ${key}`, points: 100, time_limit: 1, memory_limit: 65536 } };
      if (kind === 'submit') { submissions.push(body); return { submission_id: 12, result: 'AC' }; }
      throw new Error(`Unexpected API request: ${kind}`);
    },
    getDraft: async key => drafts.get(key) || '',
    setDraft: async (key, value) => { drafts.set(key, value); },
    openSite: () => {}
  };
  try {
    window.eval(source);
    await tick();
    window.document.getElementById('nav-contests').click();
    await tick();
    window.document.querySelector('.contest-card-action').click();
    await tick();
    assert.equal(joins, 1);
    assert.equal(window.document.getElementById('problems-view').hidden, false);
    assert.equal(window.document.getElementById('contest-task-list').hidden, false);
    assert.equal(window.document.querySelectorAll('.contest-task').length, 2);
    assert.equal(window.document.querySelector('.contest-task.active')?.getAttribute('aria-label'), 'Bài A: A + B');
    assert.match(window.document.getElementById('statement-content').textContent, /Đề AP/);
    assert.equal(window.document.getElementById('nav-contests').classList.contains('active'), true);
    const sourceInput = window.document.getElementById('source-code');
    sourceInput.value = 'int main() { return 1; }';
    sourceInput.dispatchEvent(new window.Event('input', { bubbles: true }));
    window.document.querySelectorAll('.contest-task')[1].click();
    await tick();
    assert.equal(drafts.get('AP:CPP17'), 'int main() { return 1; }');
    assert.match(window.document.getElementById('statement-content').textContent, /Đề MAX/);
    assert.equal(window.document.querySelector('.contest-task.active')?.getAttribute('aria-label'), 'Bài B: Số lớn nhất');
    window.document.querySelectorAll('.contest-task')[0].click();
    await tick();
    assert.equal(sourceInput.value, 'int main() { return 1; }');
    window.document.getElementById('submit-btn').click();
    await tick();
    assert.equal(submissions[0].contest, 'TEST');
    assert.equal(submissions[0].problem, 'AP');
    window.document.getElementById('back-to-contest').click();
    await tick();
    assert.equal(window.document.getElementById('contests-view').hidden, false);
    assert.equal(window.document.getElementById('contest-task-list').hidden, true);
    assert.equal(window.document.getElementById('editor-area').hidden, true);
    window.document.querySelector('.contest-card-open').click();
    await tick();
    assert.equal(window.document.querySelector('.contest-actions .primary')?.textContent, 'Vào làm bài');
    window.document.querySelector('.contest-actions .primary').click();
    await tick();
    assert.equal(joins, 1);
    assert.equal(window.document.getElementById('problems-view').hidden, false);
  } finally { window.close(); }
});

test('IDE shares code with a read-only link and admin can revoke the session', async () => {
  const html = fs.readFileSync(path.join(renderer, 'index.html'), 'utf8');
  const source = fs.readFileSync(path.join(renderer, 'app.js'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'file:///client/index.html' });
  const { window } = dom;
  const token = 's'.repeat(43);
  const writes = [];
  let active = false;
  let copied = '';
  window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  window.client = {
    account: async () => ({ username: 'admin', role: 'admin', is_staff: true }),
    liveStatus: async () => false,
    onLiveStatus: () => () => {},
    onLiveInvalidate: () => () => {},
    api: async args => {
      if (args.kind === 'languages') return { objects: [{ key: 'CPP17', name: 'C++17' }] };
      if (args.kind === 'problems') return { objects: [{ code: 'AP', name: 'A + B' }], total_objects: 1, total_pages: 1 };
      if (args.kind === 'problem') return { object: { code: 'AP', name: 'A + B', description: 'Tính tổng', points: 100 } };
      if (args.kind === 'userProfile') return { profile: { username: 'admin' } };
      if (args.kind === 'adminOverview') return {};
      if (args.kind === 'codeShares' && !args.method) return { objects: active ? [{ token, owner: 'admin', problem: 'AP', language: 'CPP17', updated_at: '2026-10-18T00:00:00Z', expires_at: '2026-10-19T00:00:00Z' }] : [] };
      if (args.kind === 'codeShares' && args.method === 'POST') { writes.push(args); active = true; return { token, owner: 'admin', problem: 'AP' }; }
      if (args.kind === 'codeShare' && args.method === 'PUT') { writes.push(args); if (args.body.is_active === false) active = false; return {}; }
      throw new Error(`Unexpected API request: ${args.kind}`);
    },
    getDraft: async () => '', setDraft: async () => {},
    shareUrl: async () => `http://127.0.0.1:8888/spectate/${token}`,
    copyShare: async value => { copied = value; },
    openShare: async () => {}
  };
  try {
    window.eval(source);
    await tick();
    window.document.querySelector('.problem-item').click();
    await tick();
    window.document.getElementById('share-code').click();
    await tick();
    window.document.getElementById('start-share').click();
    await tick();
    assert.equal(writes[0].body.problem, 'AP');
    assert.equal(window.document.getElementById('share-link').value, `http://127.0.0.1:8888/spectate/${token}`);
    window.document.getElementById('copy-share').click();
    await tick();
    assert.equal(copied, token);
    const field = window.document.getElementById('source-code');
    field.value = 'int main() { return 42; }';
    field.dispatchEvent(new window.Event('input', { bubbles: true }));
    await new Promise(resolve => setTimeout(resolve, 950));
    assert.equal(writes.find(item => item.kind === 'codeShare' && item.body.source)?.body.source, field.value);
    window.document.getElementById('nav-admin').click();
    await tick();
    assert.match(window.document.getElementById('admin-share-items').textContent, /admin · AP/);
    window.document.querySelector('.admin-share-actions .button.subtle').click();
    await tick();
    assert.equal(active, false);
    assert.equal(window.document.getElementById('share-code').classList.contains('sharing'), false);
  } finally { window.close(); }
});

test('statement renderer keeps examples and math readable while sanitizing HTML', () => {
  const dom = new JSDOM('<div id="statement"></div>', { runScripts: 'outside-only' });
  const { window } = dom;
  window.eval(fs.readFileSync(path.join(renderer, 'vendor', 'statement.bundle.js'), 'utf8'));
  const katex = { render: (expression, target) => { target.dataset.rendered = expression; } };
  try {
    const box = window.document.getElementById('statement');
    const aplus = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'problem-data', 'problems', 'APLUS', 'statement', 'statement.md'), 'utf8');
    window.CodeProStatement.render(aplus, box, katex);
    assert.match(box.textContent, /Cho hai số nguyên/);
    assert.equal(box.querySelectorAll('pre code').length, 4);
    assert.equal(box.querySelector('.math-inline')?.dataset.rendered, 'A');
    window.CodeProStatement.render('## Mẫu\n\n- $a + b$\n\n`$raw$`\n\n<script>alert(1)</script><img src="x" onerror="alert(2)">', box, katex);
    assert.equal(box.querySelector('h2')?.textContent, 'Mẫu');
    assert.equal(box.querySelector('li .math-inline')?.dataset.rendered, 'a + b');
    assert.equal(box.querySelector('code')?.textContent, '$raw$');
    assert.equal(box.querySelector('script'), null);
    assert.equal(box.querySelector('img')?.getAttribute('onerror'), null);
  } finally { window.close(); }
});

test('all local problem statements render without dropping their content', () => {
  const dom = new JSDOM('<div id="statement"></div>', { runScripts: 'outside-only' });
  const { window } = dom;
  window.eval(fs.readFileSync(path.join(renderer, 'vendor', 'statement.bundle.js'), 'utf8'));
  const box = window.document.getElementById('statement');
  const katex = { render: (expression, target) => { target.dataset.rendered = expression; } };
  const root = path.join(__dirname, '..', '..', '..', 'problem-data', 'problems');
  let count = 0;
  try {
    for (const code of fs.readdirSync(root)) {
      const file = path.join(root, code, 'statement', 'statement.md');
      if (!fs.existsSync(file)) continue;
      const markdown = fs.readFileSync(file, 'utf8');
      window.CodeProStatement.render(markdown, box, katex);
      assert.ok(box.textContent.trim(), `${code}: empty statement after rendering`);
      count++;
    }
    assert.ok(count >= 300, `Expected the full local corpus, got ${count}`);
  } finally { window.close(); }
});

test('admin statement editor previews math and saves Markdown to statement API', async () => {
  const html = fs.readFileSync(path.join(renderer, 'index.html'), 'utf8');
  const source = fs.readFileSync(path.join(renderer, 'app.js'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'file:///client/index.html' });
  const { window } = dom;
  const writes = [];
  window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
  window.HTMLDialogElement.prototype.close = function () { this.open = false; };
  window.katex = { render: (expression, target) => { target.dataset.rendered = expression; } };
  window.eval(fs.readFileSync(path.join(renderer, 'vendor', 'statement.bundle.js'), 'utf8'));
  window.client = {
    account: async () => ({ username: 'admin', role: 'admin', is_staff: true }),
    liveStatus: async () => false,
    onLiveStatus: () => () => {},
    onLiveInvalidate: () => () => {},
    api: async args => {
      if (args.method === 'PUT' || args.method === 'POST') { writes.push(args); return {}; }
      if (args.kind === 'languages') return { objects: [{ key: 'CPP17', name: 'C++17' }] };
      if (args.kind === 'problems') return { objects: [{ code: 'AP', name: 'A + B', is_public: true }], total_objects: 1, total_pages: 1, has_more: false };
      if (args.kind === 'contests') return { objects: [{ key: 'TEST26', name: 'Thi thử mới', status: 'upcoming', start_time: '2026-10-20T00:00:00Z' }] };
      if (args.kind === 'contest') return { object: { key: 'TEST26', name: 'Thi thử mới', status: 'upcoming', problems: [{ code: 'AP', name: 'A + B' }] } };
      if (args.kind === 'problem') return { object: { code: 'AP', name: 'A + B', description: 'Cũ', points: 100 } };
      if (args.kind === 'problemStatement') return { markdown: '# Bản gốc\n$A+B$' };
      if (args.kind === 'userProfile') return { profile: { username: 'admin', display_name: 'Admin CodeProOJ', avatar: 'https://example.com/avatar.png', rank: 'Pupil', bio: 'Quản trị viên', is_verified: true }, statistics: { solved_problems: 7, attempted_problems: 8, contests: 2, total_submissions: 35, accepted_submissions: 22, ac_rate: 62.9 }, rating: { rating: 1200 }, recent_submissions: [{ problem_code: 'AP', problem_name: 'A + B', result: 'AC', date: 'Hôm nay' }] };
      throw new Error(`Unexpected API request: ${args.kind}`);
    },
    getDraft: async () => '',
    setDraft: async () => {},
    compilerPaths: async () => ({ cpp: '', python: '' }),
    chooseCompiler: async () => ({ cpp: 'C:\\Tools\\g++.exe', python: '' }),
    clearCompiler: async () => ({ cpp: '', python: '' }),
    checkCompilers: async () => ({ cpp: { available: true, version: 'g++ 14' }, python: { available: false, version: '' } }),
    openSite: () => {}
  };
  try {
    window.eval(source);
    await tick();
    assert.equal(window.document.getElementById('topbar-account').hidden, false);
    assert.equal(window.document.getElementById('topbar-display-name').textContent, 'Admin CodeProOJ');
    assert.equal(window.document.getElementById('topbar-rating').textContent, 'Pupil · 1200');
    assert.equal(window.document.getElementById('topbar-display-name').style.color, 'rgb(6, 182, 212)');
    assert.equal(window.document.getElementById('topbar-avatar-image').src, 'https://example.com/avatar.png');
    assert.equal(window.document.getElementById('topbar-context').textContent, 'CODEPROOJ / ADMIN');
    window.document.getElementById('nav-account').click();
    await tick();
    assert.equal(window.document.getElementById('account-view').hidden, false);
    assert.equal(window.document.getElementById('profile-name').textContent, 'Admin CodeProOJ');
    assert.equal(window.document.getElementById('profile-role').textContent, 'Quản trị viên');
    assert.equal(window.document.querySelectorAll('.profile-stat').length, 4);
    assert.match(window.document.getElementById('profile-recent').textContent, /A \+ B/);
    window.document.getElementById('nav-settings').click();
    const editorSize = window.document.getElementById('editor-font-size');
    editorSize.value = '16';
    editorSize.dispatchEvent(new window.Event('change'));
    assert.equal(window.document.documentElement.style.getPropertyValue('--editor-font-size'), '16px');
    window.document.getElementById('choose-cpp-compiler').click();
    await tick();
    assert.equal(window.document.getElementById('cpp-compiler').value, 'C:\\Tools\\g++.exe');
    window.document.getElementById('check-compilers').click();
    await tick();
    assert.match(window.document.getElementById('compiler-status').textContent, /g\+\+ 14/);
    window.document.getElementById('close-preferences').click();
    window.document.getElementById('nav-admin-problems').click();
    await tick();
    window.document.querySelector('#admin-problem-items button').click();
    await tick();
    const description = window.document.getElementById('edit-description');
    assert.equal(description.value, '# Bản gốc\n$A+B$');
    description.value = '# Đề mới\nTính $A+B$.';
    description.dispatchEvent(new window.Event('input', { bubbles: true }));
    assert.equal(window.document.querySelector('.statement-preview .math-inline')?.dataset.rendered, 'A+B');
    window.document.getElementById('edit-form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    await tick();
    assert.equal(writes[0].kind, 'problemStatement');
    assert.equal(writes[0].body.markdown, '# Đề mới\nTính $A+B$.');
    assert.equal(writes[1].kind, 'problem');
    assert.equal(Object.hasOwn(writes[1].body, 'description'), false);
    window.document.getElementById('close-edit').click();
    window.document.getElementById('new-contest').click();
    assert.deepEqual(
      [...window.document.querySelectorAll('#edit-display_target option')].map(option => option.value),
      ['both', 'client', 'web']
    );
    assert.equal(window.document.getElementById('edit-is_visible').checked, false);
    assert.ok(window.document.getElementById('edit-start_time').value);
    await tick();
    assert.equal(window.document.querySelectorAll('.contest-picker-row').length, 1);
    window.document.getElementById('edit-key').value = 'TEST26';
    window.document.getElementById('edit-name').value = 'Thi thử mới';
    window.document.querySelector('.contest-picker-row input').click();
    window.document.getElementById('edit-display_target').value = 'client';
    window.document.getElementById('edit-is_visible').checked = true;
    window.document.getElementById('edit-form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    await new Promise(resolve => setTimeout(resolve, 80));
    const created = writes.find(item => item.kind === 'contests' && item.method === 'POST');
    assert.deepEqual(Array.from(created.body.problems), ['AP']);
    assert.equal(created.body.display_target, 'client');
    assert.equal(created.body.is_visible, true);
    assert.equal(created.body.duration_seconds, 7200);
    assert.equal(Object.hasOwn(created.body, 'time_limit'), false);
  } finally {
    window.close();
  }
});
