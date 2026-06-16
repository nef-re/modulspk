/**
 * Прозрачный логотип + фавикон только с кубом (на весь кадр).
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = process.argv[2]
const ROOT = process.cwd()

if (!SRC || !fs.existsSync(SRC)) {
  console.error('Usage: node scripts/process-logo.mjs <source-image>')
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

const meta = await sharp(SRC).metadata()
const W = meta.width ?? 1024
const H = meta.height ?? 555

/** Убираем нижнюю строку «Элемент хорошей жизни» (~24% высоты) */
const logoH = Math.min(H, Math.round(H * 0.76))
const logoCropped = await sharp(SRC)
  .extract({ left: 0, top: 0, width: W, height: logoH })
  .png()
  .toBuffer()

await (await removeBlackBackground(logoCropped))
  .trim()
  .png({ compressionLevel: 9 })
  .toFile(path.join(ROOT, 'public', 'logo.png'))

/** Куб — верхняя часть кадра, квадрат по центру */
const cubeSize = Math.round(Math.min(W * 0.72, H * 0.62))
const cubeLeft = Math.round((W - cubeSize) / 2)
const cubeTop = Math.round(H * 0.04)

const cubeIcon = sharp(SRC)
  .extract({ left: cubeLeft, top: cubeTop, width: cubeSize, height: cubeSize })
  .resize(512, 512, { fit: 'cover', position: 'centre' })

const cubeTransparent = await removeBlackBackground(await cubeIcon.png().toBuffer())

const writeIcon = async (size, file) => {
  await cubeTransparent
    .clone()
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(file)
}

await writeIcon(512, path.join(ROOT, 'app', 'icon.png'))

console.log('logo.png — прозрачный фон')
console.log('app/icon.png — куб 512px')
console.log('Для полного набора фавиконов: npm run favicons')
console.log('(или положите куб в assets/icon-source.png и запустите favicons)')
