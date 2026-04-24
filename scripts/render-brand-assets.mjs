#!/usr/bin/env node
/**
 * Renders brand SVGs into PNG rasters using Puppeteer (so Google Fonts resolve).
 * Generates:
 *   - Favicon set from menton-icon.svg:
 *     /public/icon-16.png, icon-32.png, icon-48.png, icon-192.png, icon-512.png,
 *     /public/apple-touch-icon.png (180x180), /public/favicon.ico (multi-size)
 *   - Transparent lockup PNGs:
 *     /public/brand/menton-lockup.png      (1200px wide)
 *     /public/brand/menton-lockup-sm.png   (400px wide)
 *     /public/brand/menton-lockup-dark.png (1200px wide, ivory on transparent)
 *
 * Usage:
 *   node scripts/render-brand-assets.mjs
 */
import puppeteer from 'puppeteer'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const pub = path.join(root, 'public')
const brandDir = path.join(pub, 'brand')

/**
 * Render an SVG file to PNG at the given pixel width (height auto-scales from viewBox).
 */
async function renderSvgToPng(browser, svgPath, outPath, targetPxWidth) {
  const svg = await fs.readFile(svgPath, 'utf8')
  // Grab viewBox from the SVG
  const vbMatch = svg.match(/viewBox="([\d.\- ]+)"/)
  if (!vbMatch) throw new Error('No viewBox in ' + svgPath)
  const [, , w, h] = vbMatch[1].split(/\s+/).map(Number)
  const targetPxHeight = Math.round((h / w) * targetPxWidth)

  // Puppeteer needs a real data URL / HTML page with transparent background
  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  svg { display: block; width: ${targetPxWidth}px; height: ${targetPxHeight}px; }
</style>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@500&display=swap">
</head>
<body>
${svg}
</body>
</html>`

  const page = await browser.newPage()
  await page.setViewport({ width: targetPxWidth, height: targetPxHeight, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: 'networkidle0' })
  // Ensure fonts are actually ready
  await page.evaluate(() => document.fonts.ready)
  // Transparent background screenshot
  await page.screenshot({
    path: outPath,
    type: 'png',
    omitBackground: true,
    clip: { x: 0, y: 0, width: targetPxWidth, height: targetPxHeight },
  })
  await page.close()
  return { w: targetPxWidth, h: targetPxHeight }
}

async function main() {
  const browser = await puppeteer.launch({ headless: true })

  // ----- Favicon set -----
  const iconSvg = path.join(brandDir, 'menton-icon.svg')
  const iconSizes = [
    { name: 'icon-16.png',  size: 16  },
    { name: 'icon-32.png',  size: 32  },
    { name: 'icon-48.png',  size: 48  },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
  ]

  // The icon SVG viewBox is 250x310 (not square). Favicons need square rasters.
  // Render to a tall PNG, then square-pad (transparent) so the icon sits centered in a square canvas.
  // Strategy: render at requested height, compute width from aspect, then composite onto square canvas.
  // Actually simpler: render at a high resolution and let sharp resize-and-pad.

  // 1) Render a high-res master of the icon with puppeteer (so the vector is crisp).
  const masterPath = path.join(brandDir, '_icon-master-1024.png')
  {
    const svg = await fs.readFile(iconSvg, 'utf8')
    const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent}svg{display:block;width:1024px;height:auto;}</style></head><body>${svg}</body></html>`
    const page = await browser.newPage()
    await page.setViewport({ width: 1024, height: 1280, deviceScaleFactor: 2 })
    await page.setContent(html, { waitUntil: 'networkidle0' })
    const el = await page.$('svg')
    const box = await el.boundingBox()
    await page.screenshot({
      path: masterPath,
      type: 'png',
      omitBackground: true,
      clip: { x: box.x, y: box.y, width: box.width, height: box.height },
    })
    await page.close()
  }

  // 2) For each favicon size, composite the master onto a square transparent canvas.
  for (const { name, size } of iconSizes) {
    const outPath = path.join(pub, name)
    // Resize master to fit within (size x size), preserving aspect ratio, then center on square canvas.
    const resized = await sharp(masterPath).resize({ height: Math.round(size * 0.92), fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer()
    const rMeta = await sharp(resized).metadata()
    await sharp({
      create: {
        width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: resized, left: Math.round((size - rMeta.width) / 2), top: Math.round((size - rMeta.height) / 2) }])
      .png()
      .toFile(outPath)
    console.log('wrote', outPath)
  }

  // 3) favicon.ico — multi-size (16, 32, 48)
  {
    const icoBuf = await pngToIco([
      path.join(pub, 'icon-16.png'),
      path.join(pub, 'icon-32.png'),
      path.join(pub, 'icon-48.png'),
    ])
    await fs.writeFile(path.join(pub, 'favicon.ico'), icoBuf)
    console.log('wrote', path.join(pub, 'favicon.ico'))
  }

  // ----- Lockup PNG rasters -----
  const lockupSvg = path.join(brandDir, 'menton-lockup.svg')
  const lockupDarkSvg = path.join(brandDir, 'menton-lockup-dark.svg')

  const lockupOut    = path.join(brandDir, 'menton-lockup.png')
  const lockupSmOut  = path.join(brandDir, 'menton-lockup-sm.png')
  const lockupDarkOut = path.join(brandDir, 'menton-lockup-dark.png')

  await renderSvgToPng(browser, lockupSvg, lockupOut, 1200)
  console.log('wrote', lockupOut)
  await renderSvgToPng(browser, lockupSvg, lockupSmOut, 400)
  console.log('wrote', lockupSmOut)
  await renderSvgToPng(browser, lockupDarkSvg, lockupDarkOut, 1200)
  console.log('wrote', lockupDarkOut)

  // Clean up master
  await fs.unlink(masterPath).catch(() => {})

  await browser.close()
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
