// Tight-crop source-icon.png so the glyph fills the image bounds with zero padding.
// Uses the same trim threshold (25) that worked for the favicons to defeat soft-alpha edges.
import sharp from 'sharp';

const SRC = 'public/brand/source-icon.png';
const OUT = 'public/brand/source-icon-tight.png';

const trimmed = await sharp(SRC).trim({ threshold: 25 }).toBuffer();
const meta = await sharp(trimmed).metadata();

await sharp(trimmed).png({ compressionLevel: 9 }).toFile(OUT);
console.log(`  ${OUT}  (${meta.width}x${meta.height})`);
