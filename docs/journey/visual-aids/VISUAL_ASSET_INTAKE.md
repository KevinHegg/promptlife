# Prompt Life Visual Asset Intake

Version: v0.28.7

This guide describes how Image 2-generated Journey visual aids enter the app without one-off paths or layout surprises.

## Folder Structure

Use this folder for Journey visual assets:

```text
public/assets/journey-visuals/
  v0-28/
    source/
    optimized/
    thumbnails/
    manifest.json
```

- `source/`: original Image 2 exports or source PNGs. Keep these for traceability.
- `optimized/`: production images used by the app.
- `thumbnails/`: small preview images for review surfaces or future asset pickers.
- `manifest.json`: the source of truth for asset status, paths, alt text, captions, callouts, and verification.

## Naming Rules

- Use lowercase kebab-case filenames.
- Use the lesson card ID or a close readable variant.
- Prefer `.png` for Image 2 concept cards unless there is a strong reason to use another format.
- Keep source and optimized names aligned:

```text
source/perfect-storm.png
optimized/perfect-storm.png
thumbnails/perfect-storm.png
```

## Optimization Steps

1. Put the original generated image in `source/`.
2. Create a mobile-safe optimized file in `optimized/`.
3. Create a thumbnail in `thumbnails/`.
4. Check that the image remains readable at 320px and 390px.
5. Keep instructional text in HTML. Avoid tiny embedded labels.
6. Update `manifest.json`.
7. Run `npm run audit:visual-assets`.

Recommended production target:

- Aspect ratio: 16:9 or app-approved visual frame.
- Minimum size: 640px by 360px.
- Maximum size: 4096px by 4096px.
- File size: under 5 MB.

## Manifest Rules

Every asset entry must include:

- `cardId`
- `stage`
- `title`
- `assetPath`
- `thumbPath`
- `type`
- `status`
- `alt`
- `caption`
- `callouts`
- `imageTextVerified`
- `notes`

Allowed statuses:

- `pending-asset`: planned asset, file may be missing, current coded visual remains active.
- `live`: app may render the manifest image.
- `missing`: expected asset files are absent; current coded/generated visual remains active.
- `rejected`: asset exists or was reviewed but should not ship; current coded/generated visual remains active.
- `deferred`: intentionally delayed until after human testing.
- `pending-placeholder`: legacy/debug-only status from the intake prototype. Avoid this in normal learner mode unless a future pass explicitly asks for learner-facing placeholders.

## Image Text Verification

Image 2 assets should normally be textless. If an image contains any embedded text:

1. Set `containsEmbeddedText` to `true`.
2. Verify the exact rendered text manually at mobile size.
3. Confirm there is no pseudo-text or misspelling.
4. Set `imageTextVerified` to `true` only after that review.

The audit fails if a live asset contains embedded text and `imageTextVerified` is not true.

## Renderer Behavior

The Journey visual renderer supports two learner-safe modes:

- Current coded/generated visual: used by default.
- Manifest image asset: used when a manifest entry is marked `live`.

Entries marked `pending-asset`, `missing`, `rejected`, or `deferred` do not replace existing visuals. This keeps the app stable while Image 2 files are being prepared or reviewed. If a live manifest image fails to load at runtime, the renderer falls back to the existing coded/generated visual.

## Fallback To Coded Visual

If an asset should not ship yet:

- Keep status as `pending-asset`, or
- Change status to `missing`, `rejected`, or `deferred`.

The current coded visual remains active unless the manifest entry is explicitly marked `live`.

## Audit

Run:

```bash
npm run audit:visual-assets
```

The audit checks:

- Manifest paths and statuses.
- Unknown card IDs.
- Missing alt text, captions, or callouts.
- Whether live asset files and thumbnails exist.
- Image dimensions and file size for existing files.
- Embedded-text verification for live assets.

Generated audit outputs:

- `docs/journey/visual-aids/visual-asset-audit-v0-28-7.json`
- `docs/journey/visual-aids/visual-asset-audit-v0-28-7.md`
