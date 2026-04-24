// Regenerate favicons from source-icon.png (Joe's ChatGPT-original art).
// Auto-trims transparent padding, then rasters to standard favicon sizes.
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFile } from 'node:fs/promises';

const SRC = 'public/brand/source-icon.png';

// Tight crop of non-transparent content, then pad to square with small margin.
// NOTE: source-icon.png has soft alpha edges from bg-removal — default trim threshold (10)
// fails to crop them, leaving the full 449x429 canvas. Threshold 20+ cleanly isolates the
// glyph at 252x313. Using 25 for a stable margin above the soft-alpha noise floor.
async function squareTrim(input) {
  const trimmed = await sharp(input).trim({ threshold: 25 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const size = Math.max(meta.width, meta.height);
  const pad = Math.round(size * 0.05); // 5% margin — glyph fills the tile at 16px
  const canvas = size + pad * 2;
  return sharp({
    create: {
      width: canvas,
      height: canvas,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: trimmed, gravity: 'center' }])
    .png()
    .toBuffer();
}

const masterPng = await squareTrim(SRC);

// Apple recommends NO transparency for touch icons — composite onto Warm Ivory bg.
const APPLE_BG = { r: 0xf8, g: 0xf4, b: 0xed, alpha: 1 };
const appleMaster = await sharp({
  create: {
    width: 1024,
    height: 1024,
    channels: 4,
    background: APPLE_BG,
  },
})
  .composite([{ input: await sharp(masterPng).resize(1024, 1024).toBuffer() }])
  .png()
  .toBuffer();

const sizes = [
  ['public/icon-16.png', 16, masterPng],
  ['public/icon-32.png', 32, masterPng],
  ['public/icon-48.png', 48, masterPng],
  ['public/icon-192.png', 192, masterPng],
  ['public/icon-512.png', 512, masterPng],
  ['public/apple-touch-icon.png', 180, appleMaster],
];

for (const [out, size, src] of sizes) {
  await sharp(src).resize(size, size).png({ compressionLevel: 9 }).toFile(out);
  console.log(`  ${out}  (${size}x${size})`);
}

// Multi-size .ico
const icoSizes = [16, 32, 48];
const icoBuffers = await Promise.all(
  icoSizes.map((s) => sharp(masterPng).resize(s, s).png().toBuffer())
);
const icoData = await pngToIco(icoBuffers);
await writeFile('public/favicon.ico', icoData);
console.log('  public/favicon.ico  (16,32,48)');

console.log('Favicons regenerated from source-icon.png');
