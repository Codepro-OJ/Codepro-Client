const path = require('node:path');
const esbuild = require('esbuild');

for (const name of ['editor', 'statement']) {
  esbuild.buildSync({
    entryPoints: [path.join(__dirname, '..', 'renderer', `${name}-entry.js`)],
    outfile: path.join(__dirname, '..', 'renderer', 'vendor', `${name}.bundle.js`),
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: 'chrome120',
    minify: true,
    legalComments: 'none'
  });
}
