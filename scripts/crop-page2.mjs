import puppeteer from 'puppeteer'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function main() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1400, height: 1800, deviceScaleFactor: 4 })

  const pdfPath = path.resolve(root, 'public/logo.pdf')
  await page.goto('file:///' + pdfPath.replace(/\\/g, '/'), {
    waitUntil: 'networkidle0',
    timeout: 30000,
  })
  await new Promise((r) => setTimeout(r, 3000))

  // Scroll to page 2
  await page.evaluate(() => window.scrollTo(0, 99999))
  await new Promise((r) => setTimeout(r, 2000))

  await page.screenshot({
    path: path.resolve(root, 'public/logo-p2-raw.png'),
    fullPage: true,
  })

  // Crop the bottom half where page 2 lives
  const raw = sharp(path.resolve(root, 'public/logo-p2-raw.png'))
  const meta = await raw.metadata()
  console.log('Full dims:', meta.width, 'x', meta.height)

  // Page 2 should be in the lower portion
  const cropY = Math.floor(meta.height * 0.5)
  const cropH = Math.floor(meta.height * 0.5)
  await sharp(path.resolve(root, 'public/logo-p2-raw.png'))
    .extract({ left: Math.floor(meta.width * 0.15), top: cropY, width: Math.floor(meta.width * 0.7), height: cropH })
    .trim()
    .png()
    .toFile(path.resolve(root, 'public/logo-full-text.png'))

  console.log('Page 2 logo saved to public/logo-full-text.png')

  await browser.close()
}

main().catch(console.error)
