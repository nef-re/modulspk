/**
 * Генерация фавиконов из app/icon.png (куб) для браузеров и Яндекса.
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import toIco from 'to-ico'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'app', 'icon.png')

if (!fs.existsSync(SRC)) {
  console.error('Source not found:', SRC)
  console.error('Run: node scripts/process-logo.mjs <logo-source.png>')
  process.exit(1)
}

const pngTargets = [
  ['public/favicon-32.png', 32],
  ['public/favicon.png', 120],
  ['public/apple-icon.png', 180],
  ['app/apple-icon.png', 180],
]

for (const [rel, size] of pngTargets) {
  const file = path.join(ROOT, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  await sharp(SRC)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(file)
  console.log('wrote', rel, `${size}x${size}`)
}

const icoSizes = [16, 32, 48]
const icoBuffers = await Promise.all(
  icoSizes.map((size) => sharp(SRC).resize(size, size, { fit: 'cover', position: 'centre' }).png().toBuffer()),
)
const ico = await toIco(icoBuffers)

for (const rel of ['public/favicon.ico', 'app/favicon.ico']) {
  const file = path.join(ROOT, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, ico)
  console.log('wrote', rel)
}

console.log('Favicons ready.')
