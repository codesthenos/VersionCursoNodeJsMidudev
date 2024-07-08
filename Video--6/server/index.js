import express from 'express'

const PORT = process.env.PORT ?? 3210
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Live Chat</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
