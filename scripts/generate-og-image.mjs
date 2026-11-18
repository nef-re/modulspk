/**
 * Генерирует картинку превью для соцсетей и мессенджеров (Open Graph):
 * public/og-image.png, 1200×630.  Запуск: npm run og-image
 */
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'public', 'og-image.png')

const W = 1200
const H = 630
const BRAND = '#0065ff'
const TEXT = '#0f1b33'
const MUTED = '#4a5878'
const FONT = "'Segoe UI', 'Manrope', 'Arial', sans-serif"

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const lines = [
  { y: 200, size: 30, weight: 700, fill: BRAND, text: 'ООО «Модуль» · Томск' },
  { y: 268, size: 48, weight: 800, fill: TEXT, text: 'Вентиляция и электрика' },
  { y: 334, size: 48, weight: 800, fill: TEXT, text: 'под ключ' },
  { y: 410, size: 28, weight: 500, fill: MUTED, text: 'Проектирование по России' },
  { y: 452, size: 28, weight: 500, fill: MUTED, text: 'Собственное производство' },
  { y: 494, size: 28, weight: 500, fill: MUTED, text: 'СМР и ПНР · с 2004 года' },
]

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#e6f0ff"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="0" y="${H - 14}" width="${W}" height="14" fill="${BRAND}"/>
  ${lines
    .map(
      (l) =>
        `<text x="530" y="${l.y}" font-family="${FONT}" font-size="${l.size}" font-weight="${l.weight}" fill="${l.fill}">${esc(l.text)}</text>`,
    )
    .join('\n  ')}
  <text x="530" y="568" font-family="${FONT}" font-size="26" font-weight="700" fill="${BRAND}">modulspk.ru</text>
</svg>`

const logo = await sharp(path.join(root, 'public', 'logo.png'))
  .resize({ width: 420, height: 420, fit: 'inside' })
  .toBuffer()
const logoMeta = await sharp(logo).metadata()

await sharp(Buffer.from(svg))
  .composite([
    {
      input: logo,
      left: Math.round(60 + (420 - logoMeta.width) / 2),
      top: Math.round((H - 14 - logoMeta.height) / 2),
    },
  ])
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(out)

console.log(`OG image → ${path.relative(root, out)}`)
