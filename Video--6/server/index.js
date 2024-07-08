import express from 'express'
import logger from 'morgan'
import path from 'path'

const PORT = process.env.PORT ?? 3210
const app = express()

app.use(logger('dev'))

app.use(express.static(path.join(process.cwd(), 'client')))

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd() + 'client/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
