/**
 * Вырезает первые 6 квадратных иконок из макета (сетка 3×2 в верхней части изображения).
 * Порядок: Электрика, Вентиляция, СМР / Проектирование, ПНР, Производство
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = process.argv[2]
const OUT_DIR = path.join(process.cwd(), 'public', 'cube')

const FACES = [
  { file: 'electrics.png', col: 0, row: 0 },
  { file: 'ventilation.png', col: 1, row: 0 },
  { file: 'smr.png', col: 2, row: 0 },
  { file: 'design.png', col: 0, row: 1 },
  { file: 'pnr.png', col: 1, row: 1 },
  { file: 'production.png', col: 2, row: 1 },
]

if (!SRC || !fs.existsSync(SRC)) {
  console.error('Usage: node scripts/split-cube-faces.mjs <path-to-source-image>')
  process.exit(1)
}

const meta = await sharp(SRC).metadata()
const { width: W, height: H } = meta
if (!W || !H) throw new Error('Invalid image')

/** Две строки по три квадрата занимают верхние 2/3 квадратного холста */
const cell = Math.floor(W / 3)
const gridH = cell * 2

fs.mkdirSync(OUT_DIR, { recursive: true })

for (const { file, col, row } of FACES) {
  const left = col * cell
  const top = row * cell
  const width = col === 2 ? W - left : cell
  const height = row === 1 ? gridH - top : cell

  await sharp(SRC)
    .extract({ left, top, width, height })
    .resize(cell, cell, { fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, file))

  console.log(`Wrote ${file} (${width}x${height} -> ${cell}x${cell})`)
}

await sharp(SRC)
  .extract({ left: 0, top: 0, width: W, height: gridH })
  .png()
  .toFile(path.join(OUT_DIR, 'faces-sprite.png'))

console.log('Done:', OUT_DIR)
