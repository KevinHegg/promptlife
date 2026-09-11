import { readFileSync, existsSync } from 'node:fs'
const html = readFileSync('dist/index.html', 'utf8')
const assets = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map(match => match[1]).filter(path => path.startsWith('/promptlife/assets/'))
if (assets.length < 2) throw new Error('The Pages entry must use the /promptlife/ asset base.')
for (const path of assets) {
  if (!existsSync(`dist/${path.slice('/promptlife/'.length)}`)) throw new Error(`Missing built asset: ${path}`)
}
const manifest = JSON.parse(readFileSync('dist/manifest.webmanifest', 'utf8'))
for (const icon of manifest.icons) {
  if (!existsSync(`dist/${icon.src.replace(/^\.\//, '')}`)) throw new Error(`Missing icon: ${icon.src}`)
}
console.log('GitHub Pages asset base, entry files, and manifest icons verified.')
