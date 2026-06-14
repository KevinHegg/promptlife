import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { visualAidReadinessBriefs } from './visual-aid-readiness-data-v0283.mjs'

const root = process.cwd()
const manifestPath = path.join(root, 'public', 'assets', 'journey-visuals', 'v0-28', 'manifest.json')
const outDir = path.join(root, 'docs', 'journey', 'visual-aids')
const auditJsonPath = path.join(outDir, 'visual-asset-audit-v0-28-7.json')
const auditMdPath = path.join(outDir, 'visual-asset-audit-v0-28-7.md')
const allowedStatuses = new Set(['pending-asset', 'pending-placeholder', 'live', 'deferred', 'missing', 'rejected'])
const allowedTypes = new Set(['image2-concept-card'])
const knownCardIds = new Set(visualAidReadinessBriefs.map((brief) => brief.learningCardId))
const maxFileBytes = 5 * 1024 * 1024
const minWidth = 640
const minHeight = 360
const maxWidth = 4096
const maxHeight = 4096

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function toPublicPath(assetPath) {
  return path.join(root, 'public', assetPath.replace(/^\//, ''))
}

function exists(assetPath) {
  return Boolean(assetPath) && fs.existsSync(toPublicPath(assetPath))
}

function readPngDimensions(buffer) {
  if (buffer.length < 24) return null
  const pngSignature = '89504e470d0a1a0a'
  if (buffer.subarray(0, 8).toString('hex') !== pngSignature) return null
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    format: 'png'
  }
}

function readJpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null
  let offset = 2
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return null
    const marker = buffer[offset + 1]
    const length = buffer.readUInt16BE(offset + 2)
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
        format: 'jpeg'
      }
    }
    offset += 2 + length
  }
  return null
}

