const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { filenames, publish } = require('./publish-local');

test('publishing macOS and Linux keeps an already published Windows build', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'codepro-publish-'));
  const source = path.join(root, 'dist');
  const destination = path.join(root, 'downloads');
  fs.mkdirSync(source);
  fs.mkdirSync(destination);
  const oldWindows = 'CodeProOJ-Client-1.2.6.exe';
  fs.writeFileSync(path.join(destination, oldWindows), 'windows build');
  fs.writeFileSync(path.join(destination, 'client-manifest.json'), JSON.stringify({
    version: '1.2.6', platform: 'Windows x64', file: oldWindows,
    bytes: 13, sha256: 'a'.repeat(64)
  }));
  try {
    for (const platform of ['mac-arm64', 'mac-x64', 'linux-x64']) {
      fs.writeFileSync(path.join(source, filenames[platform]('1.2.7')), platform);
    }
    const manifest = publish(source, destination, '1.2.7');
    assert.equal(manifest.downloads.windows.file, oldWindows);
    for (const platform of ['mac-arm64', 'mac-x64', 'linux-x64']) {
      const entry = manifest.downloads[platform];
      assert.equal(entry.version, '1.2.7');
      assert.equal(fs.readFileSync(path.join(destination, entry.file), 'utf8'), platform);
      assert.match(entry.sha256, /^[a-f0-9]{64}$/);
    }
    assert.equal(JSON.parse(fs.readFileSync(path.join(destination, 'client-manifest.json'))).schemaVersion, 2);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
