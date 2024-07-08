import express from 'express'
import logger from 'morgan'

const PORT = process.env.PORT ?? 3210
const app = express()

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send('<h1>Live Chat</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
