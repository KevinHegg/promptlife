// Checks the Pages build before upload: the app's entry uses the /promptlife/ base and its files
// exist, the manifest icons exist, and the archive and redirect pages are in place.
import { existsSync, readFileSync } from 'node:fs'

const fail = (msg) => {
  console.error(msg)
  process.exit(1)
}

const html = readFileSync('dist/index.html', 'utf8')
const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]).filter((p) => p.startsWith('/promptlife/assets/'))
if (assets.length < 2) fail('The Pages entry must load its script and styles from /promptlife/assets/.')
for (const p of assets) if (!existsSync(`dist/${p.slice('/promptlife/'.length)}`)) fail(`Missing built asset: ${p}`)

const manifest = JSON.parse(readFileSync('dist/manifest.webmanifest', 'utf8'))
for (const icon of manifest.icons) if (!existsSync(`dist/${icon.src.replace(/^\.\//, '')}`)) fail(`Missing icon: ${icon.src}`)

for (const p of ['dist/archive/index.html', 'dist/archive/field-guide/index.html', 'dist/next/index.html']) {
  if (!existsSync(p)) fail(`Missing page: ${p}`)
}
const archived = readFileSync('dist/archive/field-guide/index.html', 'utf8')
if (!archived.includes('/promptlife/archive/field-guide/assets/')) fail('The archived field guide was not built for its /archive/field-guide/ address.')

console.log('Pages entry, assets, icons, archive and redirect verified.')
