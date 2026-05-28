import express from 'express'
import cors from 'cors'
import { contactRouter } from './routes/contact.js'

const app = express()
const PORT = Number(process.env.API_PORT) || 3001

app.use(cors({ origin: process.env.CORS_ORIGIN ?? true }))
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'modultomsk-api' })
})

app.use('/api/contact', contactRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ ok: false, error: 'Внутренняя ошибка сервера' })
})

app.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}`)
})
