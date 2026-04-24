import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

async function main() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  // Set a white background and large viewport
  await page.setViewport({ width: 2000, height: 2000, deviceScaleFactor: 3 })

  const pdfPath = path.resolve(root, 'public/logo.pdf')
  const fileUrl = 'file:///' + pdfPath.replace(/\\/g, '/')

  console.log('Loading:', fileUrl)
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 })

  // Wait for PDF viewer to render
  await new Promise((r) => setTimeout(r, 3000))

  // Screenshot the whole page
  await page.screenshot({
    path: path.resolve(root, 'public/logo-full.png'),
    fullPage: true,
  })

  const dims = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  }))
  console.log('Page dimensions:', dims)

  await browser.close()
  console.log('Done — saved public/logo-full.png')
}

main().catch(console.error)
