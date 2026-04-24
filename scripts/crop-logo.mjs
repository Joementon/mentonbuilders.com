import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function main() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 4 })

  const pdfPath = path.resolve(root, 'public/logo.pdf')
  const fileUrl = 'file:///' + pdfPath.replace(/\\/g, '/')

  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 })
  await new Promise((r) => setTimeout(r, 3000))

  // Hide the sidebar and toolbar via Chrome PDF viewer
  await page.evaluate(() => {
    // Try to hide PDF viewer chrome
    const viewer = document.querySelector('#sidebarContainer')
    if (viewer) viewer.style.display = 'none'
    const toolbar = document.querySelector('#toolbarContainer')
    if (toolbar) toolbar.style.display = 'none'
  })
  await new Promise((r) => setTimeout(r, 1000))

  // Page 1 - full screenshot
  await page.screenshot({
    path: path.resolve(root, 'public/logo-page1.png'),
    fullPage: false,
  })

  // Try to go to page 2
  await page.evaluate(() => {
    const input = document.querySelector('#pageNumber')
    if (input) {
      input.value = '2'
      input.dispatchEvent(new Event('change'))
    }
    // Also try keyboard
    window.scrollTo(0, document.documentElement.scrollHeight)
  })
  await new Promise((r) => setTimeout(r, 2000))

  await page.screenshot({
    path: path.resolve(root, 'public/logo-page2.png'),
    fullPage: false,
  })

  // Now use sharp to crop page 1 to just the logo area
  // The logo is roughly centered, in the middle third of the page
  const sharp = (await import('sharp')).default

  const p1 = sharp(path.resolve(root, 'public/logo-page1.png'))
  const p1Meta = await p1.metadata()
  console.log('Page 1 dimensions:', p1Meta.width, 'x', p1Meta.height)

  // Crop center area where logo sits (rough estimate from the screenshot)
  // Logo appears ~30-70% width, ~25-55% height based on what we saw
  const cropX = Math.floor(p1Meta.width * 0.22)
  const cropY = Math.floor(p1Meta.height * 0.2)
  const cropW = Math.floor(p1Meta.width * 0.58)
  const cropH = Math.floor(p1Meta.height * 0.35)

  await sharp(path.resolve(root, 'public/logo-page1.png'))
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .png()
    .toFile(path.resolve(root, 'public/logo-cropped.png'))

  console.log('Cropped logo saved to public/logo-cropped.png')

  // Also do a tighter trim by finding non-white pixels
  await sharp(path.resolve(root, 'public/logo-cropped.png'))
    .trim()
    .png()
    .toFile(path.resolve(root, 'public/logo.png'))

  console.log('Trimmed logo saved to public/logo.png')

  // Also make a small version for navbar
  await sharp(path.resolve(root, 'public/logo.png'))
    .resize({ height: 120 })
    .png()
    .toFile(path.resolve(root, 'public/logo-nav.png'))

  console.log('Nav logo saved to public/logo-nav.png')

  // White version for dark backgrounds
  await sharp(path.resolve(root, 'public/logo.png'))
    .negate({ alpha: false })
    .resize({ height: 120 })
    .png()
    .toFile(path.resolve(root, 'public/logo-white.png'))

  console.log('White logo saved to public/logo-white.png')

  await browser.close()
}

main().catch(console.error)
