// Small static pages added to the Pages build: an index of archived versions, and a redirect
// from the old /next/ preview address to the main site (keeping any #/P02-style station link).
import { mkdirSync, writeFileSync } from 'node:fs'

const page = (title, body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>
  :root { color-scheme: light dark; --bg: #F7F5EF; --fg: #07124A; --muted: #48527A; --accent: #0B8A86; }
  @media (prefers-color-scheme: dark) { :root { --bg: #0A0F2C; --fg: #E9ECFA; --muted: #A9B1D6; --accent: #3FD3CE; } }
  body { margin: 0; padding: 48px 20px; background: var(--bg); color: var(--fg); font: 17px/1.6 Georgia, serif; }
  main { max-width: 620px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px; }
  h1 { font: 900 2rem/1.1 system-ui, sans-serif; margin: 0; }
  a { color: var(--accent); }
  li { margin-bottom: 10px; }
  .muted { color: var(--muted); }
</style>
</head>
<body><main>${body}</main></body>
</html>
`

mkdirSync('dist/archive', { recursive: true })
writeFileSync(
  'dist/archive/index.html',
  page(
    'Prompt Life archive',
    `<h1>Prompt Life archive</h1>
<p>Earlier versions of Prompt Life, kept for reference. The current app is at <a href="../">the main address</a>.</p>
<ul>
  <li><a href="./field-guide/">Inside the answer</a>, the interactive field guide (September 2026, v1.0.0). Source: tag <a href="https://github.com/KevinHegg/promptlife/tree/legacy-field-guide-v1.0.0">legacy-field-guide-v1.0.0</a>.</li>
  <li>The card-based journey (June 2026, v0.28.12). Source only: tag <a href="https://github.com/KevinHegg/promptlife/tree/legacy-v0.28.12">legacy-v0.28.12</a>.</li>
</ul>
<p class="muted">Progress saved in an archived version stays in that version.</p>`
  )
)

mkdirSync('dist/next', { recursive: true })
writeFileSync(
  'dist/next/index.html',
  page(
    'Prompt Life has moved',
    `<script>location.replace('../' + location.hash)</script>
<h1>Prompt Life has moved</h1>
<p>The subway-map version is now at <a href="../">the main address</a>.</p>`
  )
)

console.log('Wrote dist/archive/index.html and the dist/next/ redirect.')
