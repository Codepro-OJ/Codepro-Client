const { app, BrowserWindow, ipcMain, dialog, safeStorage, shell, clipboard } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { spawn } = require('node:child_process');
const WebSocket = require('ws');

const API_ORIGIN = 'http://127.0.0.1:8888';
const allowedPaths = new Map([
  ['problems', '/api/v2/problems'],
  ['problem', '/api/v2/problem/'],
  ['problemStatement', '/api/v1/problems/'],
  ['languages', '/api/v2/languages'],
  ['submissions', '/api/v2/submissions'],
  ['submission', '/api/v2/submission/'],
  ['submit', '/api/v2/submit'],
  ['login', '/api/v1/auth/login'],
  ['verify2fa', '/api/v1/auth/2fa/verify-login'],
  ['profile', '/api/v2/auth/profile'],
  ['userProfile', '/api/v1/users/'],
  ['contests', '/api/v2/contests'],
  ['contest', '/api/v2/contest/'],
  ['contestJoin', '/api/v2/contest/'],
  ['contestLeave', '/api/v2/contest/'],
  ['scoreboard', '/api/v2/contest/'],
  ['codeShares', '/api/v2/code-shares'],
  ['codeShare', '/api/v2/code-share/'],
  ['adminOverview', '/api/v2/admin/overview'],
  ['users', '/api/v2/users'],
  ['userRole', '/api/v2/admin/users/']
]);
let token = '';
let account = null;
let challenge = null;
let liveSocket = null;
let liveReconnect = null;
let liveDelay = 1000;
let liveConnected = false;
let shuttingDown = false;

function emitLive(channel, payload) {
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) win.webContents.send(channel, payload);
  }
}

function connectLive() {
  if (shuttingDown || liveSocket) return;
  const address = API_ORIGIN.replace(/^http/, 'ws') + '/ws/live';
  const ws = new WebSocket(address, { handshakeTimeout: 5000 });
  liveSocket = ws;
  ws.on('open', () => { liveConnected = true; liveDelay = 1000; emitLive('live:status', true); });
  ws.on('message', raw => {
    try {
      const event = JSON.parse(raw.toString());
      if (event.type === 'invalidate' && Array.isArray(event.topics)) {
        const topics = event.topics.filter(topic => ['contests', 'problems', 'submissions', 'account', 'shares'].includes(topic));
        if (topics.length) emitLive('live:invalidate', { topics });
      }
    } catch { /* Ignore malformed gateway messages. */ }
  });
  ws.on('error', () => {});
  ws.on('close', () => {
    if (liveSocket === ws) liveSocket = null;
    liveConnected = false;
    emitLive('live:status', false);
    if (!shuttingDown) {
      liveReconnect = setTimeout(connectLive, liveDelay);
      liveDelay = Math.min(liveDelay * 2, 30000);
    }
  });
}

function accountFile() { return path.join(app.getPath('userData'), 'account.json'); }
function draftFile() { return path.join(app.getPath('userData'), 'drafts.json'); }
function compilerFile() { return path.join(app.getPath('userData'), 'compilers.json'); }

async function compilerPaths() {
  const saved = await readJson(compilerFile(), {});
  return { cpp: typeof saved.cpp === 'string' ? saved.cpp : '', python: typeof saved.python === 'string' ? saved.python : '' };
}

async function compilerCommand(language) {
  const paths = await compilerPaths();
  if (language === 'CPP17') return { command: paths.cpp || 'g++', prefix: [] };
  const command = paths.python || (process.platform === 'win32' ? 'py' : 'python3');
  return { command, prefix: path.basename(command).toLowerCase() === 'py.exe' || command === 'py' ? ['-3'] : [] };
}

async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); } catch { return fallback; }
}

async function writeJson(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(value, null, 2), { encoding: 'utf8', mode: 0o600 });
}

async function loadAccount() {
  const saved = await readJson(accountFile(), null);
  if (!saved || !saved.secret || !safeStorage.isEncryptionAvailable()) return;
  try {
    token = safeStorage.decryptString(Buffer.from(saved.secret, 'base64'));
    account = saved.user || null;
  } catch { token = ''; account = null; }
}

async function saveAccount(user, value) {
  token = value;
  account = user;
  if (safeStorage.isEncryptionAvailable()) {
    await writeJson(accountFile(), { user, secret: safeStorage.encryptString(value).toString('base64') });
  }
}