function readWebpDimensions(buffer) {
  if (buffer.length < 30 || buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') return null
  const chunk = buffer.toString('ascii', 12, 16)
  if (chunk === 'VP8X' && buffer.length >= 30) {
    const width = 1 + buffer.readUIntLE(24, 3)
    const height = 1 + buffer.readUIntLE(27, 3)
    return { width, height, format: 'webp' }
  }
  if (chunk === 'VP8 ' && buffer.length >= 30) {
    const width = buffer.readUInt16LE(26) & 0x3fff
    const height = buffer.readUInt16LE(28) & 0x3fff
    return { width, height, format: 'webp' }
  }
  if (chunk === 'VP8L' && buffer.length >= 25) {
    const bits = buffer.readUInt32LE(21)
    const width = (bits & 0x3fff) + 1
    const height = ((bits >> 14) & 0x3fff) + 1
    return { width, height, format: 'webp' }
  }
  return null
}

function readImageInfo(assetPath) {
  const filePath = toPublicPath(assetPath)
  const buffer = fs.readFileSync(filePath)
  const stats = fs.statSync(filePath)
  return {
    bytes: stats.size,
    dimensions: readPngDimensions(buffer) ?? readJpegDimensions(buffer) ?? readWebpDimensions(buffer)
  }
}

function issue(row, message) {
  row.issues.push(message)
}

function validateAsset(asset) {
  const row = {
    cardId: asset.cardId,
    title: asset.title,
    status: asset.status,
    assetPath: asset.assetPath,
    thumbPath: asset.thumbPath,
    live: asset.status === 'live',
    assetExists: exists(asset.assetPath),
    thumbExists: exists(asset.thumbPath),
    dimensions: null,
    thumbDimensions: null,
    fileBytes: null,
    thumbBytes: null,
    issues: []
  }

  if (!knownCardIds.has(asset.cardId)) issue(row, 'unknown-card-id')
  if (!allowedTypes.has(asset.type)) issue(row, 'unknown-asset-type')
  if (!allowedStatuses.has(asset.status)) issue(row, 'unknown-status')
  if (!asset.assetPath?.startsWith('/assets/journey-visuals/v0-28/optimized/')) issue(row, 'asset-path-outside-optimized-folder')
  if (!asset.thumbPath?.startsWith('/assets/journey-visuals/v0-28/thumbnails/')) issue(row, 'thumb-path-outside-thumbnails-folder')
  if (!asset.alt?.trim()) issue(row, 'missing-alt-text')
  if (!asset.caption?.trim()) issue(row, 'missing-caption')
  if (!Array.isArray(asset.callouts) || asset.callouts.length === 0) {
    issue(row, 'missing-callouts')
  } else {
    for (const [index, callout] of asset.callouts.entries()) {
      if (!callout.label?.trim()) issue(row, `missing-callout-${index + 1}-label`)
      if (!callout.text?.trim()) issue(row, `missing-callout-${index + 1}-text`)
    }
  }

  if (row.live && !row.assetExists) issue(row, 'live-asset-file-missing')
  if (row.live && !row.thumbExists) issue(row, 'live-thumbnail-missing')
  if (row.live && asset.containsEmbeddedText && asset.imageTextVerified !== true) issue(row, 'live-asset-embedded-text-not-verified')
  if (row.live && !asset.dimensions) issue(row, 'live-asset-missing-dimensions-metadata')
  if (row.live && !asset.fileSizeBytes) issue(row, 'live-asset-missing-file-size-metadata')
  if (row.live && !asset.thumbDimensions) issue(row, 'live-thumbnail-missing-dimensions-metadata')
  if (row.live && !asset.thumbFileSizeBytes) issue(row, 'live-thumbnail-missing-file-size-metadata')
  if (asset.status === 'rejected' && !asset.rejectionReason?.trim()) issue(row, 'rejected-asset-missing-reason')
  if (asset.status === 'missing' && !asset.missingReason?.trim()) issue(row, 'missing-asset-missing-reason')
  if (!['pending-asset', 'pending-placeholder', 'deferred', 'missing', 'rejected'].includes(asset.status) && !row.assetExists) issue(row, 'non-pending-asset-file-missing')

  if (row.assetExists) {
    const info = readImageInfo(asset.assetPath)
    row.fileBytes = info.bytes
    row.dimensions = info.dimensions
    if (!info.dimensions) {
      issue(row, 'unknown-image-dimensions')
    } else {
      if (info.dimensions.width < minWidth || info.dimensions.height < minHeight) issue(row, 'image-too-small')
      if (info.dimensions.width > maxWidth || info.dimensions.height > maxHeight) issue(row, 'image-too-large')
    }
    if (info.bytes > maxFileBytes) issue(row, 'image-file-too-large')
    if (asset.fileSizeBytes && asset.fileSizeBytes !== info.bytes) issue(row, 'image-file-size-metadata-mismatch')
    if (asset.dimensions && info.dimensions && (asset.dimensions.width !== info.dimensions.width || asset.dimensions.height !== info.dimensions.height)) {
      issue(row, 'image-dimensions-metadata-mismatch')
    }
  }

  if (row.thumbExists) {
    const info = readImageInfo(asset.thumbPath)
    row.thumbBytes = info.bytes
    row.thumbDimensions = info.dimensions
    if (!info.dimensions) {
      issue(row, 'unknown-thumbnail-dimensions')
    }
    if (asset.thumbFileSizeBytes && asset.thumbFileSizeBytes !== info.bytes) issue(row, 'thumbnail-file-size-metadata-mismatch')
    if (asset.thumbDimensions && info.dimensions && (asset.thumbDimensions.width !== info.dimensions.width || asset.thumbDimensions.height !== info.dimensions.height)) {
      issue(row, 'thumbnail-dimensions-metadata-mismatch')
    }
  }

  return row
}

function renderMarkdown(payload) {
  const lines = [
    '# Prompt Life Visual Asset Audit v0.28.7',
    '',
    `Generated: ${payload.generatedAt}`,
    `Status: ${payload.status}`,
    `Manifest: \`${payload.manifestPath}\``,
    `Assets checked: ${payload.summary.total}`,
    `Live assets: ${payload.summary.live}`,
    `Pending assets: ${payload.summary.pending}`,
    `Missing assets: ${payload.summary.missing}`,
    `Rejected assets: ${payload.summary.rejected}`,
    `Issues: ${payload.summary.issueCount}`,
    '',
    '| Card ID | Status | Asset exists | Thumb exists | Dimensions | Issues |',
    '| --- | --- | --- | --- | --- | --- |'
  ]

  for (const row of payload.rows) {
    const dimensions = row.dimensions ? `${row.dimensions.width}x${row.dimensions.height}` : 'n/a'
    lines.push(`| ${row.cardId} | ${row.status} | ${row.assetExists ? 'yes' : 'no'} | ${row.thumbExists ? 'yes' : 'no'} | ${dimensions} | ${row.issues.join('; ') || 'ok'} |`)
  }

  return `${lines.join('\n')}\n`
}

function main() {
  fs.mkdirSync(outDir, { recursive: true })
  const manifest = readJson(manifestPath)
  const rows = manifest.assets.map(validateAsset)
  const issues = rows.flatMap((row) => row.issues.map((message) => `${row.cardId}: ${message}`))
  const payload = {
    version: '0.28.7',
    generatedAt: new Date().toISOString(),
    manifestPath: path.relative(root, manifestPath),
    manifestVersion: manifest.version,
    status: issues.length ? 'fail' : 'pass',
    summary: {
      total: rows.length,
      live: rows.filter((row) => row.status === 'live').length,
      pending: rows.filter((row) => row.status === 'pending-asset' || row.status === 'pending-placeholder').length,
      deferred: rows.filter((row) => row.status === 'deferred').length,
      missing: rows.filter((row) => row.status === 'missing').length,
      rejected: rows.filter((row) => row.status === 'rejected').length,
      issueCount: issues.length
    },
    rows
  }

  fs.writeFileSync(auditJsonPath, `${JSON.stringify(payload, null, 2)}\n`)
  fs.writeFileSync(auditMdPath, renderMarkdown(payload))

  if (issues.length) {
    console.error('Visual asset audit failed.')
    for (const item of issues) console.error(`- ${item}`)
    process.exit(1)
  }

  console.log(`Visual asset audit passed. Checked ${rows.length} manifest entries; live assets: ${payload.summary.live}; pending assets: ${payload.summary.pending}.`)
}

main()
