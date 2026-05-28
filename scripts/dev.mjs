import { execSync, spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const port = process.env.PORT || '3000'

process.chdir(root)

const nextDir = path.join(root, '.next')
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true })
  console.log('Removed .next cache')
}

if (process.platform === 'win32') {
  try {
    const out = execSync(
      `netstat -ano | findstr :${port}`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] },
    )
    const pids = new Set(
      out
        .split('\n')
        .map((line) => line.trim().split(/\s+/).pop())
        .filter((pid) => pid && /^\d+$/.test(pid) && pid !== '0'),
    )
    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' })
        console.log(`Freed port ${port} (PID ${pid})`)
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* port free */
  }
}

console.log(`Starting Next.js on http://localhost:${port}`)
const child = spawn('npx', ['next', 'dev', '-p', port], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
})

child.on('exit', (code) => process.exit(code ?? 0))
