const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const pkg = require('../package.json');

const filenames = {
  windows: version => `CodeProOJ-Client-${version}.exe`,
  'mac-arm64': version => `CodeProOJ-Client-${version}-mac-arm64.dmg`,
  'mac-x64': version => `CodeProOJ-Client-${version}-mac-x64.dmg`,
  'linux-x64': version => `CodeProOJ-Client-${version}-linux-x64.deb`
};

function previousDownloads(manifestPath) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (manifest.schemaVersion === 2 && manifest.downloads && typeof manifest.downloads === 'object') {
      return { ...manifest.downloads };
    }
    if (manifest.version && manifest.file && manifest.bytes && manifest.sha256) {
      return {
        windows: {
          version: manifest.version,
          file: manifest.file,
          bytes: manifest.bytes,
          sha256: manifest.sha256
        }
      };
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return {};
}

function publish(sourceDir, destinationDir, version = pkg.version) {
  const manifestPath = path.join(destinationDir, 'client-manifest.json');
  fs.mkdirSync(destinationDir, { recursive: true });
  const downloads = previousDownloads(manifestPath);
  let published = 0;
  for (const [platform, filename] of Object.entries(filenames)) {
    const file = filename(version);
    const source = path.join(sourceDir, file);
    if (!fs.existsSync(source)) continue;
    const bytes = fs.readFileSync(source);
    if (!bytes.length) throw new Error(`Bản cài rỗng: ${source}`);
    const target = path.join(destinationDir, file);
    if (path.resolve(source) !== path.resolve(target)) fs.copyFileSync(source, target);
    downloads[platform] = {
      version,
      file,
      bytes: bytes.length,
      sha256: crypto.createHash('sha256').update(bytes).digest('hex')
    };
    published++;
    console.log(`Đã đặt ${platform}: ${target} (${(bytes.length / 1024 / 1024).toFixed(1)} MB)`);
  }
  if (!published) throw new Error(`Không tìm thấy bản cài v${version} trong ${sourceDir}. Hãy build trước khi chạy publish:local.`);
  const temporary = `${manifestPath}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify({ schemaVersion: 2, downloads }, null, 2) + '\n');
  fs.renameSync(temporary, manifestPath);
  return { schemaVersion: 2, downloads };
}

if (require.main === module) {
  const sourceDir = path.resolve(process.argv[2] || path.join(__dirname, '..', 'dist'));
  const destinationDir = path.resolve(process.argv[3] || path.join(__dirname, '..', '..', 'Codepro-Web', 'frontend', 'downloads'));
  publish(sourceDir, destinationDir);
}

module.exports = { filenames, publish };
