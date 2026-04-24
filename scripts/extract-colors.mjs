import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function main() {
  // Get raw pixel data from the cropped logo
  const img = sharp(path.resolve(root, 'public/logo.png'))
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })

  console.log('Image:', info.width, 'x', info.height, 'channels:', info.channels)

  // Collect non-white, non-transparent colors
  const colorCounts = {}
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = info.channels === 4 ? data[i + 3] : 255

    // Skip white/near-white and transparent
    if (a < 128) continue
    if (r > 240 && g > 240 && b > 240) continue

    // Bucket to nearest 8 to reduce noise
    const br = Math.round(r / 8) * 8
    const bg = Math.round(g / 8) * 8
    const bb = Math.round(b / 8) * 8
    const hex = '#' + [br, bg, bb].map((c) => c.toString(16).padStart(2, '0')).join('')
    colorCounts[hex] = (colorCounts[hex] || 0) + 1
  }

  // Sort by frequency
  const sorted = Object.entries(colorCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)

  console.log('\nTop 20 brand colors (bucketed):')
  for (const [hex, count] of sorted) {
    console.log(`  ${hex}  — ${count} pixels`)
  }
}

main().catch(console.error)