function endpoint(kind, key = '', query = {}) {
  if (!allowedPaths.has(kind)) throw new Error('Đường dẫn API không hợp lệ.');
  if (key && !/^[a-zA-Z0-9_-]{1,64}$/.test(String(key))) throw new Error('Mã không hợp lệ.');
  const suffix = kind === 'contestJoin' ? '/join' : kind === 'contestLeave' ? '/leave' : kind === 'scoreboard' ? '/scoreboard' : kind === 'userRole' ? '/role' : kind === 'problemStatement' ? '/statement' : '';
  const url = new URL(allowedPaths.get(kind) + (key ? encodeURIComponent(String(key)) : '') + suffix, API_ORIGIN);
  for (const [name, value] of Object.entries(query || {})) {
    if (!['q', 'page', 'page_size', 'user', 'problem', 'all', 'tag', 'difficulty'].includes(name)) continue;
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(name, String(value));
  }
  return url;
}

async function request({ kind, key, query, body, method: requestedMethod }) {
  const method = requestedMethod || (body ? 'POST' : 'GET');
  const writes = { login: ['POST'], verify2fa: ['POST'], submit: ['POST'], contests: ['POST'], contest: ['PUT'], problems: ['POST'], problem: ['PUT'], problemStatement: ['PUT'], contestJoin: ['POST'], contestLeave: ['POST'], userRole: ['POST'], codeShares: ['POST'], codeShare: ['PUT'] };
  if (!['GET', 'POST', 'PUT'].includes(method) || (method !== 'GET' && !writes[kind]?.includes(method))) throw new Error('Thao tác không hợp lệ.');
  if (['contestJoin', 'contestLeave', 'contest', 'problem', 'problemStatement', 'submission', 'scoreboard', 'userRole', 'userProfile', 'codeShare'].includes(kind) && !key) throw new Error('Thiếu mã đối tượng.');
  if (['contests', 'contest', 'problems', 'problem', 'problemStatement', 'userRole'].includes(kind) && method !== 'GET' && account?.role !== 'admin') throw new Error('Cần quyền quản trị.');
  const url = endpoint(kind, key, query);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), kind === 'submit' ? 60000 : 20000);
  try {
    const response = await fetch(url, {
      method,
      headers: { Accept: 'application/json', 'X-CodeProOJ-Surface': 'client', ...(body ? { 'Content-Type': 'application/json' } : {}), ...(token && !['login', 'verify2fa'].includes(kind) ? { Authorization: `Token ${token}` } : {}), ...(kind === 'verify2fa' && challenge?.cookie ? { Cookie: challenge.cookie } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload || payload.error || payload.success === false) {
      throw new Error(payload?.error?.message || payload?.message || `Máy chủ trả về lỗi ${response.status}.`);
    }
    if (kind === 'login' && payload.requires_2fa) {
      const cookie = response.headers.getSetCookie?.().find(x => x.startsWith('cp_2fa_challenge='))?.split(';')[0];
      if (!cookie) throw new Error('Không nhận được phiên xác thực 2 bước. Vui lòng thử lại.');
      challenge = { cookie, userId: payload.user_id, expires: Date.now() + 300000 };
      return { requires_2fa: true, user_id: payload.user_id };
    }
    return kind === 'login' || kind === 'verify2fa' || kind === 'userProfile' ? payload : payload.data;
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('Kết nối quá thời gian. Hãy kiểm tra máy chủ và thử lại.');
    if (error instanceof TypeError) throw new Error('Không kết nối được CodeProOJ. Hãy kiểm tra kết nối mạng.');
    throw error;
  } finally { clearTimeout(timeout); }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1340, height: 850, minWidth: 950, minHeight: 630,
    backgroundColor: '#0b1220', title: 'CodeProOJ Client',
    icon: path.join(__dirname, 'renderer', 'brand-icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.removeMenu();
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('will-navigate', event => event.preventDefault());
}

async function runProcess(command, args, cwd, input, timeoutMs) {
  return new Promise(resolve => {
    const child = spawn(command, args, { cwd, windowsHide: true, shell: false, stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = '', stderr = '', settled = false, timedOut = false;
    const finish = (code, error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ code, stdout, stderr: error ? `${stderr}\n${error.message}` : stderr, timedOut });
    };
    const timer = setTimeout(() => { timedOut = true; child.kill(); }, timeoutMs);
    child.stdout.on('data', b => { stdout += b.toString(); if (stdout.length > 65536) child.kill(); });
    child.stderr.on('data', b => { stderr += b.toString(); if (stderr.length > 65536) child.kill(); });
    child.on('error', e => finish(-1, e));
    child.on('close', code => finish(code ?? -1));
    child.stdin.on('error', () => {});
    child.stdin.end(input || '');
  });
}

async function localRun({ language, source, input }) {
  if (!['CPP17', 'PY3'].includes(language)) throw new Error('Chạy thử hiện hỗ trợ C++17 và Python 3.');
  if (typeof source !== 'string' || source.length > 500000 || typeof input !== 'string' || input.length > 100000) throw new Error('Mã nguồn hoặc dữ liệu vào quá lớn.');
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'codeprooj-run-'));
  try {
    if (language === 'PY3') {
      await fs.writeFile(path.join(cwd, 'main.py'), source);
      const compiler = await compilerCommand(language);
      return await runProcess(compiler.command, [...compiler.prefix, 'main.py'], cwd, input, 5000);
    }
    await fs.writeFile(path.join(cwd, 'main.cpp'), source);
    const binary = process.platform === 'win32' ? 'main.exe' : 'main';
    const compiler = await compilerCommand(language);
    const compiled = await runProcess(compiler.command, ['-std=c++17', '-O2', 'main.cpp', '-o', binary], cwd, '', 15000);
    if (compiled.code !== 0) return { ...compiled, stage: 'compile' };
    return { ...await runProcess(path.join(cwd, binary), [], cwd, input, 5000), stage: 'run' };
  } finally { await fs.rm(cwd, { recursive: true, force: true }); }
}

app.whenReady().then(async () => {
  await loadAccount();
  if (token) {
    try {
      const profile = await request({ kind: 'profile' });
      account = profile?.user || null;
      if (!account) { token = ''; await fs.rm(accountFile(), { force: true }); }
      else await saveAccount(account, token);
    } catch (error) {
      if (/401|403|xác thực|đăng nhập/i.test(error.message)) { token = ''; account = null; await fs.rm(accountFile(), { force: true }); }
    }
  }
  ipcMain.handle('account', () => account);
  ipcMain.handle('live:status', () => liveConnected);
  ipcMain.handle('logout', async () => { token = ''; account = null; challenge = null; await fs.rm(accountFile(), { force: true }); });
  ipcMain.handle('api', async (_, args) => {
    if (!args || typeof args.kind !== 'string') throw new Error('Yêu cầu không hợp lệ.');
    if (args.kind === 'verify2fa' && (!challenge || challenge.expires < Date.now() || String(args.body?.user_id) !== String(challenge.userId))) throw new Error('Phiên xác thực 2 bước đã hết hạn. Vui lòng đăng nhập lại.');
    const data = await request(args);
    if (['login', 'verify2fa'].includes(args.kind) && data?.token && data?.user) {
      challenge = null;
      token = data.token;
      try {
        const profile = await request({ kind: 'profile' });
        if (profile?.user) data.user = profile.user;
      } catch { /* The login response still identifies the account. */ }
      await saveAccount(data.user, data.token);
    }
    return data;
  });
  ipcMain.handle('draft:get', async (_, key) => {
    if (!/^[A-Za-z0-9_-]{1,64}:[A-Za-z0-9_-]{1,32}$/.test(key)) return '';
    return (await readJson(draftFile(), {}))[key] || '';
  });
  ipcMain.handle('draft:set', async (_, key, source) => {
    if (!/^[A-Za-z0-9_-]{1,64}:[A-Za-z0-9_-]{1,32}$/.test(key) || typeof source !== 'string' || source.length > 500000) throw new Error('Bản nháp không hợp lệ.');
    const drafts = await readJson(draftFile(), {});
    drafts[key] = source;
    await writeJson(draftFile(), drafts);
  });
  ipcMain.handle('file:open', async () => {
    const selection = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'Source code', extensions: ['cpp', 'cc', 'c', 'py', 'txt'] }] });
    if (selection.canceled || !selection.filePaths[0]) return null;
    const stat = await fs.stat(selection.filePaths[0]);
    if (stat.size > 500000) throw new Error('Tệp mã nguồn quá lớn.');
    return { name: path.basename(selection.filePaths[0]), source: await fs.readFile(selection.filePaths[0], 'utf8') };
  });
  ipcMain.handle('file:save', async (_, source, language) => {
    if (typeof source !== 'string' || source.length > 500000) throw new Error('Mã nguồn quá lớn.');
    const result = await dialog.showSaveDialog({ defaultPath: language === 'PY3' ? 'main.py' : 'main.cpp' });
    if (result.canceled || !result.filePath) return false;
    await fs.writeFile(result.filePath, source, 'utf8');
    return true;
  });
  ipcMain.handle('run', (_, args) => localRun(args));
  ipcMain.handle('compiler:paths', () => compilerPaths());
  ipcMain.handle('compiler:choose', async (_, language) => {
    if (!['cpp', 'python'].includes(language)) throw new Error('Ngôn ngữ compiler không hợp lệ.');
    const result = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'Chương trình thực thi', extensions: process.platform === 'win32' ? ['exe'] : ['*'] }] });
    if (result.canceled || !result.filePaths[0]) return compilerPaths();
    const selected = result.filePaths[0];
    const file = path.basename(selected).toLowerCase();
    if (language === 'cpp' && !/^g\+\+(?:-[\d.]+)?(?:\.exe)?$/.test(file)) throw new Error('Hãy chọn tệp g++ của trình biên dịch C++.');
    if (language === 'python' && !/^(?:python(?:3(?:\.[\d]+)?)?|py)(?:\.exe)?$/.test(file)) throw new Error('Hãy chọn python hoặc py của Python 3.');
    if (!(await fs.stat(selected)).isFile()) throw new Error('Tệp compiler không hợp lệ.');
    const paths = await compilerPaths();
    paths[language] = selected;
    await writeJson(compilerFile(), paths);
    return paths;
  });
  ipcMain.handle('compiler:clear', async (_, language) => {
    if (!['cpp', 'python'].includes(language)) throw new Error('Ngôn ngữ compiler không hợp lệ.');
    const paths = await compilerPaths();
    paths[language] = '';
    await writeJson(compilerFile(), paths);
    return paths;
  });
  ipcMain.handle('compiler:check', async () => {
    const results = {};
    for (const [key, language] of [['cpp', 'CPP17'], ['python', 'PY3']]) {
      const { command, prefix } = await compilerCommand(language);
      const result = await runProcess(command, [...prefix, '--version'], os.tmpdir(), '', 5000);
      results[key] = { available: result.code === 0 && !result.timedOut, version: (result.stdout || result.stderr).split(/\r?\n/)[0].slice(0, 180) };
    }
    return results;
  });
  ipcMain.handle('open-site', (_, route) => {
    if (typeof route !== 'string' || !/^\/(problems|contests|submissions)(\/|$)/.test(route)) return;
    shell.openExternal(new URL(route, API_ORIGIN).toString());
  });
  ipcMain.handle('share:url', (_, shareToken) => {
    if (typeof shareToken !== 'string' || !/^[A-Za-z0-9_-]{20,64}$/.test(shareToken)) throw new Error('Liên kết chia sẻ không hợp lệ.');
    return new URL(`/spectate/${shareToken}`, API_ORIGIN).toString();
  });
  ipcMain.handle('share:copy', (_, shareToken) => {
    if (typeof shareToken !== 'string' || !/^[A-Za-z0-9_-]{20,64}$/.test(shareToken)) throw new Error('Liên kết chia sẻ không hợp lệ.');
    clipboard.writeText(new URL(`/spectate/${shareToken}`, API_ORIGIN).toString());
  });
  ipcMain.handle('share:open', (_, shareToken) => {
    if (typeof shareToken !== 'string' || !/^[A-Za-z0-9_-]{20,64}$/.test(shareToken)) throw new Error('Liên kết chia sẻ không hợp lệ.');
    shell.openExternal(new URL(`/spectate/${shareToken}`, API_ORIGIN).toString());
  });
  createWindow();
  connectLive();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('before-quit', () => {
  shuttingDown = true;
  if (liveReconnect) clearTimeout(liveReconnect);
  if (liveSocket) liveSocket.terminate();
});
