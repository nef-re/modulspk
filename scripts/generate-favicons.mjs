/**
 * Генерация фавиконов из assets/icon-source.png (куб) для браузеров и Яндекса.
 * Убирает чёрный фон, добавляет отступы для читаемости в 16–32 px.
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import toIco from 'to-ico'

const ROOT = process.cwd()
const SRC = path.resolve(ROOT, process.argv[2] ?? 'assets/icon-source.png')
const MASTER_SIZE = 512
const PADDING_RATIO = 0.08

if (!fs.existsSync(SRC)) {
  console.error('Source not found:', SRC)
  process.exit(1)
}

/** Убирает чёрный / почти чёрный фон */
async function removeBlackBackground(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  for (let i = 0; i < width * height; i++) {
    const o = i * channels
    const r = data[o]
    const g = data[o + 1]
    const b = data[o + 2]
    const max = Math.max(r, g, b)
    const lum = 0.299 * r + 0.587 * g + 0.114 * b
    if (max < 42 && lum < 38) {
      data[o + 3] = 0
    }
  }

  return sharp(data, { raw: { width, height, channels } }).png()
}

/** Квадратный мастер с прозрачным фоном и безопасными отступами */
async function buildMaster() {
  const trimmed = await (await removeBlackBackground(SRC)).trim().png().toBuffer()
  const inner = Math.round(MASTER_SIZE * (1 - PADDING_RATIO * 2))

  return sharp(trimmed)
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: Math.round(MASTER_SIZE * PADDING_RATIO),
      bottom: Math.round(MASTER_SIZE * PADDING_RATIO),
      left: Math.round(MASTER_SIZE * PADDING_RATIO),
      right: Math.round(MASTER_SIZE * PADDING_RATIO),
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9, palette: false })
}

function resizeIcon(master, size, { sharpen = false } = {}) {
  let pipeline = master
    .clone()
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })

  if (sharpen && size <= 48) {
    pipeline = pipeline.sharpen({ sigma: 0.6, m1: 0.5, m2: 0.25 })
  }

  return pipeline.png({ compressionLevel: 9 })
}

const masterBuffer = await buildMaster().then((img) => img.toBuffer())
const master = sharp(masterBuffer)

const masterPath = path.join(ROOT, 'app', 'icon.png')
fs.mkdirSync(path.dirname(masterPath), { recursive: true })
await master.clone().toFile(masterPath)
console.log('wrote app/icon.png', `${MASTER_SIZE}x${MASTER_SIZE}`)

const pngTargets = [
  ['public/favicon-32.png', 32, true],
  ['public/favicon.png', 120, false],
  ['public/apple-icon.png', 180, false],
  ['app/apple-icon.png', 180, false],
]

for (const [rel, size, sharpen] of pngTargets) {
  const file = path.join(ROOT, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  await resizeIcon(master, size, { sharpen }).toFile(file)
  console.log('wrote', rel, `${size}x${size}`)
}

const icoSizes = [16, 32, 48]
const icoBuffers = await Promise.all(
  icoSizes.map((size) => resizeIcon(master, size, { sharpen: true }).toBuffer()),
)
const ico = await toIco(icoBuffers)

for (const rel of ['public/favicon.ico', 'app/favicon.ico']) {
  const file = path.join(ROOT, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, ico)
  console.log('wrote', rel)
}

console.log('Favicons ready.')
