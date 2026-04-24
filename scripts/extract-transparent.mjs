// Convert source JPGs (cream background) to transparent PNGs by luminance thresholding.
// Preserves the original ChatGPT-generated artwork exactly; only turns the cream canvas transparent.
import sharp from 'sharp';

async function toTransparent(inPath, outPath) {
  const img = sharp(inPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const px = Buffer.from(data);

  for (let i = 0; i < px.length; i += channels) {
    const r = px[i], g = px[i + 1], b = px[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum > 235) {
      px[i + 3] = 0;
    } else if (lum > 200) {
      const alpha = Math.max(0, Math.min(255, ((235 - lum) / 35) * 255));
      px[i + 3] = Math.round(alpha);
    }
  }

  await sharp(px, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`  ${outPath}  (${width}x${height})`);
}

console.log('Converting source JPGs to transparent PNGs:');
await toTransparent('public/brand/new_menton_logo.jpg', 'public/brand/source-lockup.png');
await toTransparent('public/brand/new_menton_icon.jpg', 'public/brand/source-icon.png');
console.log('Done.');
