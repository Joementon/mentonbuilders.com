// Regenerate favicons from source-icon.png (Joe's ChatGPT-original art).
// Auto-trims transparent padding, then rasters to standard favicon sizes.
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFile } from 'node:fs/promises';

const SRC = 'public/brand/source-icon.png';

// Tight crop of non-transparent content, then pad to square with small margin.
async function squareTrim(input) {
  const trimmed = await sharp(input).trim().toBuffer();
  const meta = await sharp(trimmed).metadata();
  const size = Math.max(meta.width, meta.height);
  const pad = Math.round(size * 0.12); // 12% margin — keeps glyph readable at 16px
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

const sizes = [
  ['public/icon-16.png', 16],
  ['public/icon-32.png', 32],
  ['public/icon-48.png', 48],
  ['public/icon-192.png', 192],
  ['public/icon-512.png', 512],
  ['public/apple-touch-icon.png', 180],
];

for (const [out, size] of sizes) {
  await sharp(masterPng).resize(size, size).png({ compressionLevel: 9 }).toFile(out);
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
